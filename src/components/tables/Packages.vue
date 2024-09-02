<template>
  <va-input v-model="filter" class="xs12 filter" placeholder="Filter Packages"/>
  <va-data-table :columns="columns" :filter="filter" :items="packages" :loading="isLoading" allow-footer-sorting
                 clickable hoverable sticky-header striped @row:click="loadPackage">
    <template #cell(versions)="{ rowData }">
      <div v-if="rowData.versions.length >= 3" class="range">
        <va-badge :text="rowData.versions[0]" color="secondary"/>
        -
        <va-badge :text="rowData.versions[rowData.versions.length - 1]" color="secondary"/>
      </div>
      <div class="list">
        <span v-for="version in rowData.versions" :key="version">
          <va-badge :text="version" color="secondary" @click.stop="loadPackageVersion(rowData.name, version)"/>
        </span>
      </div>
    </template>
  </va-data-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import { Package } from '@/api';

interface RowClickEmit {
  event: Event,
  item: Package,
  itemIndex: number,
}

export default defineComponent({
  name: 'packages-table',
  data() {
    const columns = [
      {
        key: 'platform',
        verticalAlign: 'top',
        width: '25%',
        sortable: true,
      },
      {
        key: 'owner',
        verticalAlign: 'top',
        width: '25%',
        sortable: true,
      },
      {
        key: 'name',
        verticalAlign: 'top',
        width: '25%',
        sortable: true,
      },
      {
        key: 'versions',
        classes: ['cellVersions'],
        width: '25%',
      },
    ];

    return {
      columns,
      packages: [] as Package[],
      filter: '',
      isLoading: true,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.packages = await this.$dltApi.getPackages();
      this.isLoading = false;
    },
    // TODO: How to type this parameter?
    // Vuestic docs say `RowClickEmit` but it doesn't exist, so it's manually defined up above
    loadPackage(event: RowClickEmit) {
      const { name } = event.item;
      router.push({
        name: 'Package',
        params: {
          name,
        },
      });
    },
    // Sadly cannot easily merge the two `loadPackage` variants, due to VuesticUI limitations
    loadPackageVersion(name: string, version: string) {
      router.push({
        name: 'Package with Version',
        params: {
          name,
          version,
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.va-data-table {
  // The full viewport - .app__navbar height - .layout padding - .va-card__* padding - .va-card__title font-size - filter input height - 2px (idk)
  max-height: calc(100vh - 4.0625rem - 2 * 1.5rem - 4 * var(--va-card-padding) - 0.625rem - var(--va-input-min-height) - 2px);
}

// For multiple versions, on row hover switch between range and list views
.va-data-table__table-tr {
  .cellVersions {
    .range {
      display: block;
    }

    .range + .list {
      display: none;
    }
  }

  &:hover .cellVersions {
    .range {
      display: none;
    }

    .list {
      display: block;
    }
  }
}
</style>
