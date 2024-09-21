/** api calls that are needed for the UI but are not part of the ledger, spider
 * or dlt */
import axios, { AxiosResponse } from 'axios';
import { spiderApi } from '@/api/index'

let platform_cached: string[] | null = null;

/** Function that gets all possible libraries.io package manager platforms */
export async function getAllPlatforms(): Promise<string[]|null> {
  if (platform_cached === null) {
    try {
      // the libraries.io documentation states that a api token is required
      // but it seems like not having a token just makes it slower
      const token = (await spiderApi.getTokens()).libraries_token;
      let url = "https://libraries.io/api/platforms";
      if (token !== null) url += `?api_key=${token}`
      const { data } = await axios.get(url);
      const platforms = data.map((platform: any) => platform.name);
      platform_cached = platforms;
      return platforms;
    } catch (error) {
      console.log('error retrieving platforms from libraries.io')
      return null;
    }
  }
  return platform_cached;
}
