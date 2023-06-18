import type { MutationTree } from 'vuex'

import type { IJSDelivrAPIPackageStats } from '@/services/API/jsDelivrAPI'
import type { INPMAPISearchResult } from '@/services/API/npmAPI'

import { findPackageObject } from './findPackageObject'
import { initPackagesState, type IPackagesState } from './initPackagesState'

export const enum EPackagesMutation {
  RESET = 'RESET',
  RESET_SEARCH_RESULT = 'RESET_SEARCH_RESULT',
  SET_TEXT = 'SET_TEXT',
  SET_PAGE = 'SET_PAGE',
  SET_SEARCH_RESULT = 'SET_SEARCH_RESULT',
  SET_SEARCH_ERROR = 'SET_SEARCH_ERROR',
  FETCH_OBJECT_STATS_PENDING = 'FETCH_OBJECT_STATS_PENDING',
  SET_OBJECT_STATS = 'SET_OBJECT_STATS',
  SET_OBJECT_STATS_FETCHING_ERROR = 'SET_OBJECT_STATS_FETCHING_ERROR',
  RESET_OBJECT_STATS_LOADING_ABORT_CONTROLLER = 'RESET_OBJECT_STATS_LOADING_ABORT_CONTROLLER'
}

export const packagesMutations: MutationTree<IPackagesState> &
  IPackagesMutations = {
  [EPackagesMutation.RESET](state) {
    Object.entries(initPackagesState()).forEach(([key, value]) => {
      state[key as keyof ReturnType<typeof initPackagesState>] = value as never
    })
  },
  [EPackagesMutation.RESET_SEARCH_RESULT](state) {
    state.isLoadingError = false
    state.isSearchResult = false
    state.objects = undefined
    state.maxPage = undefined
  },
  [EPackagesMutation.SET_TEXT](state, newText) {
    state.text = newText
  },
  [EPackagesMutation.SET_PAGE](state, newPage) {
    state.page = newPage
  },
  [EPackagesMutation.SET_SEARCH_RESULT](state, searchResult) {
    state.isSearchResult = true
    state.objects = searchResult.objects
    state.maxPage = searchResult.maxPage
  },
  [EPackagesMutation.SET_SEARCH_ERROR](state) {
    state.isLoadingError = true
  },
  [EPackagesMutation.FETCH_OBJECT_STATS_PENDING](
    { objects },
    { packageName, abortController }
  ) {
    if (objects !== undefined) {
      const object = findPackageObject(objects, packageName)
      if (object !== undefined) {
        object.stats = undefined
        object.statsLoadingAbortController = abortController
        object.statsLoadingError = false
      }
    }
  },
  [EPackagesMutation.SET_OBJECT_STATS]({ objects }, { packageName, stats }) {
    if (objects !== undefined) {
      const object = findPackageObject(objects, packageName)
      if (object !== undefined) {
        object.stats = stats
      }
    }
  },
  [EPackagesMutation.SET_OBJECT_STATS_FETCHING_ERROR](
    { objects },
    packageName
  ) {
    if (objects !== undefined) {
      const object = findPackageObject(objects, packageName)
      if (object !== undefined) {
        object.statsLoadingError = true
      }
    }
  },
  [EPackagesMutation.RESET_OBJECT_STATS_LOADING_ABORT_CONTROLLER](
    { objects },
    packageName
  ) {
    if (objects !== undefined) {
      const object = findPackageObject(objects, packageName)
      if (object !== undefined) {
        object.statsLoadingAbortController = undefined
      }
    }
  }
}

export interface IPackagesMutations {
  [EPackagesMutation.RESET](state: IPackagesState): void
  [EPackagesMutation.RESET_SEARCH_RESULT](state: IPackagesState): void
  [EPackagesMutation.SET_TEXT](state: IPackagesState, newText: string): void
  [EPackagesMutation.SET_PAGE](state: IPackagesState, newPage: number): void
  [EPackagesMutation.SET_SEARCH_RESULT](
    state: IPackagesState,
    searchResult: INPMAPISearchResult
  ): void
  [EPackagesMutation.SET_SEARCH_ERROR](state: IPackagesState): void
  [EPackagesMutation.FETCH_OBJECT_STATS_PENDING](
    state: IPackagesState,
    payload: {
      packageName: string
      abortController: AbortController
    }
  ): void
  [EPackagesMutation.SET_OBJECT_STATS](
    state: IPackagesState,
    payload: {
      packageName: string
      stats: IJSDelivrAPIPackageStats
    }
  ): void
  [EPackagesMutation.SET_OBJECT_STATS_FETCHING_ERROR](
    state: IPackagesState,
    packageName: string
  ): void
  [EPackagesMutation.RESET_OBJECT_STATS_LOADING_ABORT_CONTROLLER](
    state: IPackagesState,
    packageName: string
  ): void
}
