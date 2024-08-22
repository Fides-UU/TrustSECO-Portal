<script>
import PackageDetailsComponent from '@/components/PackageDetails.vue';
import TrustFacts from '@/components/cards/TrustFacts.vue';

export default {
  components: {
    PackageDetailsComponent,
    TrustFacts
  },
  name: 'package-view',
  props: {
    name: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      default: '',
    },
  },
};

</script>

<template>
  <va-card>
    <va-card-title>View Package</va-card-title>
    <va-card-content>
      <package-details-component ref="packageDetails" :name="name" :version="version" />
    </va-card-content>
  </va-card>
  <TrustFacts :name="name" :version="version"/>
</template>

<style scoped>
</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
