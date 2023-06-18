<script setup lang="ts">
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <!-- NOTE: I would like to add types here too, but it is impossible due to already stipulated stack -->
      <slot />
    </v-main>
    <Footer />
  </v-app>
</template>
