<template>
  <v-app v-if="appDataStore.dataIsFetching">
    <v-layout>
      <v-app-bar>
        <template v-slot:title>
          <div class="d-flex align-center">
            <router-link to="/" class="navbar">
              <img src="/logo.png" class="h-logo" />
              <h3 class="d-none d-md-flex">Pokemon Library</h3>
            </router-link>
            <div class="d-flex ml-md-14 ml-2">
              <NavLink to="/" text="Accueil" icon="mdi-home" />
              <NavLink to="/pokedex" text="Pokedex" icon="mdi-bookshelf" />
            </div>
          </div>
        </template>
        <template v-slot:append>
          <AuthComponent />
        </template>
      </v-app-bar>

      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>

  <SplashScreen v-else />
  <AlertHandling />
</template>

<script setup lang="ts">
import AuthComponent from './components/Auth/AuthComponent.vue';
import AlertHandling from './components/General/AlertHandling.vue';
import NavLink from './components/General/NavLink.vue';
import SplashScreen from './components/General/SplashScreen.vue';
import { useAppData } from './stores/app-data';

const appDataStore = useAppData();
</script>

<style scoped lang="scss">
.navbar {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;

  > .h-logo {
    height: 50px;
    margin-right: 1rem;
    transition: transform 300ms ease-out;
  }

  &:hover .h-logo {
    transform: rotate(90deg);
  }
}
</style>
