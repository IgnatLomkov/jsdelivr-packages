<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useLocale } from 'vuetify'

import { useAppStore } from '@/hooks/useAppStore'
import { EPackagesAction } from '@/store/modules/packages/packagesActions'
import { EPackagesGetter } from '@/store/modules/packages/packagesGetters'

const { t } = useLocale()
const store = useAppStore()

let searchTimeout: number | undefined
//NOTE: it can be strange, but I can't just modify the ref input's value,
//so this is only right solution while https://github.com/vuejs/composition-api/issues/844 is open
const searchInput = ref<HTMLInputElement | undefined>()
const searchInputValue = ref(store.state.packages.text)
const searchInputModel = computed({
  get() {
    return searchInputValue.value
  },
  set(newText: string) {
    searchInputValue.value = newText

    if (searchTimeout !== undefined) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
      await store.dispatch(EPackagesAction.CHANGE_TEXT, newText)
      focusSearchInput()
    }, 500)
  }
})

onMounted(focusSearchInput)
watch(store.state.packages, controlSearchInputValue)

function focusSearchInput() {
  if (searchInput.value !== undefined) searchInput.value.focus()
}

function onSearchFocusChange(focused: boolean) {
  if (!focused && searchTimeout !== undefined) {
    clearTimeout(searchTimeout)
    searchTimeout = undefined
    controlSearchInputValue()
  }
}

function controlSearchInputValue() {
  searchInputValue.value = store.state.packages.text
}
</script>

<template>
  <v-app-bar app>
    <v-img
      src="images/header/logo.svg"
      :alt="t('$vuetify.Layout.Header.logoAlt')"
      max-width="48"
      class="ma-2 mr-4"
    />
    <v-text-field
      class="mr-2"
      hide-details
      prepend-icon="mdi-magnify"
      ref="searchInput"
      v-model="searchInputModel"
      :label="t('$vuetify.Layout.Header.search')"
      :disabled="store.getters[EPackagesGetter.LOADING]"
      :loading="store.getters[EPackagesGetter.LOADING]"
      @update:focused="onSearchFocusChange"
    />
  </v-app-bar>
</template>
