<script setup lang="ts">
import { computed } from 'vue';

let props = defineProps<{ cve_data: any[] }>();

const sorted_cves = computed(() => props.cve_data.sort((c1, c2)=> c1.CVE_ID < c2.CVE_ID ? 1 : -1))

</script>

<template>
  <div class="cve-grid">
    <template v-for="cve in sorted_cves">
      <div class="cve-id"><a :href="`https://nvd.nist.gov/vuln/detail/${cve.CVE_ID}`" target="_blank">{{ cve.CVE_ID }}</a></div>
      <div class="cve-score">{{ cve.CVE_score }}</div>
      <div class="cve-start">{{ cve.CVE_affected_version_start }}</div>
      <svg class="range-indicator">
        <circle
          cx="4"
          cy="7"
          r="3"
          stroke="black"
          stroke-width="2"
          :fill="cve.CVE_affected_version_start_type==='including' ? 'black' : 'white'"
        />
        <line x1="7" y1="7" x2="23" y2="7" stroke="black" stroke-width="2" />
        <circle
          cx="26"
          cy="7"
          r="3"
          stroke="black"
          stroke-width="2"
          :fill="cve.CVE_affected_version_end_type==='including' ? 'black' : 'white'"
        />
      </svg>
      <div class="cve-end">{{ cve.CVE_affected_version_end }}</div>
      <div class="seperator" v-if="cve !== cve_data.at(-1)"/>
    </template>
  </div>
</template>

<style scoped>
.cve-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  overflow-y: scroll;
  height: 124px;
}

.cve-id{
  grid-column: 1/3;
  padding-left: 1em;
}

.cve-start {
  grid-column: 1/2;
  text-align:right;
}

.range-indicator {
  grid-column: 2/3;
  width: 30px;
  height: 12px;
  margin: 0px 4px 0px 4px;
}

.cve-end {
  grid-column: 3/4;
  text-align:left;
}

.cve-end:last-child {
  margin-bottom: 6px;
}

.cve-score {
  grid-column: 3/4;
  padding-left: 1em;
}

.seperator {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  background-color: var(--va-gray);
  height: 1px;
  grid-column: 1/4;
  width: 100%
}
</style>
