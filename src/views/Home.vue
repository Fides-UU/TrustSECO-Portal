<template>
  <va-card>
    <va-card-title>CoSy and Spider status</va-card-title>
    <va-card-content>
      <DownloadCosyButton/>
    </va-card-content>
    <va-card-content>
      <SpiderToggleButton/>
    </va-card-content>
  </va-card>
  <va-card>
    <va-card-title>Job list</va-card-title>
    <va-card-content>
      <JobsListComponent/>
    </va-card-content>
  </va-card>
</template>

<script>
import SpiderToggleButton from '../components/button/SpiderToggle.vue';
import DownloadCosyButton from '../components/button/DownloadCoSy.vue';
import JobsListComponent from '../components/tables/Jobs.vue';

export default {
  name: 'home-view',
  components: {
    DownloadCosyButton,
    SpiderToggleButton,
    JobsListComponent,
  },
};
</script>

<style scoped>
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
