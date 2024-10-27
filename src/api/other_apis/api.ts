import { ApiInterface, ServerType } from '@/api/other_apis/interface';
import axios from 'axios';

export default class Api extends ApiInterface {
  #serverType: ServerType = ServerType.Public;

  constructor() {
    super();

    axios.get('http://localhost:3000/api/server_type').then(({ data }) => {
      if (data === "PUBLIC") {
        return ServerType.Public;
      } else {
        return ServerType.Private;
      }
    });
  }

  getServerType(): ServerType {
    return this.#serverType;
  }
}
