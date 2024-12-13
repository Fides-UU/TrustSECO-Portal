<script setup lang="ts">
import { ref, defineProps } from 'vue';
import PopUpMessage from '@/components/PopUpMessage.vue';

defineProps<{ title: string }>();
const show = ref(false);
</script>

<template>
  <PopUpMessage v-model="show" :title="title">
    <slot/>
  </PopUpMessage>

  <va-icon class="material-icons info" @click="show = true">info</va-icon>
</template>

<style scoped>
.info {
  margin-left: 3px;
  margin-right: 3px;
}
</style>
