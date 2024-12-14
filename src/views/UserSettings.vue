<template>
  <va-card>
    <va-card-title>User settings</va-card-title>
    <va-card-content>
      <user-settings-component/>
    </va-card-content>
  </va-card>
</template>

<script>
import UserSettingsComponent from '../components/UserSettingsComponent.vue';

export default {
  name: 'user-settings-view',
  components: { UserSettingsComponent },
};
</script>

<style scoped>
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
