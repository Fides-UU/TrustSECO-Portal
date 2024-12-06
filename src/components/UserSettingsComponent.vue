<template>
  <va-modal
    v-model="modal.showSavedModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h2>Settings saved</h2>
    </template>
    <div>Your settings have been saved</div>
    <template #footer>
      <va-button @click="modal.showSavedModal = false">
        Close
      </va-button>
    </template>
  </va-modal>

  <va-modal
    v-model="modal.showGitHubProfileLinkModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h2>GitHub Username</h2>
    </template>
    <div>Enter your GitHub Username here. <br /></div>
    <template #footer>
      <va-button @click="modal.showGitHubProfileLinkModal = false">
        Close
      </va-button>
    </template>
  </va-modal>

  <va-modal
    v-model="modal.showGitHubTokenModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h2>GitHub Token</h2>
    </template>
    <div>Follow <a target="_blank" rel="noopener noreferrer" href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token">this guide</a> on how to create a personal acces token on GitHub, and paste it here.<br />You do not need to select scopes.</div>
    <template #footer>
      <va-button @click="modal.showGitHubTokenModal = false">
        Close
      </va-button>
    </template>
  </va-modal>

  <va-modal
    v-model="modal.showLibrariesIOTokenModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h2>Libraries.IO Token</h2>
    </template>
    <div>Go to your Libaries.IO <a href="https://libraries.io/account" target="_blank" rel="noopener noreferrer">account page</a> and copy your API token.</div>
    <template #footer>
      <va-button @click="modal.showLibrariesIOTokenModal = false">
        Close
      </va-button>
    </template>
  </va-modal>

  <va-modal
    v-model="modal.showDLTGPGModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h2>DLT GPG Key</h2>
    </template>
    <div>Copy the key below and add it to your GitHub account, following <a target="_blank" rel="noopener noreferrer" href="https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-new-gpg-key-to-your-github-account">this guide</a></div>
    <template #footer>
      <va-button @click="modal.showDLTGPGModal = false">
        Close
      </va-button>
    </template>
  </va-modal>

  <va-modal
    v-model="modal.showGPGkeyInGitHub"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h2>GPG Key</h2>
    </template>
    <div>The DLT GPG key has not been added to your GitHub account yet!</div>
    <template #footer>
      <va-button @click="modal.showGPGkeyInGitHub = false">
        Close
      </va-button>
    </template>
  </va-modal>

  <div class="flex xs12">
    <va-form
      tag="form"
      @submit.prevent="handleSubmit"
    >
      <div class="row">
        <va-input
            v-model="request_data.user.gh_username"
            class="flex xs11"
            label="GitHub username"
            :rules="[validateRequired]"
          />

        <va-icon class="flex xs1 material-icons" @click="modal.showGitHubProfileLinkModal = true">info</va-icon>
      </div>

      <div class="row">
        <va-input
          v-model="request_data.user.gh_token"
          class="flex xs11"
          label="GitHub personal token"
          :rules="[validateRequired]"
        />

        <va-icon class="flex xs1 material-icons" @click="modal.showGitHubTokenModal = true">info</va-icon>
      </div>

      <div class="row">
        <va-input
          v-model="request_data.user.libraries_token"
          class="flex xs11"
          label="Libraries.IO personal token"
          :rules="[validateRequired]"
        />

        <va-icon class="flex xs1 material-icons" @click="modal.showLibrariesIOTokenModal = true">info</va-icon>
      </div>

      <div class="row">
        <va-input
          v-model="request_data.user.dlt_gpg"
          class="flex xs11"
          label="DLT GPG key"
          type="textarea"
          ref="dltgpg"
          @click="copyToClipboard"
          autosize
          readonly
        />
        <div>
        <va-icon class="flex xs1 material-icons" @click="modal.showDLTGPGModal = true">info</va-icon><br>
        <va-icon class="flex xs1 material-icons" @click="copyToClipboard">content_copy</va-icon>
        </div>
      </div>

      <va-button type="submit" class="mt-2">Save</va-button>
    </va-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'user-settings-component',
  props: {
    id: String,
  },
  data() {
    return {
      request_data: {
        user: {
          gh_username: '',
          gh_token: '',
          libraries_token: '',
          dlt_gpg: '',
        },
      },
      modal: {
        showGitHubProfileLinkModal: false,
        showGitHubTokenModal: false,
        showLibrariesIOTokenModal: false,
        showDLTGPGModal: false,
        showSavedModal: false,
        showGPGkeyInGitHub: false,
      },
      package_data: {},
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      axios.post('http://localhost:3000/api/dlt/store-github-link', {
        data: `https://github.com/${this.request_data.user.gh_username.toLowerCase()}.gpg`,
      }).then((response) => {
        this.modal.showGPGkeyInGitHub = !(response.data.stored_on_github);

        axios.post('http://localhost:3000/api/spider/set-tokens', {
          github_token: this.request_data.user.gh_token,
          libraries_token: this.request_data.user.libraries_token,
        }).then(() => {
          this.modal.showSavedModal = true;
        }).catch((error) => {
          console.log(error.message);
        });
      }).catch((error) => {
        console.log(error.message);
      });
    },
    validateRequired(value: string) {
      return (value && value.length > 0) || 'Field is required';
    },
    copyToClipboard() {
      this.$copyText(this.request_data.user.dlt_gpg);
    },
  },
  async mounted() {
    this.request_data.user.gh_username = (await axios.get('http://localhost:3000/api/dlt/get-github-link')).data.slice(19).slice(0, -4);
    const { data } = await axios.get('http://localhost:3000/api/spider/get-tokens');
    this.request_data.user.gh_token = data.github_token;
    this.request_data.user.libraries_token = data.libraries_token;
    this.request_data.user.dlt_gpg = (await axios.get('http://localhost:3000/api/dlt/get-gpg-key')).data;
  },
});
</script>

<style scoped>
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
