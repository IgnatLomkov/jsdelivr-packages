import type { IJSDelivrAPIPackageStats } from '@/services/API/jsDelivrAPI'
import type { INPMAPISearchObject } from '@/services/API/npmAPI'

export function initPackagesState(): IPackagesState {
  return {
    isSearchResult: false,
    text: '',
    page: 1,
    objects: [],
    maxPage: 1,
    isLoadingError: false
  }
}

export interface IPackagesState {
  isSearchResult: boolean
  text: string
  page: number
  objects?: IPackageObject[]
  maxPage?: number
  isLoadingError: boolean
}

export interface IPackageObject extends INPMAPISearchObject {
  stats?: IJSDelivrAPIPackageStats
  statsLoadingAbortController?: AbortController
  statsLoadingError?: boolean
}
