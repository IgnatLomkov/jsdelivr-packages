//NOTE: workaround for the current typescript version (I should open an issue just later)
declare module 'vuex' {
  export * from 'vuex/types/helpers.d.ts'
  export * from 'vuex/types/index.d.ts'
  export * from 'vuex/types/logger.d.ts'
  export * from 'vuex/types/vue.d.ts'
}
