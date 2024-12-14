/* eslint-disable class-methods-use-this,@typescript-eslint/no-unused-vars */
import { fakeDelay } from '@/lib.js';
import {
  AddMinerForm,
  Miner,
  MinerMetrics,
  MinerStateAction,
  SearchInterface,
  defaultMiner,
} from '@/api/search/interface';

export default class SearchMock extends SearchInterface {
  async getMiners(): Promise<Miner[]> {
    await fakeDelay();
    const miners: Miner[] = [];
    const names = [
      'sweet_lalande',
      'inspiring_wales',
      'hungry_pascal',
      'kind_archimedes',
      'keen_hopper',
    ];
    for (let i = 0; i < 5; i += 1) {
      miners[i] = {
        ...defaultMiner,
        name: names[i],
        id: `${i + 1}${defaultMiner.id}`,
        config: {
          ...defaultMiner.config,
          worker_name: `Miner ${i + 1}`,
        },
        state: {
          ...defaultMiner.state,
          Running: Math.random() > 0.5,
        },
      };
    }
    return miners;
  }

  async getMiner(id: string): Promise<Miner> {
    await fakeDelay();
    const miners = await this.getMiners();
    const miner = miners.find((x) => x.id === id);
    return miner || defaultMiner;
  }

  async getMinerLogs(id: string): Promise<string[]> {
    await fakeDelay();
    const logs = ['AAAAAAA', 'BBBBBBB'];
    return logs;
  }

  async getMinerMetrics(id: string): Promise<MinerMetrics> {
    await fakeDelay();
    return {
      last_activity: 'Parsed something.',
      methods_added_4hrs: 33,
      methods_added_total: 33333,
    };
  }

  async changeMinerState(
    id: string,
    action: MinerStateAction,
  ): Promise<boolean | null> {
    await fakeDelay();
    return null;
  }

  async addMiner(miner: AddMinerForm) {
    await fakeDelay();

    return {
      success: true,
      message: 'Added miner.',
    };
  }

  async rerunMiner(id: string) {
    await fakeDelay();
    return null;
  }
}
