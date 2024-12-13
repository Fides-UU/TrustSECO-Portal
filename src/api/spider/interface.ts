import { App } from 'vue';
import { GlobalConfig } from 'vuestic-ui';

export interface TokensResult {
  github_token?: string|null,
  libraries_token?: string|null
}

export abstract class SpiderInterface {
  isActive = false;

  abstract getSpiderStatus(): Promise<boolean>;

  abstract toggleSpider(targetState?: boolean): Promise<boolean>;

  /** Gets the api tokens from the spider */
  abstract getTokens(): Promise<TokensResult>;

  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$spiderApi = this;
  }
}

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */
