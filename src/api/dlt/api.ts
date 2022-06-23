/* eslint-disable class-methods-use-this */
import {
  defaultJob, defaultMetrics, defaultPackage,
  DltInterface, Job, AddPackageForm, Metrics, Package, TrustFact,
} from '@/api/dlt/interface';
import axios from 'axios';
import semver from 'semver';

interface ApiPackage {
  packagePlatform: string,
  packageOwner: string,
  packageName: string,
  packageReleases: string[],
}

interface ApiTrustFact {
  jobID: number,
  version: string,
  fact: string,
  factData: string,
  account: { uid: string },
}

interface ApiJob {
  jobID: number,
  package: string,
  version: string,
  fact: string,
  bounty: number,
  date: Date,
  account: { uid: string },
}

interface ApiMetrics {
  block_height: number,
  package_count: number,
  peer_info: {
    banned: number,
    connected: number,
    disconnected: number,
  },
}

// Perform a best-effort sort on the given list of versions by attempting to treat them as SemVers
const sortVersions = (versions: string[]): string[] => {
  const copy = Array.from(versions);
  copy.sort((a, b) => {
    const a2 = semver.coerce(a) ?? a;
    const b2 = semver.coerce(b) ?? b;
    return -semver.compareLoose(a2, b2);
  });
  return copy;
};

// Convert package data as received from the Dlt Api into the local Package interface
const parsePackage = (data: ApiPackage): Package => ({
  ...defaultPackage,
  platform: data.packagePlatform,
  owner: data.packageOwner,
  name: data.packageName,
  versions: sortVersions(data.packageReleases),
});

// Convert package data as received from the Dlt Api into the local Package interface
const parseTrustFact = (data: ApiTrustFact): TrustFact => ({
  ...defaultPackage,
  type: data.fact,
  value: data.factData,
});

// Convert job data as received from the Dlt Api into the local Job interface
const parseJob = (data: ApiJob): Job => ({
  ...defaultJob,
  id: data.jobID,
  package: data.package,
  version: data.version,
  fact: data.fact,
  bounty: data.bounty,
});

// Convert metrics data as received from the Dlt Api into the local Metrics interface
const parseMetrics = (data: ApiMetrics): Metrics => ({
  ...defaultMetrics,
  packages: data.package_count,
  blockheight: data.block_height,
  nodes: data.peer_info.connected,
});

export default class DltApi extends DltInterface {
  #baseUrl = 'http://localhost:3000/api/dlt/';

  async getPackages() {
    const { data } = await axios.get(this.#getLink('packages'));
    return data.packages.map((item: ApiPackage) => parsePackage(item));
  }

  async getPackage(name: string) {
    const { data } = await axios.get(this.#getLink(`package/${name}`));
    return parsePackage(data);
  }

  // TODO: Trust Facts should be per name AND version, but the API doesn't support this
  async getTrustFacts(name: string, version: string) {
    const { data } = await axios.get(this.#getLink(`trust-facts/${name}`));
    if (!data.facts) {
      return [];
    }

    const versionFilter = (item: ApiTrustFact) => item.version === version;
    return data.facts.filter(versionFilter)
      .map((item: ApiTrustFact) => parseTrustFact(item));
  }

  // TODO: This doesn't really belong to the DLT Api, but...
  async getDownloadLink() {
    const { data } = await axios.get('http://localhost:3000/api/download');
    return data;
  }

  async getJobs() {
    const { data } = await axios.get(this.#getLink('jobs'));
    return data.map((item: ApiJob) => parseJob(item));
  }

  async addPackage(pack: AddPackageForm) {
    const { data } = await axios.post(this.#getLink('add-job'), pack);
    console.log(data);
    return data;
  }

  async getMetrics() {
    const { data } = await axios.get(this.#getLink('metrics'));
    return parseMetrics(data);
  }

  async getTrustScore(name: string, version: string) {
    const { data } = await axios.get(this.#getLink(`package/${name}/trust-score/${version}`));
    return (typeof data === 'number' ? data : undefined);
  }

  #getLink(to: string) {
    return `${this.#baseUrl}${to}`;
  }
}
