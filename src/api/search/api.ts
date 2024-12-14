/* eslint-disable class-methods-use-this */
import {
  AddMinerForm,
  Miner,
  MinerMetrics,
  MinerStateAction,
  SearchInterface,
} from '@/api/search/interface';
import axios, { AxiosResponse } from 'axios';

export default class SearchApi extends SearchInterface {
  #baseUrl = 'http://localhost:3000/api/search/';

  async getMiners(): Promise<Miner[]> {
    const { data } = await axios.get(this.#getLink('miners'));
    return data;
  }

  async getMiner(id: string): Promise<Miner> {
    const { data } = await axios.get(this.#getLink(`miner/${id}`));
    return data;
  }

  async getMinerLogs(id: string): Promise<string[]> {
    const { data } = await axios.get(this.#getLink(`miner/${id}/logs`));
    return data;
  }

  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getMinerMetrics(id: string): Promise<MinerMetrics> {
    return {
      last_activity: 'Not Implemented.',
      methods_added_4hrs: -1,
      methods_added_total: -1,
    };
  }

  async addMiner(miner: AddMinerForm) {
    const { data } = await axios.post(this.#getLink('add-miner'), miner);
    return data;
  }

  async rerunMiner(id: string) {
    const { data } = await axios.get(this.#getLink(`miner/${id}/rerun`));
    return data;
  }

  async changeMinerState(
    id: string,
    action: MinerStateAction,
  ): Promise<boolean | null> {
    try {
      const { data } = await axios.get(this.#getLink(`miner/${id}/${action}`));
      return data.success ? data.success : data.message;
    } catch (e) {
      // If the case where the request returned properly but contains an error message, show that message
      if (axios.isAxiosError(e) && e.response) {
        const { data }: AxiosResponse = e.response;
        if (data.success === false) {
          throw new Error(data.message);
        }
      } else {
        throw e;
      }
    }
    return null;
  }

  #getLink(to: string) {
    return `${this.#baseUrl}${to}`;
  }
}
