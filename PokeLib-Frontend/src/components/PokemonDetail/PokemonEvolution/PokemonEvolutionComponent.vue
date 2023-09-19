<template>
  <div
    class="d-flex flex-md-row flex-column justify-space-between w-100 align-center evolution-container overflow-x-auto"
  >
    <template v-for="evolution in props.pokemon?.evolutions?.filter((el) => !el.condition)" :key="evolution.id">
      <PokemonEvolutionItem :pokemon="evolution.pokemon_evolution" />
      <v-icon icon="mdi-chevron-right" size="x-large" />
    </template>
    <PokemonEvolutionItem :pokemon="pokemon" />
    <template v-for="evolution in props.pokemon?.evolutions?.filter((el) => el.condition)" :key="evolution.id">
      <div class="d-flex flex-column justify-center align-center">
        <v-icon icon="mdi-chevron-right" size="x-large" />
        <h5 class="text-center">{{ evolution.condition }}</h5>
      </div>
      <PokemonEvolutionItem :pokemon="evolution.pokemon_evolution" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { type IPokemon } from '@/core/interfaces/pokemon.interface';
import { type PropType } from 'vue';
import PokemonEvolutionItem from './PokemonEvolutionItem.vue';

const props = defineProps({
  pokemon: { type: Object as PropType<IPokemon>, required: true },
});
</script>

<style scoped lang="scss">
.evolution-container {
  & > * {
    flex: 1;
  }
}
</style>
