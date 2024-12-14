/* eslint-disable class-methods-use-this */
import { defaultPackage, DltApi, Package, TrustFact, } from '@/api/DltApi';

/** @deprecated */
export default class DltMock extends DltApi {
  // async getPackageNames(): Promise<string[]> {
  //   const packageNames = [];
  //   for (let id = 0; id < 49; id += 1) {
  //     packageNames[id] = `Package ${id}`;
  //   }
  //   packageNames[49] = 'Search me #49';
  //   for (let id = 50; id < 100; id += 1) {
  //     packageNames[id] = `Package ${id}`;
  //   }
  //   return packageNames;
  // }

  async getPackages(): Promise<Package[]> {
    const packages: Package[] = [];
    for (let id = 0; id < 100; id += 1) {
      packages[id] = {
        ...defaultPackage,
        id,
        name: `Package ${id}`,
        score: id,
        updatedAt: new Date(Date.now() - id * 24 * 60 * 60 * 1000),
      };
    }
    packages[49] = {
      ...packages[49],
      name: 'Search me #49',
    };
    return packages;
  }

  async getPackage(id: number): Promise<Package> {
    return {
      ...defaultPackage,
      id,
      name: `Package ${id}`,
      score: id,
    };
  }

  async getTrustFacts(id: number): Promise<TrustFact[]> {
    const trustFacts = [];
    for (let i = 0; i < (id + 5) % 10; i += 1) {
      trustFacts[i] = {
        type: 'github stars',
        value: i + 1,
      };
    }
    return trustFacts;
  }
}

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */