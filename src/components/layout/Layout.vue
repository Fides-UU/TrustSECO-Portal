<template>
  <div class="app">
    <HeaderPrimary/>
    <div class="app__content">
      <div class="app__page">
        <div class="layout gutter--xl">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPrimary from './HeaderPrimary.vue';

export default {
  name: 'layout-component',
  components: {
    HeaderPrimary,
  },
};
</script>

<style lang="scss">
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__content {
    display: flex;
    height: calc(100vh - 8.13rem - 1px);
    flex: 1;
  }

  &__page {
    flex-grow: 2;
    overflow-y: auto;
  }
}
</style>
