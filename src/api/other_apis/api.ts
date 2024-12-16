import { ApiInterface, ServerType } from '@/api/other_apis/interface';
import axios from 'axios';

export default class Api extends ApiInterface {
  async getServerType(): Promise<ServerType> {
    let { data } = await axios.get(`http://${import.meta.env.VITE_HOST}/api/server_type`);
    if (data === "PUBLIC") {
      return ServerType.Public;
    } else {
      return ServerType.Private;
    }
  }
}
