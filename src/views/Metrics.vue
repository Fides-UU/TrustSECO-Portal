<template>
  <va-card>
    <va-card-title>DLT Metrics</va-card-title>
    <va-card-content>
      <DLTMetricsComponent/>
    </va-card-content>
  </va-card>
  <va-card>
    <va-card-title>Spider log</va-card-title>
    <va-card-content>
      <spider-log-component/>
    </va-card-content>
  </va-card>
</template>

<script>
import SpiderLogComponent from '../components/SpiderLog.vue';
import DLTMetricsComponent from '../components/DLTMetricsComponent.vue';

export default {
  name: 'metrics-view',
  components: {
    SpiderLogComponent,
    DLTMetricsComponent,
  },
};
</script>

<style scoped>
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
