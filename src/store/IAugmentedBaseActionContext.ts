import type { CommitOptions, DispatchOptions } from 'vuex'

export type IAugmentedBaseActionContext<
  O,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  G extends Record<GK, (...args: any) => any>,
  GK extends string,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  M extends Record<MK, (...args: any) => any>,
  MK extends string,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  A extends Record<AK, (...args: any) => any>,
  AK extends string
> = Omit<O, 'getters' | 'commit' | 'dispatch'> & {
  getters: {
    [K in keyof G]: ReturnType<G[K]>
  }

  commit<K extends keyof M>(
    key: K,
    payload?: Parameters<M[K]>[1],
    options?: CommitOptions
  ): ReturnType<M[K]>

  dispatch<K extends keyof A>(
    key: K,
    payload?: Parameters<A[K]>[1],
    options?: DispatchOptions
  ): ReturnType<A[K]>
}
