<script lang="ts">
import { defineComponent } from 'vue';
import { TrustFact } from '../../api';
import Card from './Card.vue';

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
  methods: {
    async updateTrustFacts() {
      this.isLoading = true;
      this.trustFacts = (
        await this.$dltApi.getTrustFacts(this.name, this.version)
      ).sort((a, b) => (a.type === b.type ? 0 : a.type > b.type ? 1 : -1));
      this.isLoading = false;
    },
  },
  components: {
    Card,
  },
});
</script>

<template>
  <div class="cardContainer">
    <Card
      v-for="trustfact in trustFacts"
      :fact_code="trustfact.type"
      :fact_content="trustfact.value"
    ></Card>
  </div>
</template>

<style scoped>
.cardContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  gap: 24px;
}
</style>
