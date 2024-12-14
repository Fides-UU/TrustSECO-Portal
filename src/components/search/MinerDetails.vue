<template>
  <div class="row">
    <div class="flex xs6">
      <div class="row">
        <div class="flex xs4 propName">name:</div>
        <div class="flex xs8 propValue">{{ miner.name }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">id:</div>
        <div class="flex xs8 propValue">{{ miner.id }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">config:</div>
        <div class="flex xs8 json">{{ miner.config }}</div>
      </div>
      <div class="row">
        <div class="flex xs4 propName">state:</div>
        <div class="flex xs8 json">{{ miner.state }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { defaultMiner } from '@/api';

export default defineComponent({
  name: 'miner-details-component',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      miner: defaultMiner,
    };
  },
  async mounted() {
    this.miner = await this.$searchApi.getMiner(this.id);
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
