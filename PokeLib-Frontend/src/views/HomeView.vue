<template>
  <div>home</div>
  <div>{{ pokemons.length }}</div>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon'


const { pokemons } = usePokemonStore()


</script>
