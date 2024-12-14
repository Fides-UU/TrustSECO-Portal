<template>
  <va-card>
    <va-card-title>SearchSECO Miner Details</va-card-title>
    <va-card-content>
      <miner-details-component ref="minerDetails" :id="id" />
    </va-card-content>
  </va-card>
  <!-- 2022-09-19 TODO: Only mocked
  <va-card>
    <va-card-title>SearchSECO Miner Metrics</va-card-title>
    <va-card-content>
      <miner-metrics-component ref="minerMetrics" :id="id" />
    </va-card-content>
  </va-card>
  -->
  <va-card>
    <va-card-title>SearchSECO Miner Logs</va-card-title>
    <va-card-content>
      <miner-log-component :id="id" />
    </va-card-content>
  </va-card>
</template>

<script>
import MinerDetailsComponent from '@/components/search/MinerDetails.vue';
import MinerLogComponent from '@/components/search/MinerLog.vue';
// TODO: import MinerMetricsComponent from '@/components/search/MinerMetrics.vue';

export default {
  components: {
    MinerDetailsComponent,
    MinerLogComponent,
    // TODO: MinerMetricsComponent,
  },
  name: 'search-miner-view',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
