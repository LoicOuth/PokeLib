<template>
  <v-app v-if="appDataStore.dataIsFetching">
    <v-layout>
      <v-app-bar>
        <template v-slot:title>
          <div class="d-flex align-center">
            <router-link to="/" class="navbar">
              <img src="/logo.png" class="h-logo" />
              <h3>Pokemon Library</h3>
            </router-link>
            <div class="d-flex ml-14">
              <NavLink to="/" text="Accueil" icon="mdi-home" />
              <NavLink to="/pokedex" text="Pokedex" icon="mdi-bookshelf" />
            </div>
          </div>
        </template>
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
import NavLink from './components/NavLink.vue';
import SplashScreen from './components/SplashScreen.vue';
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
