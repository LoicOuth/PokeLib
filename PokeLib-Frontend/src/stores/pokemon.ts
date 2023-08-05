import { useApi } from '@/composables/useApi';
import type { IPokemon } from '@/core/interfaces/pokemon.interface';
import { type IType } from '@/core/interfaces/type.interface';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePokemonStore = defineStore('pokemons', () => {
  const fetch = useApi();
  const pokemons = ref<IPokemon[]>([]);
  const randomPokemon = ref<IPokemon>();
  const types = ref<IType[]>([]);

  const pokemonsCount = computed(() => pokemons.value.length);

  const getTypeFromId = (id: number) => types.value.find((el) => el.id === id);

  const generateNewRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * pokemons.value.length);

    randomPokemon.value = pokemons.value[randomIndex];
  };

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
    pokemonsCount,
    randomPokemon,
    generateNewRandomPokemon,
    getTypeFromId,
    getPokemons,
    getTypes,
  };
});
