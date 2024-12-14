<template>
  <va-input v-model="filter" class="xs12 filter" placeholder="Filter Jobs"/>
  <va-data-table :columns="columns" :filter="filter" :items="jobs" :loading="isLoading" allow-footer-sorting clickable
                 hoverable sticky-header striped/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Job } from '@/api';

export default defineComponent({
  name: 'jobs-table',
  data() {
    const columns = [
      {
        key: 'id',
        verticalAlign: 'top',
        sortable: true,
      },
      {
        key: 'package',
        verticalAlign: 'top',
        sortable: true,
      },
      {
        key: 'version',
        verticalAlign: 'top',
        sortable: true,
      },
      {
        key: 'fact',
        verticalAlign: 'top',
        sortable: true,
      },
      {
        key: 'bounty',
        verticalAlign: 'top',
        sortable: true,
      },
    ];

    return {
      columns,
      jobs: [] as Job[],
      filter: '',
      isLoading: true,
    };
  },
  async mounted() {
    this.jobs = await this.$dltApi.getJobs();
    this.isLoading = false;
  },
});
</script>

<style lang="scss" scoped>
.va-data-table {
  // The full viewport - .app__navbar height - .layout padding - previous .va-card height/margin - .va-card__* padding - .va-card__title font-size - filter input height - 2px (idk)
  max-height: calc(100vh - 4.0625rem * 2 - 2 * 1.5rem - 162px - 1.5rem - 4 * var(--va-card-padding) - 0.625rem - var(--va-input-min-height) - 2px);
}
</style>
