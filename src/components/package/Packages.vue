<template>
  <va-input
    v-model="filter"
    class="xs12 filter"
    placeholder="Filter Packages"
  />
  <div class="loading-container" v-if="isLoading">
    <VaIcon name="loop" size="4em" spin />
  </div>
  <PackageComponent v-for="pack in filteredPackages" :package="pack" :key="pack"></PackageComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Package } from '@/api';
import PackageComponent from './Package.vue';

export default defineComponent({
  name: 'packages-table',
  data() {
    return {
      packages: [] as Package[],
      filter: '',
      isLoading: true,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.packages = await this.$dltApi.getPackages();
      this.isLoading = false;
    },
  },
  computed: {
    filteredPackages(): Package[] {
      return this.packages.filter((x) => x.name.includes(this.filter));
    },
  },
  components: {
    PackageComponent,
  },
});
</script>

<style>
.loading-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
}

.seperator:last-child {
  display: none;
}
</style>
