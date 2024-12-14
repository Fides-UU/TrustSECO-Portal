<template>
  <router-view v-slot="{ Component }">
    <!--    <keep-alive include="package-view">-->
    <component :is="Component"/>
    <!--    </keep-alive>-->
  </router-view>
</template>

<script lang="ts">
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import './sass/index.scss';
</style>

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */
