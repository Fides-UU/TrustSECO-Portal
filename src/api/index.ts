import DltMock from './dlt/mock';
import SpiderMock from './spider/mock';
import SearchMock from './search/mock';
import ApiMock from './other_apis/mock';

import DltApi from './dlt/api';
import SpiderApi from './spider/api';
import SearchApi from './search/api';
import Api from './other_apis/api';

export * from './dlt/interface';
export * from './spider/interface';
export * from './search/interface';
export * from './other_apis/interface';

// Instantiate Api or Mock based on .env
let DltClass;
let SpiderClass;
let SearchClass;
let ApiClass;
if (import.meta.env.MODE === 'test' || import.meta.env.MODE === 'no-api') {
  DltClass = DltMock;
  SpiderClass = SpiderMock;
  SearchClass = SearchMock;
  ApiClass = ApiMock;
} else {
  DltClass = DltApi;
  SpiderClass = SpiderApi;
  SearchClass = SearchApi;
  ApiClass = Api;
}

export const dltApi = new DltClass();
export const spiderApi = new SpiderClass();
export const searchApi = new SearchClass();
export const api = new ApiClass();

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */
