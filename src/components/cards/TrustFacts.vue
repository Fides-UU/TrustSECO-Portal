<script lang="ts">
import { defineComponent } from 'vue';
import { TrustFact } from '../../api';
import TrustFactCard from './TrustFact.vue';
import TrustFactCategory from './TrustFactCategory.vue';

interface category {
  name: string;
  fact_codes: string[];
}

let categories: category[] = [
  {
    name: 'Community and Popularity',
    fact_codes: [
      'gh_gitstart_ranking',
      'gh_owner_stargazer_count',
      'gh_release_download_count',
      'so_popularity',
      'gh_contributor_count',
      'lib_contrubtor_count',
      'lib_sourcerank',
    ],
  },
  {
    name: 'Dependencies and Ecosystem',
    fact_codes: [
      'gh_user_count',
      'lib_dependency_count',
      'lib_dependent_count',
    ],
  },
  {
    name: 'Technical Specifications',
    fact_codes: [
      // TODO just a single fact will be a bit akward for the visualisation
      // maybe move it above with the package info?
      'gh_repository_language',
    ],
  },
  {
    name: 'Project Health and Maintenance',
    fact_codes: [
      'lib_first_release_date',
      'gh_issue_ratio',
      'gh_open_issues_count',
      'gh_release_issues_count',
      'gh_yearly_commit_count',
      'gh_zero_response_issues_count',
      'lib_latest_release_date',
      'lib_release_count',
      'lib_release_frequency',
      'gh_average_resolution_time',
    ],
  },
  {
    name: 'Security',
    fact_codes: ['cve_count', 'cve_vulnerabilities', 'vs_virus_ratio'],
  },
];

export default defineComponent({
  name: 'trust-facts-table',
  props: {
    name: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      trustFacts: [] as TrustFact[],
      filter: '',
      isLoading: true,
      categories: categories,
      scoreCategories: {} as Record<string, number>,
    };
  },
  watch: {
    async version() {
      await this.updateTrustFacts();
    },
  },
  async mounted() {
    if (this.version !== '') {
      await this.updateTrustFacts();
    }
  },
  computed: {
    trustFactsWithPlaceholders() {
      if (this.trustFacts.length > 0) {
        return this.trustFacts;
      } else {
        // add some empty facts to show with the loading animation
        return Array(12).fill({ type: '', value: '' });
      }
    },
  },
  methods: {
    async updateTrustFacts() {
      this.isLoading = true;
      this.trustFacts = (
        await this.$dltApi.getTrustFacts(this.name, this.version)
      ).sort((a, b) => (a.type === b.type ? 0 : a.type > b.type ? 1 : -1));
      this.isLoading = false;
      this.scoreCategories = await this.$dltApi.getTrustScoreCategories(this.name, this.version);
    }
  },
  components: {
    TrustFactCard,
    TrustFactCategory,
  },
});
</script>

<template>
  <div class="cardContainer">
    <TrustFactCategory
      v-for="category in categories"
      :category="category.name"
      :trustFacts="
        trustFacts.filter((fact: TrustFact) =>
          category.fact_codes.includes(fact.type),
        )
      "
      :isLoading="isLoading"
      :categoryScore="scoreCategories[category.name]"
    ></TrustFactCategory>
  </div>
</template>

<style scoped>
.cardContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  gap: 18px;
}
</style>
