<template>
  <v-app-bar elevation="3">
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
      <AuthComponent v-if="!authStore.connectedUser" />
      <UserMenu class="mr-5" v-else />
    </template>
  </v-app-bar>

  <v-main>
    <slot />
  </v-main>
</template>

<script setup lang="ts">
import NavLink from '@/components/NavBar/NavLink.vue';
import AuthComponent from '@/components/Auth/AuthComponent.vue';
import UserMenu from '@/components/NavBar/UserMenu.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
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
