<template>
   <div class="d-flex flex-column justify-center align-center h-screen">
      <img src="/logo.png" class="logo-loader"/>
      <h1 class="mt-10">Chargement des données...</h1>
   </div>
</template>

<script setup lang="ts">
import { useAppData } from '@/stores/app-data'
import { usePokemonStore } from '@/stores/pokemon'
import { onMounted } from 'vue'

const { getPokemons, getTypes } = usePokemonStore()
const { fetchFinished } = useAppData()

onMounted(async() => {
  await Promise.all([
   getPokemons(),
   getTypes()
  ])

   fetchFinished()
})

</script>

<style scoped lang="scss">
.logo-loader {
   height: 150px;
   animation: load 1.5s linear infinite
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