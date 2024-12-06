import { ApiInterface, ServerType } from '@/api/other_apis/interface';
import axios from 'axios';

export default class Api extends ApiInterface {
  async getServerType(): Promise<ServerType> {
    let { data } = await axios.get('http://localhost:3000/api/server_type');
    if (data === "PUBLIC") {
      return ServerType.Public;
    } else {
      return ServerType.Private;
    }
  }
}
