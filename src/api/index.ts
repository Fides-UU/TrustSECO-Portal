import DltMock from './dlt/mock';
import SpiderMock from './spider/mock';
import SearchMock from './search/mock';

import DltApi from './dlt/api';
import SpiderApi from './spider/api';
import SearchApi from './search/api';

export * from './dlt/interface';
export * from './spider/interface';
export * from './search/interface';

// Instantiate Api or Mock based on .env
let DltClass;
let SpiderClass;
let SearchClass;
if (import.meta.env.MODE === 'test' || import.meta.env.MODE === 'no-api') {
  DltClass = DltMock;
  SpiderClass = SpiderMock;
  SearchClass = SearchMock;
} else {
  DltClass = DltApi;
  SpiderClass = SpiderApi;
  SearchClass = SearchApi;
}

export const dltApi = new DltClass();
export const spiderApi = new SpiderClass();
export const searchApi = new SearchClass();

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */
