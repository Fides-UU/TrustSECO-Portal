<template>
  <va-card>
    <va-card-title>View Packages</va-card-title>
    <va-card-content>
      <packages-table-component></packages-table-component>
    </va-card-content>
  </va-card>
</template>

<script>
import PackagesTableComponent from '@/components/tables/Packages.vue';

export default {
  name: 'packages-view',
  components: {
    PackagesTableComponent,
  },
};
</script>

<style scoped>
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
