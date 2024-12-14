<script setup lang="ts">
import { defineProps } from 'vue';
import { TrustFact } from '../../api';
import TrustFactCard from './TrustFact.vue';

defineProps<{
  category: string;
  trustFacts: TrustFact[];
  isLoading: boolean;
  categoryScore?: number;
}>();
</script>

<template>
  <div class="category" v-if="!isLoading">
    <h1 class="category-child">{{ category }}</h1>
    <h1 class="category-child" v-if="categoryScore !== undefined">Score: {{ categoryScore.toFixed(0) }}</h1>
  </div>
  <TrustFactCard
    v-for="trustfact in trustFacts"
    :key="trustfact.type"
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
  padding: 6px 10% 0px 10%;
  grid-column: 1/ -1;
  display: flex;
  justify-content: space-between;
}

.category-child {
  margin-bottom: 6px;
  margin-right: 8px;
  text-align: center;
}
</style>
