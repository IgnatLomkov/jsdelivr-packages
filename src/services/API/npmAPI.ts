import { env } from '@/data/env'

import { AbstractAPI } from './AbstractAPI'

class NPMAPI extends AbstractAPI {
  private readonly pageSize = 10
  protected readonly baseURL = env.NPM_API_URL

  async search(text: string, page: number): Promise<INPMAPISearchResult> {
    const response = await fetch(
      this.createURL('-/v1/search', {
        text,
        size: this.pageSize,
        from: this.pageSize * (page - 1)
      })
    )

    const { objects, total }: ISearchResponseJSON = await response.json()

    return {
      objects,
      maxPage: Math.ceil(total / this.pageSize)
    }
  }
}

export interface INPMAPISearchResult {
  objects: INPMAPISearchObject[]
  maxPage: number
}

interface ISearchResponseJSON {
  objects: INPMAPISearchObject[]
  //NOTE: just useless data from the API
  time: string
  total: number
}

export interface INPMAPISearchObject {
  package: {
    name: string
    version: string
    description: string
    date: string
    keywords: string[]
    publisher: INPMAPIUser
    maintainers: INPMAPIUser[]
    links: Partial<Record<EPackageLinkType, string>>
    //NOTE: just useless data from the API to show
    scope: string
  }
  //NOTE: just useless data from the API to show
  score: {
    detail: Record<EScoreDetail, number>
    final: number
  }
  searchScore: number
  //---
}

const enum EPackageLinkType {
  NPM = 'npm',
  HOMEPAGE = 'homepage',
  REPOSITORY = 'repository',
  BUGS = 'bugs'
}

const enum EScoreDetail {
  MAINTENANCE = 'maintenance',
  POPULARITY = 'popularity',
  QUALITY = 'quality'
}

export interface INPMAPIUser {
  username: string
  email: string
}

export const npmAPI = new NPMAPI()
