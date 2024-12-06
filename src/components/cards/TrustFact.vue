<script setup lang="ts">
import { defineProps } from 'vue';
import CveVulnerabilities from './CveVulnerabilities.vue';

defineProps({
  factCode: { type: String, required: true },
  factContent: { type: String, required: true },
  loading: { type: Boolean, required: true },
});

const codeToName: Record<string, string> = {
  cve_count: 'Cve count',
  cve_vulnerabilities: 'Cve vulnerabilities',
  gh_average_resolution_time: 'Average issue resolution time',
  gh_contributor_count: 'GitHub contributor count',
  gh_gitstar_ranking: 'GitHub star ranking',
  gh_issue_ratio: 'Open/Closed issue ratio',
  gh_open_issues_count: 'Open issues',
  gh_owner_stargazer_count: 'Star count of owner',
  gh_release_download_count: 'Release download count',
  gh_release_issues_count: 'Issue count for specific release',
  gh_repository_language: 'Programming language',
  gh_total_download_count: 'Number of downloads',
  gh_user_count: 'Used count',
  gh_yearly_commit_count: 'Yearly commit count',
  gh_zero_response_issues_count: 'Issues without responses',
  lib_contributor_count: 'libraries.io Contributor count',
  lib_dependency_count: 'Dependecy count',
  lib_dependent_count: 'Dependant packages count',
  lib_first_release_date: 'First release date',
  lib_latest_release_date: 'Most recent release',
  lib_release_count: 'Number of releases',
  lib_release_frequency: 'Average time per release',
  lib_sourcerank: 'Sourcerank metric',
  so_popularity: 'StackOverflow popularity',
  vs_virus_ratio: 'Virus ratio',
};

const codeToExplanation: Record<string, string> = {
  cve_count: 'Number of CVE vulnerabilities found for this package.',
  cve_vulnerabilities: '',
  gh_average_resolution_time:
    'Average time it takes for a GitHub issue to be resolved.',
  gh_gitstar_ranking:
    'How high the repository ranks based on star count among repos with the same programming language.',
  gh_issue_ratio: 'Ratio of open to closed GitHub issues.',
  gh_open_issues_count: 'Number of open issues.',
  gh_owner_stargazer_count:
    'Total number of Stargazers the owner of the repository has.',
  gh_release_download_count:
    'Number of downloads for the github release assets for this specific release.',
  gh_release_issues_count:
    'Number of issues created during the time this version was the most recent release.',
  gh_repository_language: 'Main programming language the library was written in.',
  gh_total_download_count:
    'Total number of downloads for all github release assets.',
  gh_user_count: 'Number of repositories dependant on this package.',
  gh_yearly_commit_count: 'Number of commits in the previous 365 days.',
  gh_zero_response_issues_count:
    'Number of issues on GitHub without a response.',
  // TODO: these are different but I am not sure how/why, libraries.io points
  // back to github but some how comes up with a different number, strange
  gh_contributor_count: 'Contributor count sourced from GitHub.',
  lib_contributor_count: 'Contributor count sourced from libraries.io.',
  lib_dependency_count: 'Number of packages the package is dependant on.',
  lib_dependent_count: 'Number of packages that depend on this package.',
  lib_first_release_date: 'Date of the initial release of this package.',
  lib_latest_release_date: 'Date of the most recent release.',
  lib_release_count: 'Number of releases/versions this packages has.',
  lib_release_frequency: 'Average time elapsed per release.',
  lib_sourcerank:
    'A metric created by libraries.io that combines several factors such as number of stars and if it is still in beta. For more details visit the website: https://libraries.io/pypi/numpy/sourcerank . ',
  so_popularity: 'Monthly stackoverflow popularity.', // TODO
  vs_virus_ratio:
    'Ratio of virus found to number of links scanned. Virus are scanned for using ClamAV.',
};

// the amount of terms that the formatting should print
// for example termAmount -> 1 year, 2 weeks, 3 minutes
const termAmount = 2;

// Time intervals to be usid in displaying time durations
const timeIntervals = [
  { name: 'year', duration: 365 * 24 * 60 * 60 },
  { name: 'month', duration: 30.4 * 24 * 60 * 60 },
  { name: 'week', duration: 7 * 24 * 60 * 60 },
  { name: 'day', duration: 24 * 60 * 60 },
  { name: 'hour', duration: 60 * 60 },
  { name: 'minute', duration: 60 },
  { name: 'second', duration: 1 },
];

/** Converts a duration in seconds to a pretty format.
* There is already a built in javascript function for this, but it is not
* supported on every browser yet. */
function convertDuration(secs: number): string {
  let seconds = Math.floor(secs);
  if (seconds === 0) return '0 seconds';
  let formatted = '';
  for (let i = 0; i < termAmount && seconds > 0; i += 1) {
    // Find biggest duration that fits in the amount of seconds
    /* eslint-disable-next-line no-loop-func */
    const maxDuration = timeIntervals.find(({ duration }) => duration <= seconds);
    if (maxDuration === undefined) break;
    const { name, duration } = maxDuration;

    const amount = Math.floor(seconds / duration);
    seconds %= duration;
    // Add seperator if string isn't empty
    if (formatted.length > 0) formatted += ', ';

    let string = `${amount} ${name}`;
    // Make plural if amount is bigger than 1
    if (amount > 1) string += 's';
    formatted += string;
  }
  return formatted;
}

function convertFactValue(factValue: string, factCode: string): string {
  let res;
  switch (factCode) {
    case 'gh_repository_language':
      res = factValue.replaceAll('"', '');
      break;
    case 'lib_first_release_date':
    case 'lib_latest_release_date': {
      const date = Date.parse(factValue.replaceAll('"', ''));
      res = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
      break;
    }
    case 'so_popularity':
    case 'vs_virus_ration':
    case 'gh_issue_ratio': {
      const num = parseFloat(factValue);
      res = num.toFixed(3);
      break;
    }
    case 'gh_average_resolution_time':
    case 'lib_release_frequency': {
      const num2 = parseFloat(factValue);
      res = convertDuration(num2);
      break;
    }
    case 'cve_vulnerabilities':
      res = '';
      break;
    default:
      res = factValue;
      break;
  }
  return res;
}
</script>

<template>
  <div class="card" v-if="!loading">
    <h2 class="fact-name card-child">{{ codeToName[factCode] }}</h2>
    <p class="card-child fact-value" v-if="factCode !== 'cve_vulnerabilities'">
      {{ convertFactValue(factContent, factCode) }}
    </p>
    <div class="seperator" />
    <p
      class="card-child explanation"
      v-if="factCode !== 'cve_vulnerabilities'"
    >
      {{ codeToExplanation[factCode] }}
    </p>
    <CveVulnerabilities
      v-if="factCode === 'cve_vulnerabilities'"
      :cve_data="JSON.parse(factContent)"
    />
  </div>
  <div class="card card-loading" v-if="loading">
    <div class="card-content-loading"></div>
  </div>
</template>

<style scoped>
.card {
  border-top: 3px solid rgb(44, 130, 224);
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
}

.card-loading {
  height: 167px;
}

.card-content-loading {
  background: var(--va-background);
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 3s shine linear infinite;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  margin: 6px;
  border-radius: 5px;
  background-position-x: 200%;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}

.card-child {
  margin: 6px 8px;
}

.fact-name {
  font-size: 16px;
  margin-bottom: 0px;
}

.fact-code {
  color: var(--va-gray);
  font-family: var(--va-font-family);
  font-size: 15px;
  margin-top: 3px;
}

.explanation {
  font-style: italic;
  font-size: 0.9em;
  height: 87px;
  overflow: auto;
}

.seperator {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  background-color: var(--va-gray);
  height: 1px;
}

.fact-value {
  height: 1em;
  white-space: nowrap;
}
</style>
