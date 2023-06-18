import type { Module, Store } from 'vuex'

import type { IAugmentedBaseActionContext } from '@/store/IAugmentedBaseActionContext'
import type { IState } from '@/store/store'

import { initPackagesState, type IPackagesState } from './initPackagesState'
import { type IPackagesActions, packagesActions } from './packagesActions'
import { type IPackagesGetters, packagesGetters } from './packagesGetters'
import { type IPackagesMutations, packagesMutations } from './packagesMutations'

export const packagesModule: Module<IPackagesState, IState> = {
  state: initPackagesState(),
  getters: packagesGetters,
  mutations: packagesMutations,
  actions: packagesActions
}

export type IPackageModuleStore = IAugmentedBaseActionContext<
  Store<IState>,
  IPackagesGetters,
  keyof IPackagesGetters,
  IPackagesMutations,
  keyof IPackagesMutations,
  IPackagesActions,
  keyof IPackagesActions
>
