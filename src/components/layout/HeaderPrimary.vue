<template>
  <div class="app-layout__navbar">
    <va-navbar color="#ffffff" text-color="primary">
      <template v-slot:left>
        <va-navbar-item>
          <va-chip
            to="/"
            :color="currentSubject !== 'search' ? 'dark' : '#ffffff'"
            size="large"
            square
          >
            TrustSECO</va-chip
          >
        </va-navbar-item>
        <va-navbar-item v-if="this.server_type===1">
          <va-chip
            :to="{ name: 'SearchSECO' }"
            :color="currentSubject === 'search' ? 'dark' : '#ffffff'"
            size="large"
            square
          >
            SearchSECO</va-chip
          >
        </va-navbar-item>
      </template>
      <template v-slot:right>
        <va-navbar-item>
          <va-button v-if="isDevMode" color="dark" disabled flat>DEV</va-button>
        </va-navbar-item>
      </template>
    </va-navbar>
  </div>
  <Header v-if="currentSubject !== 'search'" />
  <HeaderSearch v-if="currentSubject === 'search'" />
</template>

<script>
import router from '@/router';
import Header from './Header.vue';
import HeaderSearch from './HeaderSearch.vue';
import { ServerType } from '@/api';

export default {
  name: 'header-component',
  components: {
    Header,
    HeaderSearch,
  },
  data() {
    return {
      usertokens: 0,
      server_type: ServerType.Public
    };
  },
  async mounted() {
    this.server_type = await this.$api.getServerType();
  },
  computed: {
    isDevMode() {
      return !import.meta.env.PROD;
    },
    currentSubject() {
      return router.currentRoute.value.path.split('/').at(1);
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
