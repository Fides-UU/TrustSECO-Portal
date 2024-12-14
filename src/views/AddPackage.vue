<template>
  <va-card>
    <va-card-title>Add new package</va-card-title>
    <va-card-content>
      <add-package-component/>
    </va-card-content>
  </va-card>
</template>

<script>
import AddPackageComponent from '../components/AddPackageComponent.vue';

export default {
  name: 'add-package-view',
  components: {
    AddPackageComponent,
  },
};
</script>

<style scoped>
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
