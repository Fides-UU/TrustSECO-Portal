<template>
  <div class="app-layout__navbar">
    <va-navbar color="#ffffff" text-color="primary">
      <template v-slot:left v-if="this.server_type===1">
        <va-navbar-item>
          <va-chip color="dark" flat @click="refreshUserTokens">User tokens: {{ usertokens }}</va-chip>
        </va-navbar-item>
      </template>
      <template v-slot:center>
        <va-navbar-item>
          <va-button :flat="currentRoute !== 'Home'" :square="currentRoute === 'Home'" :to="{ name: 'Home' }"
                     color="dark">Home
          </va-button>
        </va-navbar-item>
        <va-navbar-item v-if="this.server_type===1">
          <va-button :flat="currentRoute !== 'Add Package'" :square="currentRoute === 'Add Package'"
                     :to="{ name: 'Add Package' }" color="dark">Add Package
          </va-button>
        </va-navbar-item>
        <va-navbar-item>
          <va-button :flat="currentRoute !== 'Metrics'" :square="currentRoute === 'Metrics'" :to="{ name: 'Metrics' }"
                     color="dark">Metrics
          </va-button>
        </va-navbar-item>
        <va-navbar-item>
          <va-button :flat="currentRoute !== 'Package List'" :square="currentRoute === 'Package List'"
                     :to="{ name: 'Package List' }" color="dark">Trust Scores
          </va-button>
        </va-navbar-item>
      </template>
      <template v-slot:right v-if="this.server_type===1">
        <va-navbar-item>
          <va-button :flat="currentRoute !== 'Settings'" :square="currentRoute === 'Settings'"
                     :to="{ name: 'Settings' }" color="dark">Settings
          </va-button>
        </va-navbar-item>
      </template>
    </va-navbar>
  </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import { ServerType } from '@/api';

export default {
  name: 'header-component',
  data() {
    return {
      usertokens: 0,
      server_type: ServerType.Public,
    };
  },
  methods: {
    async refreshUserTokens() {
      try {
        const { data } = await axios.get('http://localhost:3000/api/dlt/account');
        this.usertokens = data.slingers;
      } catch {
        this.usertokens = 0;
      }
    },
  },
  async mounted() {
    this.refreshUserTokens();
    this.server_type = await this.$api.getServerType();
  },
  computed: {
    currentRoute() {
      return router.currentRoute.value.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.va-navbar {
  box-shadow: var(--va-box-shadow);
  z-index: 1;
}
</style>
