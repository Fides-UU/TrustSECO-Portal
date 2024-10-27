import { ApiInterface, ServerType } from '@/api/other_apis/interface';
import axios from 'axios';

export default class Api extends ApiInterface {
  #serverType: ServerType | null = null;

  async getServerType(): Promise<ServerType>{
    if (this.#serverType !== null) {
      return this.#serverType;
    } else {
      const { data } = await axios.get('http://localhost:3000/api/server_type');
      if (data === "PUBLIC") {
        return ServerType.Public;
      } else
      {
        return ServerType.Private;
      }
    }
  }
}
