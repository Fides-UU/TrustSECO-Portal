import { ApiInterface, ServerType } from '@/api/other_apis/interface';

export default class ApiMock extends ApiInterface {
  async getServerType(): Promise<ServerType>{
    return ServerType.Private;
  }
}
