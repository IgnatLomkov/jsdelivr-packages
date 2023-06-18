import type { ActionContext, ActionTree } from 'vuex'

import { jsDelivrAPI } from '@/services/API/jsDelivrAPI'
import { npmAPI } from '@/services/API/npmAPI'
import type { IAugmentedBaseActionContext } from '@/store/IAugmentedBaseActionContext'
import type { IState } from '@/store/store'

import { findPackageObject } from './findPackageObject'
import type { IPackagesState } from './initPackagesState'
import type { IPackagesGetters } from './packagesGetters'
import { EPackagesMutation, type IPackagesMutations } from './packagesMutations'

export const enum EPackagesAction {
  CHANGE_TEXT = 'CHANGE_TEXT',
  CHANGE_PAGE = 'CHANGE_PAGE',
  SEARCH = 'SEARCH',
  FETCH_OBJECT_STATS = 'FETCH_OBJECT_STATS'
}

export const packagesActions: ActionTree<IPackagesState, IState> &
  IPackagesActions = {
  async [EPackagesAction.CHANGE_TEXT](
    { state: { text }, commit, dispatch },
    newText
  ) {
    if (newText === text) return

    if (newText === '') commit(EPackagesMutation.RESET)
    else {
      commit(EPackagesMutation.SET_TEXT, newText)
      commit(EPackagesMutation.SET_PAGE, 1)
      return dispatch(EPackagesAction.SEARCH)
    }
  },
  async [EPackagesAction.CHANGE_PAGE]({ commit, dispatch }, newPage) {
    commit(EPackagesMutation.SET_PAGE, newPage)
    return dispatch(EPackagesAction.SEARCH)
  },
  async [EPackagesAction.SEARCH]({ state: { text, page }, commit }) {
    commit(EPackagesMutation.RESET_SEARCH_RESULT)
    try {
      commit(
        EPackagesMutation.SET_SEARCH_RESULT,
        await npmAPI.search(text, page)
      )
    } catch {
      commit(EPackagesMutation.SET_SEARCH_ERROR)
    }
  },
  async [EPackagesAction.FETCH_OBJECT_STATS](
    { state: { objects }, commit },
    packageName
  ) {
    if (objects === undefined) return
    const object = findPackageObject(objects, packageName)
    if (object === undefined || object.stats !== undefined) return

    const abortController = new AbortController()
    commit(EPackagesMutation.FETCH_OBJECT_STATS_PENDING, {
      packageName,
      abortController
    })
    try {
      commit(EPackagesMutation.SET_OBJECT_STATS, {
        packageName,
        stats: await jsDelivrAPI.getPackageStats(
          packageName,
          abortController.signal
        )
      })
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        commit(EPackagesMutation.SET_OBJECT_STATS_FETCHING_ERROR, packageName)
      }
    } finally {
      commit(
        EPackagesMutation.RESET_OBJECT_STATS_LOADING_ABORT_CONTROLLER,
        packageName
      )
    }
  }
}

type IActionContext = IAugmentedBaseActionContext<
  ActionContext<IPackagesState, IState>,
  IPackagesGetters,
  keyof IPackagesGetters,
  IPackagesMutations,
  keyof IPackagesMutations,
  IPackagesActions,
  keyof IPackagesActions
>

export interface IPackagesActions {
  [EPackagesAction.CHANGE_TEXT](
    context: IActionContext,
    newText: string
  ): Promise<void>
  [EPackagesAction.CHANGE_PAGE](
    context: IActionContext,
    newPage: number
  ): Promise<void>
  [EPackagesAction.SEARCH](context: IActionContext): Promise<void>
  [EPackagesAction.FETCH_OBJECT_STATS](
    context: IActionContext,
    packageName: string
  ): Promise<void>
}
