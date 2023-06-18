<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useLocale } from 'vuetify'
import { useStore } from 'vuex'

import { EURL } from '@/data/EURL'
import type { IPackageObject } from '@/store/modules/packages/initPackagesState'
import { EPackagesAction } from '@/store/modules/packages/packagesActions'
import { createURL } from '@/utils/URLUtils'

const props = defineProps<IPackageObject>()

const { t } = useLocale()
const store = useStore()

onMounted(() => {
  store.dispatch(EPackagesAction.FETCH_OBJECT_STATS, props.package.name)
})

onUnmounted(() => {
  if (props.statsLoadingAbortController !== undefined) {
    props.statsLoadingAbortController.abort()
  }
})
</script>

<template>
  <v-card>
    <v-card-title>
      <a
        :href="createURL(EURL.NPM_PACKAGE, package.name).toString()"
        target="_blank"
        >{{ package.name }}</a
      >
    </v-card-title>
    <v-card-subtitle>
      {{ package.description }}
    </v-card-subtitle>
    <div class="mx-2">
      <v-chip v-for="keyword in package.keywords" :key="keyword" class="ma-2">
        {{ keyword }}
      </v-chip>
    </div>
    <v-card-text>
      <div class="text-error" v-if="statsLoadingError">
        {{
          t('$vuetify.PackagesTable.PackagesTableRow.PackageDialog.stats.error')
        }}
      </div>
      <!-- NOTE: there isn't scss variable for such things, so just 24 (I should open an issue later) -->
      <v-progress-linear
        indeterminate
        rounded
        :height="24 * 2"
        v-else-if="stats === undefined"
      />
      <template v-else>
        <p>
          {{
            t(
              '$vuetify.PackagesTable.PackagesTableRow.PackageDialog.stats.hits',
              stats.hits.total,
              stats.hits.prev.total
            )
          }}
        </p>
        <p>
          {{
            t(
              '$vuetify.PackagesTable.PackagesTableRow.PackageDialog.stats.bandwidth',
              stats.bandwidth.total,
              stats.bandwidth.prev.total
            )
          }}
        </p>
      </template>
      <!-- NOTE: because of vuetify's i18n (I should open a feature request later) -->
      <p>
        <a
          :href="
            createURL(EURL.NPM, `~${package.publisher.username}`).toString()
          "
          target="_blank"
          >{{ package.publisher.username }}</a
        >
        {{
          t(
            '$vuetify.PackagesTable.PackagesTableRow.PackageDialog.fullInfo.email.prefix'
          )
        }}<a :href="`mailto:${package.publisher.email}`">{{
          package.publisher.email
        }}</a
        >{{
          t(
            '$vuetify.PackagesTable.PackagesTableRow.PackageDialog.fullInfo.email.postfix'
          )
        }}{{
          t(
            '$vuetify.PackagesTable.PackagesTableRow.PackageDialog.fullInfo.postfix',
            package.version,
            new Date(package.date).toLocaleDateString()
          )
        }}
      </p>
    </v-card-text>
    <div class="d-flex">
      <v-list>
        <v-list-subheader>{{
          t('$vuetify.PackagesTable.PackagesTableRow.PackageDialog.maintainers')
        }}</v-list-subheader>
        <v-list-item
          v-for="maintainer in package.maintainers"
          :key="maintainer.username"
          :title="maintainer.username"
          :subtitle="maintainer.email"
        >
          <template v-slot:title="{ title }"
            ><a
              :href="createURL(EURL.NPM, `~${title}`).toString()"
              target="_blank"
              >{{ title }}</a
            ></template
          >
          <template v-slot:subtitle="{ subtitle }"
            ><a :href="`mailto:${subtitle}`">{{ subtitle }}</a></template
          >
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-subheader>{{
          t('$vuetify.PackagesTable.PackagesTableRow.PackageDialog.links.title')
        }}</v-list-subheader>
        <v-list-item
          v-for="(link, linkType) in package.links"
          :key="linkType"
          :title="
            t(
              `$vuetify.PackagesTable.PackagesTableRow.PackageDialog.links.typeToTextMap.${linkType}`
            )
          "
          :subtitle="link"
        >
          <template v-slot:subtitle="{ subtitle }">
            <a :href="subtitle as string" target="_blank">{{ subtitle }}</a>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>
