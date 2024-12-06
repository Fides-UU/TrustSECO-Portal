<script setup lang="ts">
/* eslint-disable no-undef */
defineProps<{ title: string }>();
const enabled = defineModel<boolean>();
defineEmits(['button-clicked']);
</script>

<template>
  <va-modal v-model="enabled" hide-default-actions overlay-opacity="0.2">
    <template #header>
      <h2>{{ title }}</h2>
    </template>
    <div><slot></slot></div>
    <template #footer>
      <va-button @click="enabled = false; $emit('button-clicked')"> Close </va-button>
    </template>
  </va-modal>
</template>
