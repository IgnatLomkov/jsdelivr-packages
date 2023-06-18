<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from 'vuetify'

import { useAppStore } from '@/hooks/useAppStore'
import { EPackagesAction } from '@/store/modules/packages/packagesActions'
import { EPackagesGetter } from '@/store/modules/packages/packagesGetters'

import PackagesTableRow from './components/PackagesTableRow/PackagesTableRow.vue'

const { t } = useLocale()
const store = useAppStore()
const currentPage = computed({
  get() {
    return store.state.packages.page
  },
  set(newPage) {
    store.dispatch(EPackagesAction.CHANGE_PAGE, newPage)
  }
})
</script>

<template>
  <div
    :class="
      'h-100 d-flex py-2' +
      (store.getters[EPackagesGetter.LOADED]
        ? ' flex-column'
        : ' justify-center align-center px-4' +
          (store.getters[EPackagesGetter.LOADING]
            ? ''
            : ' text-center text-h4 font-weight-black' +
              (store.state.packages.isLoadingError ? ' text-error' : '')))
    "
  >
    <v-progress-circular
      size="x-large"
      indeterminate
      v-if="store.getters[EPackagesGetter.LOADING]"
    />
    <template v-else-if="store.getters[EPackagesGetter.LOADED]">
      <v-table class="flex-1-1 mb-4">
        <thead>
          <tr>
            <th>
              {{ t('$vuetify.PackagesTable.header.nameWithVersion') }}
            </th>
            <th class="text-center">
              {{ t('$vuetify.PackagesTable.header.description') }}
            </th>
            <th class="text-right">
              {{ t('$vuetify.PackagesTable.header.publishDate') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <PackagesTableRow
            v-for="object in store.state.packages.objects"
            :key="object.package.name"
            v-bind="object"
          />
        </tbody>
      </v-table>
      <v-pagination
        v-model="currentPage"
        :length="store.state.packages.maxPage as number"
      />
    </template>
    <template v-else>
      {{
        t(
          `$vuetify.PackagesTable.text.${
            store.state.packages.isLoadingError
              ? 'error'
              : store.state.packages.isSearchResult
              ? 'notFound'
              : 'instuction'
          }`
        )
      }}
    </template>
  </div>
</template>
