<template>
  <va-card>
    <va-card-title>SearchSECO Miners</va-card-title>
    <va-card-content>
      <miners-table-component></miners-table-component>
    </va-card-content>
  </va-card>
</template>

<script>
import MinersTableComponent from '@/components/search/tables/Miners.vue';

export default {
  name: 'search-miners-view',
  components: {
    MinersTableComponent,
  },
};
</script>

<style scoped></style>
