import { ApiInterface, ServerType } from '@/api/other_apis/interface';
import { fakeDelay } from '@/lib.js';

export default class ApiMock extends ApiInterface {
  async getServerType(): Promise<ServerType> {
    await fakeDelay();
    return ServerType.Private;
  }
}
