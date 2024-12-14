<template>
  <span v-if="!isTimeAgo">{{ formatted }}</span>
  <span v-if="isTimeAgo" :title="formatted">{{ timeAgo }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as timeAgo from 'timeago.js';

export default defineComponent({
  name: 'display-date-component',
  props: {
    date: {
      type: Date,
      required: true,
    },
    isTimeAgo: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formatted() {
      return this.date.toLocaleString();
    },
    timeAgo() {
      return timeAgo.format(this.date);
    },
  },
});
</script>
<style scoped>
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
