<script lang="ts">
import { defineComponent } from 'vue';
import { TrustFact } from '../../api';
import TrustFactCategory from './TrustFactCategory.vue';

interface Category {
  name: string,
  trustfacts: TrustFact[],
  score: number,
}

const categories = [
  // Technical specifications category is not included here, as the programming
  // language fact has been moved to the packageDetails component
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
      categories,
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
    trustFactsWithPlaceholders(): TrustFact[] {
      if (this.trustFacts.length > 0) {
        return this.trustFacts;
      }
      // add some empty facts to show with the loading animation
      return Array(12).fill({ type: '', value: '' });
    },
    /** Filters out the correct facts for each category, and filters out any
    categories that do not contain any trustfacts */
    categoryTrustFacts(): Category[] {
      const categorys = [] as Category[];
      /* eslint-disable-next-line no-restricted-syntax */
      for (const category of categories) {
        // Filter only the facts the belong to this category
        const categoryFacts = this.trustFacts.filter((fact: TrustFact) => category.fact_codes.includes(fact.type));
        if (categoryFacts.length > 0) {
          categorys.push({ name: category.name, trustfacts: categoryFacts, score: this.scoreCategories[category.name] });
        }
      }
      return categorys;
    },
  },
  methods: {
    async updateTrustFacts() {
      this.isLoading = true;
      this.trustFacts = (
        await this.$dltApi.getTrustFacts(this.name, this.version)
      /* eslint-disable-next-line no-nested-ternary */
      ).sort((a, b) => (a.type === b.type ? 0 : a.type > b.type ? 1 : -1));
      this.isLoading = false;
      this.scoreCategories = await this.$dltApi.getTrustScoreCategories(this.name, this.version);
    },
  },
  components: {
    TrustFactCategory,
  },
});
</script>

<template>
  <div class="cardContainer">
    <TrustFactCategory
      v-for="category in categoryTrustFacts"
      :key="category.name"
      :category="category.name"
      :trustFacts="category.trustfacts"
      :isLoading="isLoading"
      :categoryScore="category.score">
    </TrustFactCategory>
  </div>
</template>

<style scoped>
.cardContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  gap: 18px;
}
</style>
