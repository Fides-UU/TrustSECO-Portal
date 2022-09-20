import { createApp } from 'vue';
import { createVuestic } from 'vuestic-ui';
import copyText from '@meforma/vue-copy-to-clipboard';
import App from './App.vue';
import {
  DltInterface,
  SearchInterface,
  SpiderInterface,
  dltApi,
  searchApi,
  spiderApi,
} from './api';

import router from './router';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dltApi: DltInterface;
    $spiderApi: SpiderInterface;
    $searchApi: SearchInterface;
  }
}

const app = createApp(App)
  .use(createVuestic())
  .use(router)
  .use(dltApi)
  .use(spiderApi)
  .use(searchApi)
  .use(copyText);

app.mount('#app');

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */
