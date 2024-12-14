<template>
  <div class="row">
    <div class="flex xs6">
      <div class="row">
        <div class="flex xs6 propName">Last Activity:</div>
        <div class="flex xs6 propValue">{{ metrics.last_activity }}</div>
      </div>
      <div class="row">
        <div class="flex xs6 propName">Methods Added : Last 4 hours:</div>
        <div class="flex xs6 propValue">{{ metrics.methods_added_4hrs }}</div>
      </div>
      <div class="row">
        <div class="flex xs6 propName">Methods Added : Total:</div>
        <div class="flex xs6 json">{{ metrics.methods_added_total }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { defaultMetrics } from '@/api';

export default defineComponent({
  name: 'miner-metrics-component',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      metrics: defaultMetrics,
    };
  },
  async mounted() {
    this.metrics = await this.$searchApi.getMinerMetrics(this.id);
  },
});
</script>

<style lang="scss">
.propName {
  text-align: right;
}

.json {
  display: block;
  unicode-bidi: embed;
  font-family: monospace;
  white-space: pre;
}

.va-radio {
  margin: 0 !important;

  .va-radio__icon {
    display: none;
  }

  .va-radio__text {
    margin-left: 0;
  }
}

.va-button {
  margin: 2px;
}
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
