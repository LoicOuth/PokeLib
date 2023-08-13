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

  const getPokemonFromName = (name: string) => pokemons.value.find((el) => el.name === name);

  const getPokemonFromId = (id: number, lastOrNext: number = 0) =>
    pokemons.value[pokemons.value.findIndex((el) => el.id === id) + lastOrNext];

  const getPrevPokemon = (id: number) => getPokemonFromId(id, -1);

  const getNextPokemon = (id: number) => getPokemonFromId(id, 1);

  const getTypeFromId = (id: number) => types.value.find((el) => el.id === id);

  const generateNewRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * pokemons.value.length);

    randomPokemon.value = pokemons.value[randomIndex];
  };

  const fetchPokemons = async () => {
    const data = await fetch.get<IPokemon[]>('pokemons');

    pokemons.value = data;
  };

  const fetchTypes = async () => {
    const data = await fetch.get<IType[]>('types');

    types.value = data;
  };

  return {
    pokemons,
    types,
    pokemonsCount,
    randomPokemon,
    generateNewRandomPokemon,
    getPokemonFromName,
    getNextPokemon,
    getPrevPokemon,
    getTypeFromId,
    fetchTypes,
    fetchPokemons,
  };
});
