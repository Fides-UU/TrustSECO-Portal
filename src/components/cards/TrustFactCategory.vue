<script setup lang="ts">
import { TrustFact } from '../../api';
import TrustFactCard from './TrustFact.vue';

defineProps<{
  category: string;
  trustFacts: TrustFact[];
  isLoading: boolean;
}>();
</script>

<template>
  <div class="category">
    <h1 class="category-child">{{ category }}</h1>
    <h1 class="category-child">Score: {{ 100 }}</h1>
    <h1 class="category-child">Score Ranking: {{ 100 }} / {{1000}}</h1>
  </div>
  <TrustFactCard
    v-for="trustfact in trustFacts"
    :fact_code="trustfact.type"
    :fact_content="trustfact.value"
    :loading="isLoading"
  ></TrustFactCard>
</template>

<style scoped>
.category {
  border-top: 3px solid rgb(44, 130, 224);
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  grid-column: 1/ -1;
  padding: 6px 0px 0px 8px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  gap: 18px;
}

.category-child {
  margin-bottom: 6px;
  margin-right: 8px;
  text-align: center;
}
</style>
