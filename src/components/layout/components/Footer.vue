<script setup lang="ts">
import { useLocale } from 'vuetify'

import { EURL } from '@/data/EURL'

const { t } = useLocale()
</script>

<template>
  <v-footer class="bg-indigo-lighten-1 d-flex justify-center" app>
    <a :href="EURL.GITHUB" target="_blank" class="font-weight-black mr-4">
      {{ t('$vuetify.Layout.Footer.name') }}
    </a>
    <v-avatar size="x-large">
      <v-img
        src="images/footer/photo.jpg"
        :alt="t('$vuetify.Layout.Footer.photoAlt')"
        cover
      />
    </v-avatar>
  </v-footer>
</template>
