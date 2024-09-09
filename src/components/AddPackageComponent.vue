<template>
  <PopUpMessage v-model="showAddedModal" title="Package added">
    Package {{ job.name }} with version {{ job.release }} has been added
  </PopUpMessage>

  <PopUpMessage v-model="showFieldEmpty" title="Field empty">
    One or more fields have been left empty.
  </PopUpMessage>

  <PopUpMessage v-model="showAlreadyAdded" title="Already added" @button-clicked="showPackage">
    Package {{ job.name }} with version {{ job.release }} already in system, click close to show.
  </PopUpMessage>

  <PopUpMessage v-model="showError" title="Error retreiving most recent version">
    Can't retreive most recent version from version.
  </PopUpMessage>

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
        <va-button :loading="isLoading" type="submit" @click="addPackage">Submit</va-button>
      </div>
    </div>
  </va-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import PopUpMessage from '@/components/PopUpMessage.vue';

export default defineComponent({
  name: 'add-package-component',
  components: {PopUpMessage},
  data() {
    return {
      showAddedModal: false,
      showAlreadyAdded: false,
      showError: false,
      showFieldEmpty: false,
      isLoading: false,
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
      this.isLoading = true;
      if (this.job.platform.length > 0 && this.job.owner.length > 0 && this.job.name.length > 0) {
        // if no release was specified grab the latest one
        if (this.job.release.length === 0) {
          const version = await this.$dltApi.getMostRecentVersion({
            platform: this.job.platform,
            owner: this.job.owner,
            name: this.job.name,
            versions: [],
          });
          if (version == '') {
            this.isLoading = false;
            this.showError = true;
            return;
          }
          this.job.release = version;
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
      this.isLoading = false;
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
