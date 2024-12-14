<template>
  <va-card>
    <va-card-title>Add new SearchSECO miner</va-card-title>
    <va-card-content>
      <add-miner-component />
    </va-card-content>
  </va-card>
</template>

<script>
import AddMinerComponent from '../../components/search/AddMinerComponent.vue';

export default {
  name: 'add-miner-view',
  components: {
    AddMinerComponent,
  },
};
</script>

<style scoped></style>
