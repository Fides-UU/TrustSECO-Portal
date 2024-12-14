<template>
  <div v-if="logs.length === 0">Nothing yet</div>
  <VueTerminal v-if="logs.length > 0" :messages="logs" console-sign="$" height="350px" style="width: 50%"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueTerminal from '@/components/VueTerminal.vue';

export default defineComponent({
  name: 'spider-log-component',
  components: { VueTerminal },
  data() {
    return {
      logs: [],
    };
  },
  async mounted() {
    this.setupWebsocket();
  },
  methods: {
    setupWebsocket() {
      const connection = new WebSocket(`ws://${process.env.HOST}/websocket`);

      connection.onmessage = (message) => {
        this.logs.push(message.data);
      };
    },
  },
});
</script>

<style scoped>
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
