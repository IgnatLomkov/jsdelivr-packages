import { createStore } from 'vuex'

import { env } from '@/data/env'

import type { IPackagesState } from './modules/packages/initPackagesState'
import {
  type IPackageModuleStore,
  packagesModule
} from './modules/packages/packagesModule'

export const store = createStore<IState>({
  state: {} as IState,
  modules: {
    packages: packagesModule
  },
  strict: env.IS_DEV
}) as IStore

export interface IState {
  packages: IPackagesState
}

export type IStore = IPackageModuleStore
