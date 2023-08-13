<template>
  <v-app v-if="appDataStore.dataIsFetching">
    <component :is="route.meta.layout || 'div'">
      <router-view />
    </component>
  </v-app>
  <AlertHandling />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import AlertHandling from './components/General/AlertHandling.vue';
import { useAppData } from './stores/app-data';

const appDataStore = useAppData();
const route = useRoute();
</script>
