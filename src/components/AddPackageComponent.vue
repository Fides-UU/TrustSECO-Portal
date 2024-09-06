<template>
  <va-modal v-model="showAddedModal" hide-default-actions overlay-opacity="0.2">
    <template #header>
      <h2>Package added</h2>
    </template>
    <div>Package {{ job.name }} with version {{ job.release }} has been added </div>
    <template #footer>
      <va-button @click="showAddedModal = false"> Close </va-button>
    </template>
  </va-modal>

  <va-modal v-model="showFieldEmpty" hide-default-actions overlay-opacity="0.2">
    <template #header>
      <h2>Field empty</h2>
    </template>
    <div>One or more fields have been left empty.</div>
    <template #footer>
      <va-button @click="showFieldEmpty = false"> Close </va-button>
    </template>
  </va-modal>

  <va-modal v-model="showAlreadyAdded" hide-default-actions overlay-opacity="0.2">
    <template #header>
      <h2>Already added</h2>
    </template>
    <div>Package {{ job.name }} with version {{ job.release }} already in system, click close to show.</div>
    <template #footer>
      <va-button @click="showPackage"> Close </va-button>
    </template>
  </va-modal>

  <va-form>
    <div class="row">
      <va-input
        v-model="job.platform"
        :rules="[validateRequired]"
        class="flex xs6"
        label="Platform"
      />
      <va-input
        v-model="job.owner"
        :rules="[validateRequired]"
        class="flex xs6"
        label="Owner"
      />
      <va-input
        v-model="job.name"
        :rules="[validateRequired]"
        class="flex xs6"
        label="Name"
      />
      <va-input
        v-model="job.release"
        class="flex xs6"
        label="Version"
        placeholder="leave empty for most recent version"
      />
      <div class="flex xs12">
        <va-button type="submit" @click="addPackage">Submit</va-button>
        <div v-if="response">
          <p>{{ response }}</p>
        </div>
      </div>
    </div>
  </va-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
  name: 'add-package-component',
  data() {
    return {
      showAddedModal: false,
      showAlreadyAdded: false,
      showFieldEmpty: false,
      response: '',
      job: {
        platform: '',
        owner: '',
        name: '',
        release: '',
      },
    };
  },
  methods: {
    async addPackage() {
      if (this.job.platform.length > 0 && this.job.owner.length > 0 && this.job.name.length > 0) {
        // if no release was specified grab the latest one
        if (this.job.release.length === 0) {
          this.job.release = await this.$dltApi.getMostRecentVersion({
            platform: this.job.platform,
            owner: this.job.owner,
            name: this.job.name,
            versions: [],
          });
        }

        // check if the package is already in the system
        const pack = await this.$dltApi.getPackage(this.job.name);
        if (pack.versions.includes(this.job.release))
        {
          this.showAlreadyAdded = true;
        }
        else
        {
          const result = await this.$dltApi.addPackage(this.job);

          if (typeof result === 'string') {
            if (result == 'Added jobs.') this.showAddedModal = true;
          }
        }
      } else {
        this.showFieldEmpty = true;
      }
    },
    // TODO: Move to generalized validation system
    validateRequired(value: string) {
      return (value && value.length > 0) || 'Field is required';
    },
    showPackage() {
      router.push({
        name: 'Package with Version',
        params: {
          name: this.job.name,
          version: this.job.release,
        },
      });
    }
  },
});
</script>
<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
