<template>
  <PopUpMessage v-model="modal.showSavedModal" title="Settings saved">
    Your settings have been saved
  </PopUpMessage>

  <PopUpMessage v-model="modal.showGPGkeyInGitHub" title="GPG Key">
    The DLT GPG key has not been added to your GitHub account yet!
  </PopUpMessage>

  <div class="flex xs12">
    <va-form tag="form" @submit.prevent="handleSubmit" class="flex flex-col items-baseline gap-6">
      <div class="row">
        <va-input v-model="request_data.user.gh_username" class="flex xs12" label="GitHub username"
          :rules="[validateRequired]">
          <template #append>
            <HelpComponent title="GitHub Username">
              Enter your GitHub Username here. <br />
            </HelpComponent>
          </template>
        </va-input>
      </div>

      <div class="row">
        <va-input v-model="request_data.user.gh_token" label="GitHub personal token" class="flex xs12"
          :rules="[validateRequired]">
          <template #append>
            <HelpComponent title="GitHub Token">
              Follow <a target="_blank" rel="noopener noreferrer"
                href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token">this
                guide</a> on how to create a personal acces token on GitHub, and paste it here.<br />You do not need to
              select scopes.
            </HelpComponent>
          </template>
        </va-input>
      </div>

      <div class="row">
        <va-input v-model="request_data.user.libraries_token" label="Libraries.IO personal token" class="flex xs12"
          :rules="[validateRequired]">
          <template #append>
            <HelpComponent title="Libraries.IO Token">
              Go to your Libaries.IO <a href="https://libraries.io/account" target="_blank"
                rel="noopener noreferrer">account page</a> and copy your API token.
            </HelpComponent>
          </template>
        </va-input>
      </div>

      <div class="row">
        <va-input v-model="request_data.user.dlt_gpg" label="DLT GPG key" type="textarea" ref="dltgpg"
          @click="copyToClipboard" class="flex xs12" autosize readonly>
          <template #append>
            <HelpComponent title="DLT GPG Key">
              Copy the key below and add it to your GitHub account, following <a target="_blank"
                rel="noopener noreferrer"
                href="https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-new-gpg-key-to-your-github-account">
                this guide</a>
            </HelpComponent>
            <va-icon class="material-icons" @click="copyToClipboard">content_copy</va-icon>
          </template>
        </va-input>
      </div>
      <va-button type="submit" class="mt-2">Save</va-button>

    </va-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import PopUpMessage from '@/components/PopUpMessage.vue';
import HelpComponent from '@/components/HelpComponent.vue';

export default defineComponent({
  name: 'user-settings-component',
  components: { PopUpMessage, HelpComponent },
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
        if (!response.data.stored_on_github)
        {
          this.modal.showGPGkeyInGitHub = true;
          return;
        }

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

<style scoped></style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
