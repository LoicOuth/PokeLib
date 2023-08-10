<template>
  <div class="d-flex justify-center align-center h-screen">
    <div v-if="!isError" class="d-flex flex-column justify-center align-center">
      <img src="/logo.png" class="logo-loader" />
      <h1 class="mt-10">Chargement des données...</h1>
    </div>

    <div v-else class="d-flex flex-column justify-center align-center">
      <h1>Une erreur est apparu</h1>
      <v-btn class="mt-5" @click="handleReturn()" prepend-icon="mdi-home">Retourner à l'accueil </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOCALSTORAGE } from '@/core/constants';
import { useAppData } from '@/stores/app-data';
import { useAuthStore } from '@/stores/auth';
import { usePokemonStore } from '@/stores/pokemon';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { getPokemons, getTypes } = usePokemonStore();
const { getConnectedUser, loginWithGoogle } = useAuthStore();
const { fetchFinished } = useAppData();

const isError = ref(false);

const handleReturn = async () => {
  await router.replace({ query: undefined });
  await router.go(0);
};

onMounted(async () => {
  await router.isReady();

  const calls = [getPokemons(), getTypes()];

  if (localStorage.getItem(LOCALSTORAGE.ACCESS_TOKEN)) calls.push(getConnectedUser());

  if (route.query.code) calls.push(loginWithGoogle(route.query.code.toString()));

  try {
    await Promise.all(calls);

    fetchFinished();
  } catch (error) {
    isError.value = true;
  }
});
</script>

<style scoped lang="scss">
.logo-loader {
  height: 150px;
  animation: load 1.5s linear infinite;
}

@keyframes load {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
