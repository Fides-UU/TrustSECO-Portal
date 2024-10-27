/** Contains definition of the api interface, contains all api calls that are
 * not a part of the search, dlt or spider api
 */
import { App } from 'vue';
import { GlobalConfig } from 'vuestic-ui';

export enum ServerType {
  Public, // read only view
  Private
}

export abstract class ApiInterface {
  /** request the cosy server type, public or private */
  abstract getServerType(): Promise<ServerType>;

  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$api = this;
  }
}
