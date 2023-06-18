import { env } from '@/data/env'
import { pathnameJoin } from '@/utils/URLUtils'

import { AbstractAPI } from './AbstractAPI'

class JSDelivrAPI extends AbstractAPI {
  private readonly versionURLPrefix = 'v1'
  private readonly period = 'day'
  protected readonly baseURL = env.JS_DELIVR_API_URL

  protected createURL(
    path: string,
    searchParams: Record<string, string | number>
  ) {
    return super.createURL(
      pathnameJoin(this.versionURLPrefix, path),
      searchParams
    )
  }

  async getPackageStats(
    packageName: string,
    abortSignal: AbortSignal
  ): Promise<IJSDelivrAPIPackageStats> {
    const response = await fetch(
      this.createURL(`stats/packages/npm/${packageName}`, {
        period: this.period
      }),
      {
        signal: abortSignal
      }
    )

    return response.json()
  }
}

export interface IJSDelivrAPIPackageStats {
  hits: IStat
  bandwidth: IStat
  //NOTE: just useless data from the API
  links: {
    self: string
    versions: string
  }
}

interface IStat extends IBaseStat {
  //NOTE: just useless data while period === 'day'
  dates: Record<string, number>
  prev: IBaseStat
}

interface IBaseStat {
  //NOTE: just useless data from the API to show
  rank: number | null
  typeRank: number | null
  //---
  total: number
}

export const jsDelivrAPI = new JSDelivrAPI()
