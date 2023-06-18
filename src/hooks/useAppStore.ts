import { useStore } from 'vuex'

import type { IStore } from '@/store/store'

export function useAppStore() {
  return useStore() as IStore
}
