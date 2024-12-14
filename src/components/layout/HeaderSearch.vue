<template>
  <div class="app-layout__navbar">
    <va-navbar color="#ffffff" text-color="primary">
      <template v-slot:center>
        <va-navbar-item>
          <va-button
            :flat="currentRoute !== 'SearchSECO'"
            :square="currentRoute === 'SearchSECO'"
            :to="{ name: 'SearchSECO' }"
            color="dark"
            >Miners
          </va-button>
        </va-navbar-item>
        <va-navbar-item>
          <va-button
            :flat="currentRoute !== 'SearchSECO Add Miner'"
            :square="currentRoute === 'SearchSECO Add Miner'"
            :to="{ name: 'SearchSECO Add Miner' }"
            color="dark"
            >Add Miner
          </va-button>
        </va-navbar-item>
      </template>
      <template v-slot:right>
        <va-navbar-item>
          <va-button
            :flat="currentRoute !== 'Settings'"
            :square="currentRoute === 'Settings'"
            :to="{ name: 'Settings' }"
            color="dark"
            >Settings
          </va-button>
        </va-navbar-item>
      </template>
    </va-navbar>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'header-search-component',
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
