<template>
  <div class="row">
    <div class="flex xs6">
      <div class="row">
        <div class="flex xs4 propName">Platform:</div>
        <div class="flex xs8 propValue">{{ package.platform }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Owner:</div>
        <div class="flex xs8 propValue">{{ package.owner }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">Name:</div>
        <div class="flex xs8 propValue">{{ package.name }}</div>
      </div>
    </div>
    <div class="flex xs6">
      <div class="row">
        <div class="flex xs4 propName"><b>Trust score:</b></div>
        <div class="flex xs8 propValue"><b>
          <span v-if="score !== undefined" :title="score">{{ score.toFixed(2) }}</span>
          <span v-if="score === undefined" title="We do not yet have any Trust Facts on this Package Version">
            Unknown
            <va-icon class="material-icons" name="info"/>
          </span>
        </b></div>
      </div>
      <!--      <div class="row">-->
      <!--        <div class="flex xs4 propName">Confidence rating:</div>-->
      <!--        <div class="flex xs8 propValue">TODO</div>-->
      <!--      </div>-->
      <br/>
      <div v-if="githubLink !== undefined">
        <va-button :href="githubLink" flat target="_blank">
          <va-icon name="home"/>
          GitHub
        </va-button>
      </div>
    </div>
    <div class="row">
      <div class="flex xs12">
        <va-button-toggle focus-color="textPrimary" size="small" v-model="versionLocal" :options="package.versions.map(v=> ({'label':v, 'value':v}))"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { defaultPackage } from '@/api';
import router from '@/router';

export default defineComponent({
  name: 'package-details-component',
  props: {
    name: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      package: defaultPackage,
      score: 0 as number | undefined,
      // version prop is immutable so this is needed to use in a v-model
      versionLocal: this.version
    };
  },
  computed: {
    // TODO: Add links for other Platforms and generalise
    githubLink() {
      if (this.package.platform !== 'github') {
        return undefined;
      }

      return `https://github.com/${this.package.owner}/${this.package.name}`;
    },
  },
  watch: {
    async versionLocal(newVersion) {
      await this.updateScore();
      this.selectVersion(newVersion);
    },
    async version(newVersion) {
      await this.updateScore();
      this.selectVersion(newVersion);
    },
  },
  async mounted() {
    this.package = await this.$dltApi.getPackage(this.name);
    if (this.version === '') {
      await router.replace({
        name: 'Package with Version',
        params: {
          name: this.name,
          version: this.package.versions[0],
        },
      });
    } else {
      await this.updateScore();
    }
    this.versionLocal = this.version
  },
  methods: {
    selectVersion(version: string) {
      router.push({
        name: 'Package with Version',
        params: {
          name: this.name,
          version,
        },
      });
    },
    async updateScore() {
      this.score = await this.$dltApi.getTrustScore(this.name, this.version);
    },
  },
});
</script>

<style lang="scss">
.propName {
  text-align: right;
}

.va-button {
  margin: 2px;
}

.va-button--focus {
  background-color: rgb(44, 130, 224) !important;
}

.va-button--active {
  background-color: rgb(31, 117, 209) !important;
}
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
