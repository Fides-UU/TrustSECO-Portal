/* eslint-disable class-methods-use-this */
import { fakeDelay } from '@/lib.js';
import {
  defaultMetrics,
  defaultPackage,
  DltInterface,
  AddPackageForm,
  Package,
} from '@/api/dlt/interface';

export default class DltMock extends DltInterface {
  async getPackages() {
    await fakeDelay();
    const packages: Package[] = [];
    for (let i = 0; i < 100; i += 1) {
      packages[i] = {
        ...defaultPackage,
        name: `Package ${i}`,
      };
    }
    packages[49] = {
      ...packages[49],
      name: 'Search me #49',
    };
    return packages;
  }

  async getPackage(name: string) {
    await fakeDelay();
    return {
      ...defaultPackage,
      name,
    };
  }

  async getTrustFacts(name: string, version: string) {
    await fakeDelay();
    let facts = [
      {
        type: 'gh_total_download_count',
        value: '1105111',
      },
      {
        type: 'gh_repository_language',
        value: '"Python"',
      },
      {
        type: 'gh_open_issues_count',
        value: '1948',
      },
      {
        type: 'gh_yearly_commit_count',
        value: '3547',
      },
      {
        type: 'gh_release_download_count',
        value: '788',
      },
      {
        type: 'gh_user_count',
        value: '2407083',
      },
      {
        type: 'gh_release_issues_count',
        value: '55',
      },
      {
        type: 'gh_zero_response_issues_count',
        value: '273',
      },
      {
        type: 'lib_contributor_count',
        value: '969',
      },
      {
        type: 'gh_contributor_count',
        value: '1796',
      },
      {
        type: 'lib_dependent_count',
        value: '67911',
      },
      {
        type: 'gh_issue_ratio',
        value: '0.18195404446104987',
      },
      {
        type: 'lib_release_frequency',
        value: '3456790.881987578',
      },
      {
        type: 'gh_owner_stargazer_count',
        value: '28956',
      },
      {
        type: 'lib_dependency_count',
        value: '0',
      },
      {
        type: 'lib_sourcerank',
        value: '31',
      },
      {
        type: 'lib_latest_release_date',
        value: '"2024-07-21T13:29:55.000Z"',
      },
      {
        type: 'gh_average_resolution_time',
        value: '26338.51',
      },
      {
        type: 'vs_virus_ratio',
        value: '0',
      },
      {
        type: 'cve_count',
        value: '8',
      },
      {
        type: 'cve_vulnerabilities',
        value:
          '[{"CVE_ID":"CVE-2017-12852","CVE_score":7.5,"CVE_affected_version_start_type":"excluding","CVE_affected_version_start":"1.12.0","CVE_affected_version_end_type":"excluding","CVE_affected_version_end":"1.13.1"},{"CVE_ID":"CVE-2014-1858","CVE_score":5.5,"CVE_affected_version_start_type":null,"CVE_affected_version_start":null,"CVE_affected_version_end_type":"excluding","CVE_affected_version_end":"1.8.1"},{"CVE_ID":"CVE-2014-1859","CVE_score":5.5,"CVE_affected_version_start_type":null,"CVE_affected_version_start":null,"CVE_affected_version_end_type":"including","CVE_affected_version_end":"1.8.0"},{"CVE_ID":"CVE-2019-6446","CVE_score":9.8,"CVE_affected_version_start_type":null,"CVE_affected_version_start":null,"CVE_affected_version_end_type":"including","CVE_affected_version_end":"1.16.0"},{"CVE_ID":"CVE-2021-33430","CVE_score":5.3,"CVE_affected_version_start_type":"including","CVE_affected_version_start":"1.9.0","CVE_affected_version_end_type":"including","CVE_affected_version_end":"1.9.3"},{"CVE_ID":"CVE-2021-34141","CVE_score":5.3,"CVE_affected_version_start_type":"excluding","CVE_affected_version_start":"1.5.0","CVE_affected_version_end_type":"excluding","CVE_affected_version_end":"1.22.0"},{"CVE_ID":"CVE-2021-41495","CVE_score":5.3,"CVE_affected_version_start_type":null,"CVE_affected_version_start":null,"CVE_affected_version_end_type":"including","CVE_affected_version_end":"1.19.0"},{"CVE_ID":"CVE-2021-41496","CVE_score":5.5,"CVE_affected_version_start_type":"including","CVE_affected_version_start":"1.18.0","CVE_affected_version_end_type":"excluding","CVE_affected_version_end":"1.19.0"}]',
      },
      {
        type: 'lib_first_release_date',
        value: '"2006-12-02T02:07:43.000Z"',
      },
      {
        type: 'gh_gitstar_ranking',
        value: '128',
      },
      {
        type: 'lib_release_count',
        value: '161',
      },
      {
        type: 'so_popularity',
        value: '0.45268071863',
      },
    ];
    return facts;
  }

  async getDownloadLink() {
    await fakeDelay();
    return window.location.origin;
  }

  async getJobs() {
    await fakeDelay();
    return [
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_contributor_count',
        date: '5525',
        id: 276,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_user_count',
        date: '5526',
        id: 277,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_total_download_count',
        date: '5527',
        id: 278,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_release_download_count',
        date: '5528',
        id: 279,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_yearly_commit_count',
        date: '5529',
        id: 280,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_repository_language',
        date: '5530',
        id: 281,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_gitstar_ranking',
        date: '5531',
        id: 282,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_open_issues_count',
        date: '5532',
        id: 283,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_zero_response_issues_count',
        date: '5533',
        id: 284,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_release_issues_count',
        date: '5534',
        id: 285,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_issue_ratio',
        date: '5535',
        id: 286,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_average_resolution_time',
        date: '5536',
        id: 287,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'gh_owner_stargazer_count',
        date: '5537',
        id: 288,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'lib_release_frequency',
        date: '5538',
        id: 289,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'lib_contributor_count',
        date: '5539',
        id: 290,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'lib_dependency_count',
        date: '5540',
        id: 291,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'lib_dependent_count',
        date: '5541',
        id: 292,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'lib_latest_release_date',
        date: '5542',
        id: 293,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'lib_first_release_date',
        date: '5543',
        id: 294,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'lib_release_count',
        date: '5544',
        id: 295,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'lib_sourcerank',
        date: '5545',
        id: 296,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'cve_count',
        date: '5546',
        id: 297,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'cve_vulnerabilities',
        date: '5547',
        id: 298,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'so_popularity',
        date: '5548',
        id: 299,
        bounty: 1000,
      },
      {
        package: 'serde',
        version: 'v1.0.209',
        fact: 'vs_virus_ratio',
        date: '5549',
        id: 300,
        bounty: 1000,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_contributor_count',
        date: '5551',
        id: 301,
        bounty: 1000,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_user_count',
        date: '5552',
        id: 302,
        bounty: 2000,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_total_download_count',
        date: '5553',
        id: 303,
        bounty: 1549,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_release_download_count',
        date: '5554',
        id: 304,
        bounty: 1388,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_yearly_commit_count',
        date: '5555',
        id: 305,
        bounty: 1306,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_repository_language',
        date: '5556',
        id: 306,
        bounty: 1255,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_gitstar_ranking',
        date: '5557',
        id: 307,
        bounty: 1221,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_open_issues_count',
        date: '5558',
        id: 308,
        bounty: 1197,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_zero_response_issues_count',
        date: '5559',
        id: 309,
        bounty: 1178,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_release_issues_count',
        date: '5560',
        id: 310,
        bounty: 1164,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_issue_ratio',
        date: '5561',
        id: 311,
        bounty: 1152,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_average_resolution_time',
        date: '5562',
        id: 312,
        bounty: 1142,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'gh_owner_stargazer_count',
        date: '5563',
        id: 313,
        bounty: 1134,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'lib_release_frequency',
        date: '5564',
        id: 314,
        bounty: 1127,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'lib_contributor_count',
        date: '5565',
        id: 315,
        bounty: 1121,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'lib_dependency_count',
        date: '5566',
        id: 316,
        bounty: 1116,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'lib_dependent_count',
        date: '5567',
        id: 317,
        bounty: 1112,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'lib_latest_release_date',
        date: '5568',
        id: 318,
        bounty: 1108,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'lib_first_release_date',
        date: '5569',
        id: 319,
        bounty: 1104,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'lib_release_count',
        date: '5570',
        id: 320,
        bounty: 1101,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'lib_sourcerank',
        date: '5571',
        id: 321,
        bounty: 1098,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'cve_count',
        date: '5572',
        id: 322,
        bounty: 1096,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'cve_vulnerabilities',
        date: '5573',
        id: 323,
        bounty: 1093,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'so_popularity',
        date: '5574',
        id: 324,
        bounty: 1091,
      },
      {
        package: 'flask',
        version: '2.3.3',
        fact: 'vs_virus_ratio',
        date: '5575',
        id: 325,
        bounty: 1089,
      },
    ];
  }

  async addPackage(pack: AddPackageForm) {
    await fakeDelay();
    return 'Added jobs.';
  }

  async getMostRecentVersion(pack: Package): Promise<string> {
      return "v7.8.9";
  }

  async getMetrics() {
    await fakeDelay();
    return {
      packages: 55,
      blockheight: 1000,
      nodes: 3,
    };
  }

  async getTrustScore(name: string, version: string) {
    const maxScore = 100 * (name.length + version.length);
    return Math.floor(maxScore * Math.random());
  }
}

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */
