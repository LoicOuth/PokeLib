<template>
  <v-app v-if="appDataStore.dataIsFetching">
    <v-layout>
       <v-app-bar scroll-behavior="elevate">
        <v-app-bar-nav-icon class="navbar" to="/">
          <img src="/logo.png" class="h-logo" />
        </v-app-bar-nav-icon>
        <v-app-bar-title>Pokemon Library</v-app-bar-title>

        <template v-slot:append>
          <v-btn color="secondary" variant="flat" prepend-icon="mdi-login">Se connecter</v-btn>
        </template>
      </v-app-bar>
       
       <v-main>
         <RouterView />
       </v-main>
    </v-layout>
  </v-app>

  <SplashScreen v-else />
</template>

<script setup lang="ts">
import SplashScreen from './components/SplashScreen.vue'
import { useAppData } from './stores/app-data'

const appDataStore = useAppData()
</script>

<style scoped lang="scss">
.navbar {
  cursor: pointer;
}

.navbar:hover .h-logo {
  transform: rotate(90deg);
}

 .h-logo {
  height: 50px;
  transition: transform 300ms ease-out;
 }
</style>