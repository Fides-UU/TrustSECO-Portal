<template>
  <va-input v-model="filter" class="xs12 filter" placeholder="Filter Miners" />
  <va-data-table
    :columns="columns"
    :filter="filter"
    :items="miners"
    :loading="isLoading"
    allow-footer-sorting
    clickable
    hoverable
    sticky-header
    striped
    @row:click="loadMiner"
  >
    <template #cell(worker_name)="{ rowData: miner }">
      {{ miner.config.worker_name }}
    </template>
    <template #cell(actions)="{ rowData: miner }">
      <div
        class="d-inline-flex flex-row align-items-center justify-content-end"
      >
        <va-switch
          v-model="miner.state.Running"
          class="pt-1"
          indeterminate
          :loading="isLoading"
          :color="miner.state.Running ? 'success' : 'warning'"
          @click.capture.stop="toggleMinerRunning(miner.id)"
        />
        <va-button
          icon="restart_alt"
          class="ml-2"
          @click.stop="rerunMiner(miner.id)"
        />
        <va-button
          icon="delete"
          class="ml-2"
          color="warning"
          @click.stop="changeMinerState(miner.id, 'remove')"
        />
      </div>
    </template>
  </va-data-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import { Miner, MinerStateAction } from '@/api';

interface RowClickEmit {
  event: Event;
  item: Miner;
  itemIndex: number;
}

export default defineComponent({
  name: 'miners-table',
  data() {
    const columns = [
      {
        key: 'name',
        verticalAlign: 'middle',
        width: '30%',
        sortable: true,
      },
      {
        key: 'worker_name',
        width: '30%',
        sortable: true,
      },
      {
        key: 'actions',
        verticalAlign: 'middle',
        align: 'right',
        width: '40%',
      },
    ];

    return {
      columns,
      miners: [] as Miner[],
      filter: '',
      isLoading: true,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.miners = await this.$searchApi.getMiners();
      this.isLoading = false;
    },
    loadMiner(event: RowClickEmit) {
      const { id } = event.item;
      router.push({
        name: 'SearchSECO Miner',
        params: {
          id,
        },
      });
    },
    async rerunMiner(id: string) {
      this.isLoading = true;
      const data = await this.$searchApi.rerunMiner(id);
      console.log('data', data);
      await this.fetchData();
    },
    async toggleMinerRunning(id: string) {
      if (this.isLoading) return;
      const miner = this.miners.find((x) => x.id === id);
      await this.changeMinerState(id, miner.state.Running ? 'stop' : 'start');
    },
    async changeMinerState(id: string, action: MinerStateAction) {
      this.isLoading = true;
      const data = await this.$searchApi.changeMinerState(id, action);
      console.log('data', data);
      await this.fetchData();
    },
  },
});
</script>

<style lang="scss" scoped>
.va-data-table {
  // The full viewport - .app__navbar height - .layout padding - .va-card__* padding - .va-card__title font-size - filter input height - 2px (idk)
  max-height: calc(
    100vh - 4.0625rem - 2 * 1.5rem - 4 * var(--va-card-padding) - 0.625rem -
      var(--va-input-min-height) - 2px
  );
}
</style>
