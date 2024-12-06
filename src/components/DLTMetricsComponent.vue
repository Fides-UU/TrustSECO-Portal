<template>
  <div>
    <va-input v-model="metrics.packages" class="mb-4" label="Total number of packages in system" readonly/>
    <va-input v-model="metrics.blockheight" class="mb-4" label="Blockheight" readonly/>
    <va-input v-model="metrics.nodes" class="mb-4" label="Number of peers connected" readonly/>
    <va-button :loading="isLoading" class="mt-2" type="button" @click="refreshMetrics">Refresh</va-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { defaultMetrics, Metrics } from '@/api';

export default defineComponent({
  name: 'DLTMetricsComponent',
  data() {
    return {
      metrics: { ...defaultMetrics } as Metrics,
      isLoading: true,
    };
  },
  async mounted() {
    await this.refreshMetrics();
    this.isLoading = false;
  },
  methods: {
    async refreshMetrics() {
      this.metrics = await this.$dltApi.getMetrics();
    },
  },
});
</script>

<style scoped>
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
