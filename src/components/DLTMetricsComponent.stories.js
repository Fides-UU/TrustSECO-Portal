// YourComponent.stories.js

import DLTMetricsComponent from './DLTMetricsComponent.vue';

// 👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'DLTMetricsComponent',
  component: DLTMetricsComponent,
};

// 👇 We create a “template” of how args map to rendering
const Template = (args) => ({
  components: { DLTMetricsComponent },
  setup() {
    // 👇 The args will now be passed down to the template
    return { args };
  },
  template: '<DLTMetricsComponent v-bind="args"/>',
});

export const FirstStory = Template.bind({});

FirstStory.args = {
  /* 👇 The args you need here will depend on your component */
};

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */
