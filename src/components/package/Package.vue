<script setup lang="ts">
import { Package } from '@/api';
import router from '@/router';

defineProps<{ package: Package }>();

function loadPackage(name: string) {
  router.push({
    name: 'Package',
    params: {
      name,
    },
  });
}

function loadPackageVersion(name: string, version: string) {
  router.push({
    name: 'Package with Version',
    params: {
      name,
      version,
    },
  });
}

function platformImage(platform: string): string {
  platform = platform.toLowerCase()
  switch (platform) {
    case "cran":
    case "go":
    case "maven":
    case "npm":
    case "nuget":
    case "pypi":
    case "cargo":
      return `/${platform}.png`
  }
  return "/package.svg"
}
</script>

<template>
  <div class="package-container">
    <img
      :alt="package.platform"
      :title="package.platform"
      class="platform-logo"
      :src="platformImage(package.platform)"
    />
    <div class="package-info">
      <h1 class="package-name" @click="() => loadPackage(package.name)">{{ package.name }}</h1>
      <div class="version-container">
        <div class="version" v-for="version in package.versions" @click="() => loadPackageVersion(package.name, version)">
          {{ version }}
        </div>
      </div>
      <p class="owner">
        <a :href="`https://github.com/${package.owner}`" target="_blank">
          <VaIcon name="person" size="21px" />
          {{ package.owner }}
        </a>
      </p>
    </div>
  </div>
  <div class="seperator" />
</template>

<style scoped>
.platform-logo {
  width: 70px;
  height: 70px;
  margin: 0px 12px;
}

.version-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.version {
  padding: 4px;
  background-color: var(--va-gray);
  color: var(--va-white);
  font-size: 0.8em;
  border-radius: 2px;
  cursor: pointer;
}

.package-container {
  display: flex;
  align-items: center;
}

.package-info {
  padding-top: 8px;
}

.package-info > * {
  margin: 0px 12px 8px 12px;
}

.icon {
  font-size: 21px !important;
}

.seperator {
  display: block;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: auto;
  margin-right: auto;
  background-color: var(--va-gray);
  height: 1px;
}

a {
  color: var(--va-primary);
}

.package-name {
  cursor: pointer;
}
</style>
