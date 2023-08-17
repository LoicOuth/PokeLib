import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { type ITeam } from '@/core/interfaces/team.interface';
import { useApi } from '@/composables/useApi';
import { useWebsocket } from '@/composables/useWebsocket';

export const useTeamStore = defineStore('teams', () => {
  const fetch = useApi();
  const team = ref<ITeam>();
  const websocket = useWebsocket();

  const fetchTeam = async (id: string) => {
    const data = await fetch.get<ITeam>(`teams/${id}`);

    team.value = data;
    websocket.connect(data.id.toString());
  };

  const updateName = (name: string) => {
    team.value!.name = name;
    websocket.emit('update:name', { name });
  };

  const addNewPokemon = (pokemonId: number) => {
    team.value!.pokemons_teams?.push({
      pokemon_id: pokemonId,
    });

    websocket.emit('add:pokemon', { pokemonId });
  };

  const deletePokemon = (pokemonId: number) => {
    const index = team.value!.pokemons_teams?.findIndex((el) => el.pokemon_id === pokemonId);

    if (index) {
      team.value!.pokemons_teams?.splice(index, 1);
      websocket.emit('delete:pokemon', { pokemonId });
    }
  };

  return {
    team,
    websocketError: computed(() => websocket.state.onError),
    fetchTeam,
    updateName,
    addNewPokemon,
    deletePokemon,
  };
});
