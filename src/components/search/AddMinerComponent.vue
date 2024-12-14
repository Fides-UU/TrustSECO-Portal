<template>
  <PopUpMessage v-model="showModalAdded" title="Miner Added">
    Your miner has been added
  </PopUpMessage>

  <PopUpMessage v-model="showModalError" title="Add Miner Error">
    {{ errorMessage }}
  </PopUpMessage>

  <PopUpMessage v-model="showFieldEmpty" title="Field empty">
    One or more fields have been left empty.
  </PopUpMessage>

  <!-- 2022-09-13 The following params could possibly be useful if supported by search miner
  <PopUpMessage v-model="showModalVerbose" title="Verbosity Level">
    1 = Silent<br />
    2 = Errors Only<br />
    3 = Warnings &amp; Errors<br />
    4 = Everything<br />
    5 = Debug<br />
  </PopUpMessage>

  <PopUpMessage v-model="showModalCPU" title="CPUs">
    computer's cores to use.
  </PopUpMessage>
  -->

  <va-form>
    <div class="flex xs12">
      <div class="row">
        <va-input
          v-model="miner.github_token"
          :rules="[validateRequired]"
          class="flex xs11"
          label="Github Token"
        />
      </div>

      <div class="row">
        <va-input
          v-model="miner.worker_name"
          :rules="[validateRequired]"
          class="flex xs11"
          label="Worker Name"
        />
      </div>

      <!--
      <div class="row">
        <va-input
          v-model="miner.verbose"
          class="flex xs11"
          label="Verbosity Level"
          :rules="[validateRequired]"
        />
        <va-icon
          class="flex xs1 material-icons"
          @click="showModalVerbose = true"
          >info</va-icon
        >
      </div>

      <div class="row">
        <va-input v-model="miner.cpu" class="flex xs11" label="CPUs" />
        <va-icon class="flex xs1 material-icons" @click="showModalCPU = true"
          >info</va-icon
        >
      </div>
      -->

      <div class="flex xs12 mt-2">
        <va-button type="submit" @click="addMiner">Submit</va-button>
        <div v-if="response">
          <p>{{ response }}</p>
        </div>
      </div>
    </div>
  </va-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PopUpMessage from '@/components/PopUpMessage.vue';

export default defineComponent({
  name: 'add-miner-component',
  components: { PopUpMessage },
  data() {
    return {
      // showModalCPU: false,
      // showModalVerbose: false,
      showFieldEmpty: false,
      showModalAdded: false,
      showModalError: false,
      response: '',
      errorMessage: '',
      miner: {
        github_token: '',
        worker_name: '',
        // verbose: '4',
        // cpu: '2',
      },
    };
  },
  methods: {
    async addMiner() {
      const m = this.miner;
      if (m.github_token.length > 0 && m.worker_name.length > 0) {
        const result = await this.$searchApi.addMiner(m);
        if (result && result.success === true) {
          this.showModalAdded = true;
        } else {
          this.showModalError = true;
          this.errorMessage = result.message;
        }
      } else {
        this.showFieldEmpty = true;
      }
    },
    // TODO: Move to generalized validation system
    validateRequired(value: string) {
      return (value && value.length > 0) || 'Field is required';
    },
  },
});
</script>

<style scoped></style>
<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
