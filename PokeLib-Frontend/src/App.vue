<template>
  <v-app v-if="appDataStore.dataIsFetching" @scroll="() => console.log('test')">
    <component :is="route.meta.layout || 'div'">
      <router-view />
    </component>
  </v-app>
  <AlertHandling />
  <GoToTop />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import AlertHandling from './components/General/AlertHandling.vue';
import { useAppData } from './stores/app-data';
import GoToTop from './components/General/GoToTop.vue';

const appDataStore = useAppData();
const route = useRoute();
</script>
