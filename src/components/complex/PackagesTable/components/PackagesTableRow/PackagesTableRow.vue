<script setup lang="ts">
import { useLocale } from 'vuetify'

import { EURL } from '@/data/EURL'
import type { IPackageObject } from '@/store/modules/packages/initPackagesState'
import { pathnameJoin } from '@/utils/URLUtils'

import PackagesDialog from './components/PackageDialog.vue'

defineProps<IPackageObject>()

const { t } = useLocale()
</script>

<template>
  <v-dialog :width="700">
    <template v-slot:activator="{ props }">
      <tr v-bind="props">
        <td>
          <a
            :href="pathnameJoin(EURL.NPM_PACKAGE, package.name)"
            target="_blank"
            @click="e => e.stopPropagation()"
          >
            {{
              t(
                '$vuetify.PackagesTable.PackagesTableRow.nameWithVersion',
                package.name,
                package.version
              )
            }}
          </a>
        </td>
        <td>{{ package.description }}</td>
        <td>{{ new Date(package.date).toLocaleDateString() }}</td>
      </tr>
    </template>
    <PackagesDialog v-bind="$props" />
  </v-dialog>
</template>

<style scoped lang="scss">
tr {
  cursor: pointer;
}
</style>
