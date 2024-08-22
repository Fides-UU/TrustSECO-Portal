<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  fact_code: { type: String, required: true },
  fact_content: { type: String, required: true },
});

const score_influence_ref = ref(null);

let codeToName: Record<string, string> = {
  cve_count: 'Cve count',
  cve_vulnerabilities: 'Cve vulnerabilities',
  gh_average_resolution_time: 'Average issue resolution time',
  gh_contributor_count: 'GitHub contributor count',
  gh_gitstar_ranking: 'GitHub star ranking', // How high it ranks sorted by stars for the specific language
  gh_issue_ratio: 'Closed/Open issue ratio',
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
  lib_release_count: 'Amount of releases',
  lib_release_frequency: 'Average time per release',
  lib_sourcerank: 'Sourcerank metric', // https://libraries.io/pypi/numpy/sourcerank
  so_popularity: 'StackOverflow popularity',
  vs_virus_ratio: 'Virus ratio', // amount of virusses found / amount if links scanned
};

let codeToExplanation: Record<string, string> = {
  cve_count: 'Amount of CVE found for this package.',
  cve_vulnerabilities: '', //TODO explenation of this depends on visualiziation
  gh_average_resolution_time:
    'Average time it takes for a GitHub issue to be resolved.',
  gh_gitstar_ranking:
    'How high the repository of the package ranks based on star count among repos with the same programming language.', // How high it ranks sorted by stars for the specific language
  gh_issue_ratio: 'Ration of closed to open GitHub issues.',
  gh_open_issues_count: 'Amount of open issues.',
  gh_owner_stargazer_count:
    'Total amount of Stargazers the owner of repository has.',
  gh_release_download_count:
    'Number of downloads for the github release assets for this specific release.',
  gh_release_issues_count:
    'Amount of issues created during the time this version was the most recent release.',
  gh_repository_language: 'Main language the library was written in.',
  gh_total_download_count:
    'Total amount of downloads for the github release assets.',
  gh_user_count: 'Amount of repositories dependant on this package.',
  gh_yearly_commit_count: 'Amount of commits in the previous 365 days.',
  gh_zero_response_issues_count:
    'Amount of issues on GitHub without a response.',
  // TODO: these are different but I am not sure how/why, libraries.io points
  // back to github but some how comes up with a different number, strange
  gh_contributor_count: 'Contributor count sourced from GitHub.',
  lib_contributor_count: 'Contributor count sourced from libraries.io.',
  lib_dependency_count: 'Amount of packages the package is dependant on.',
  lib_dependent_count: 'Amount of packages that depend on this package.',
  lib_first_release_date: 'Date of the initial release of this package.',
  lib_latest_release_date: 'Date of the most recent release.',
  lib_release_count: 'Amount of releases/versions this packages has.',
  lib_release_frequency: 'Average time elapsed per release.',
  lib_sourcerank:
    'A metric created by libraries.io that combines several factors such as amount of stars and if it is still in beta. For more details visit the website: https://libraries.io/pypi/numpy/sourcerank . ',
  so_popularity: 'Monthly stackoverflow popularity.', // TODO
  vs_virus_ratio:
    'Ratio of virus found to amount of links scanned. Virus are scanned for using ClamAV.', // amount of virusses found / amount if links scanned
};

function convertFactValue(fact_value: string, fact_code: string): String {
  let res;
  switch (fact_code) {
    case 'gh_repository_language':
      res = fact_value.replaceAll('"', '');
      break;
    case 'lib_first_release_date':
    case 'lib_latest_release_date':
      let date = Date.parse(fact_value.replaceAll('"', ''));
      res = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
      break;
    case 'so_popularity':
    case 'vs_virus_ration':
    case 'gh_issue_ratio':
      let num = parseFloat(fact_value);
      res = num.toFixed(3).toString();
      break;
    case 'gh_average_resolution_time':
    case 'lib_release_frequency':
      let num2 = parseFloat(fact_value);
      res = num2.toFixed(0).toString();
      break;
    default:
      res = fact_value;
      break;
  }
  return res;
}

let trust_score_factors: Record<string, number> = {
  cve_count: -16,
  gh_contributor_count: 4,
  gh_issue_ratio: -15,
  gh_open_issues_count: 34,
  gh_owner_stargazer_count: 24,
  gh_release_download_count: 48,
  gh_total_download_count: 63,
  gh_user_count: 60,
  gh_yearly_commit_count: 15,
  gh_zero_response_issues_count: -12,
  lib_contributor_count: 6,
  lib_dependency_count: 8,
  lib_dependent_count: 7,
  lib_release_count: 2,
  lib_release_frequency: 2,
  so_popularity: 30,
  vs_virus_ratio: -16,
};

function calculate_trust_score_influence(
  fact_value: string,
  fact_code: string,
): number | null {
  if (!trust_score_factors.hasOwnProperty(fact_code)) return null;
  return trust_score_factors[fact_code] * parseFloat(fact_value);
}

function calculate_color(score_influence: number): string {
  if (score_influence < 0) {
    let logged = Math.log10(-score_influence);
    let value = calculate_single_value(logged, 3);
    return `rgb(255,${value},${value})`;
  } else {
    let logged = Math.log10(score_influence);
    let value = calculate_single_value(logged, 7);
    return `rgb(${value},255,${value})`;
  }
}

function calculate_single_value(num: number, max: number) {
  return Math.min(255, ((max - num) / max) * 255);
}

onMounted(() => {
  let score_influence = calculate_trust_score_influence(
    props.fact_content,
    props.fact_code,
  );
  if (score_influence !== null && score_influence_ref.value !== null) {
    let score_element = score_influence_ref.value as HTMLElement;
    let color = calculate_color(score_influence);
    score_element.style.backgroundColor = color;
    if (score_element.parentElement !== null)
      score_element.parentElement.style.borderTop = `3px solid ${color}`;
  }
});
</script>

<template>
  <div class="card">
    <h2 class="fact-name card-child">{{ codeToName[fact_code] }}</h2>
    <p class="card-child fact-value">
      {{ convertFactValue(fact_content, fact_code) }}
    </p>
    <p class="fact-code card-child">{{ fact_code }}</p>
    <div class="seperator" />
    <p class="card-child explanation">{{ codeToExplanation[fact_code] }}</p>
    <div v-if="trust_score_factors.hasOwnProperty(fact_code)" class="card-child score-influence" ref="score_influence_ref">
      <p>
        Trust score influence: {{ calculate_trust_score_influence(fact_content, fact_code)?.toFixed(0) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  /*width: 15em;*/
  /*margin: 0.5em;*/
  border-top: 3px solid rgb(44, 130, 224);
  background-color: white;
  /*height: 10em;*/
  /*height: 175px;*/
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
  /*text-overflow: ellipsis;*/
  /*overflow: scroll;*/
}

.seperator {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  background-color: grey;
  height: 1px;
}

.explanation:has(+ .score-influence) {
  height: 70px;
}

.fact-value {
  overflow: scroll;
  height: 1em;
  white-space: nowrap;
}


.score-influence {
  border-radius: 5px;
  padding: 2px 4px 2px 4px;
  margin-bottom: 8px;
}

.score-influence p {
  font-size: 0.9em;
  overflow: scroll;
  white-space: nowrap;
}
</style>
