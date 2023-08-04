import { useApi } from '@/composables/useApi';
import type { IPokemon } from '@/core/interfaces/pokemon.interface';
import { type IType } from '@/core/interfaces/type.interface';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePokemonStore = defineStore('pokemons', () => {
  const fetch = useApi();
  const pokemons = ref<IPokemon[]>([]);
  const types = ref<IType[]>([]);

  const getPokemons = async () => {
    const data = await fetch.get<IPokemon[]>('pokemons');

    pokemons.value = data;
  };

  const getTypes = async () => {
    const data = await fetch.get<IType[]>('types');

    types.value = data;
  };

  return {
    pokemons,
    types,
    getPokemons,
    getTypes,
  };
});
