import type { GetterTree } from 'vuex'

import type { IState } from '@/store/store'

import type { IPackagesState } from './initPackagesState'

export const enum EPackagesGetter {
  LOADING = 'LOADING',
  LOADED = 'LOADED'
}

export const packagesGetters: GetterTree<IPackagesState, IState> &
  IPackagesGetters = {
  [EPackagesGetter.LOADING]({ objects, maxPage, isLoadingError }) {
    return (objects === undefined || maxPage === undefined) && !isLoadingError
  },
  [EPackagesGetter.LOADED]({ objects, maxPage }) {
    return objects !== undefined && objects.length > 0 && maxPage !== undefined
  }
}

export interface IPackagesGetters {
  [EPackagesGetter.LOADING](state: IPackagesState, rootState: IState): boolean
  [EPackagesGetter.LOADED](state: IPackagesState, rootState: IState): boolean
}
