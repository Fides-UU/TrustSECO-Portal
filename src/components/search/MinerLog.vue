<template>
  <div v-if="logs.length === 0">Nothing yet</div>
  <VueTerminal
    v-if="logs.length > 0"
    :messages="logs"
    console-sign=""
    height="350px"
    style="width: 100%"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueTerminal from '@/components/VueTerminal.vue';

export default defineComponent({
  name: 'miner-log-component',
  components: { VueTerminal },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      logs: [],
      timer: null,
    };
  },
  async mounted() {
    // retrieve the logs, initially
    this.getMinerLogs();

    // then retrieve the logs every few seconds
    this.timer = setInterval(() => {
      this.getMinerLogs();
    }, 3000);
  },
  methods: {
    async getMinerLogs() {
      this.logs = await this.$searchApi.getMinerLogs(this.id);
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
});
</script>

<style scoped></style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
