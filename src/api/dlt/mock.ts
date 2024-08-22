/* eslint-disable class-methods-use-this */
import { fakeDelay } from '@/lib.js';
import {
  defaultMetrics, defaultPackage,
  DltInterface, AddPackageForm, Package,
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
      "type": "gh_total_download_count",
      "value": "1105111"
    },
    {
      "type": "gh_repository_language",
      "value": "\"Python\""
    },
    {
      "type": "gh_open_issues_count",
      "value": "1948"
    },
    {
      "type": "gh_yearly_commit_count",
      "value": "3547"
    },
    {
      "type": "gh_release_download_count",
      "value": "788"
    },
    {
      "type": "gh_user_count",
      "value": "2407083"
    },
    {
      "type": "gh_release_issues_count",
      "value": "55"
    },
    {
      "type": "gh_zero_response_issues_count",
      "value": "273"
    },
    {
      "type": "lib_contributor_count",
      "value": "969"
    },
    {
      "type": "gh_contributor_count",
      "value": "1796"
    },
    {
      "type": "lib_dependent_count",
      "value": "67911"
    },
    {
      "type": "gh_issue_ratio",
      "value": "0.18195404446104987"
    },
    {
      "type": "lib_release_frequency",
      "value": "3456790.881987578"
    },
    {
      "type": "gh_owner_stargazer_count",
      "value": "28956"
    },
    {
      "type": "lib_dependency_count",
      "value": "0"
    },
    {
      "type": "lib_sourcerank",
      "value": "31"
    },
    {
      "type": "lib_latest_release_date",
      "value": "\"2024-07-21T13:29:55.000Z\""
    },
    {
      "type": "gh_average_resolution_time",
      "value": "26338.51"
    },
    {
      "type": "vs_virus_ratio",
      "value": "0"
    },
    {
      "type": "cve_count",
      "value": "8"
    },
    {
      "type": "cve_vulnerabilities",
      "value": "[{\"CVE_ID\":\"CVE-2017-12852\",\"CVE_score\":7.5,\"CVE_affected_version_start_type\":\"excluding\",\"CVE_affected_version_start\":\"1.12.0\",\"CVE_affected_version_end_type\":\"excluding\",\"CVE_affected_version_end\":\"1.13.1\"},{\"CVE_ID\":\"CVE-2014-1858\",\"CVE_score\":5.5,\"CVE_affected_version_start_type\":null,\"CVE_affected_version_start\":null,\"CVE_affected_version_end_type\":\"excluding\",\"CVE_affected_version_end\":\"1.8.1\"},{\"CVE_ID\":\"CVE-2014-1859\",\"CVE_score\":5.5,\"CVE_affected_version_start_type\":null,\"CVE_affected_version_start\":null,\"CVE_affected_version_end_type\":\"including\",\"CVE_affected_version_end\":\"1.8.0\"},{\"CVE_ID\":\"CVE-2019-6446\",\"CVE_score\":9.8,\"CVE_affected_version_start_type\":null,\"CVE_affected_version_start\":null,\"CVE_affected_version_end_type\":\"including\",\"CVE_affected_version_end\":\"1.16.0\"},{\"CVE_ID\":\"CVE-2021-33430\",\"CVE_score\":5.3,\"CVE_affected_version_start_type\":\"including\",\"CVE_affected_version_start\":\"1.9.0\",\"CVE_affected_version_end_type\":\"including\",\"CVE_affected_version_end\":\"1.9.3\"},{\"CVE_ID\":\"CVE-2021-34141\",\"CVE_score\":5.3,\"CVE_affected_version_start_type\":null,\"CVE_affected_version_start\":null,\"CVE_affected_version_end_type\":\"excluding\",\"CVE_affected_version_end\":\"1.22.0\"},{\"CVE_ID\":\"CVE-2021-41495\",\"CVE_score\":5.3,\"CVE_affected_version_start_type\":null,\"CVE_affected_version_start\":null,\"CVE_affected_version_end_type\":\"including\",\"CVE_affected_version_end\":\"1.19.0\"},{\"CVE_ID\":\"CVE-2021-41496\",\"CVE_score\":5.5,\"CVE_affected_version_start_type\":null,\"CVE_affected_version_start\":null,\"CVE_affected_version_end_type\":\"excluding\",\"CVE_affected_version_end\":\"1.19.0\"}]"
    },
    {
      "type": "lib_first_release_date",
      "value": "\"2006-12-02T02:07:43.000Z\""
    },
    {
      "type": "gh_gitstar_ranking",
      "value": "128"
    },
    {
      "type": "lib_release_count",
      "value": "161"
    },
    {
      "type": "so_popularity",
      "value": "0.45268071863"
    }
  ]
    return facts;
  }

  async getDownloadLink() {
    await fakeDelay();
    return window.location.origin;
  }

  // TODO: Add mock data
  async getJobs() {
    await fakeDelay();
    return [];
  }

  async addPackage(pack: AddPackageForm) {
    await fakeDelay();
    return 'Success';
  }

  async getMetrics() {
    await fakeDelay();
    return {
      ...defaultMetrics,
    };
  }

  async getTrustScore(name: string, version: string) {
    const maxScore = 100 * (name.length + version.length);
    return Math.floor(maxScore * Math.random());
  }
}

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */
