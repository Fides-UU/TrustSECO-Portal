import { ApiInterface, ServerType } from '@/api/other_apis/interface';

export default class ApiMock extends ApiInterface {
  getServerType(): ServerType {
    return ServerType.Private;
  }
}
