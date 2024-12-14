import { App } from 'vue';
import { GlobalConfig } from 'vuestic-ui';

export interface Miner {
  id: string; // docker container id
  name: string; // docker container name
  config: {
    github_token?: string;
    worker_name?: string;
    cpus?: number;
  };
  // State from docker inspect container
  state: {
    Status: string;
    Running: boolean;
    Paused: boolean;
    Restarting: boolean;
    OOMKilled: boolean;
    Dead: boolean;
    Pid: number;
    ExitCode: number;
    Error: string;
    StartedAt: string;
    FinishedAt: string;
  };
}

export type MinerStateAction = 'remove' | 'restart' | 'start' | 'stop';

export interface MinerMetrics {
  last_activity: string;
  methods_added_4hrs: number;
  methods_added_total: number;
}

export interface AddMinerForm {
  github_token: string;
  worker_name: string;
  // verbose: string;
  // cpu: string;
}

export type MinerAPIResponse = { success: boolean; message: string };

export abstract class SearchInterface {
  abstract getMiners(): Promise<Miner[]>;

  abstract getMiner(id: string): Promise<Miner>;

  abstract getMinerLogs(id: string): Promise<string[]>;

  abstract getMinerMetrics(id: string): Promise<MinerMetrics>;

  abstract addMiner(miner: AddMinerForm): Promise<MinerAPIResponse>;

  abstract rerunMiner(id: string): Promise<boolean | null>;

  abstract changeMinerState(
    id: string,
    action: MinerStateAction,
  ): Promise<boolean | null>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  install(app: App, config: GlobalConfig) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$searchApi = this;
  }
}

export const defaultMiner: Miner = {
  id: 'XXXXXXXXXXX',
  name: 'xxxxx_xxxxx',
  config: {
    github_token: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    worker_name: 'xxxxx',
  },
  state: {
    Status: 'paused',
    Running: true,
    Paused: true,
    Restarting: false,
    OOMKilled: false,
    Dead: false,
    Pid: 1111111,
    ExitCode: 0,
    Error: '',
    StartedAt: '2022-09-08T05:35:46.286358724Z',
    FinishedAt: '0001-01-01T00:00:00Z',
  },
};

export const defaultMinerMetrics: MinerMetrics = {
  last_activity: '',
  methods_added_4hrs: 0,
  methods_added_total: 0,
};
