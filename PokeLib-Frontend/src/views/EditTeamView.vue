<template>
  <div v-if="teamStore.team">
    <v-toolbar color="primary">
      <template #title>
        <span contenteditable @input="(e) => teamStore.updateName((e.target! as any).innerText)">{{
          teamStore.team.name
        }}</span>
      </template>
      <template #prepend>
        <v-icon icon="mdi-pokeball" />
      </template>
      <template #extension>
        <div v-if="selectedPokemon" class="d-flex justify-end align-center w-100">
          <v-btn variant="text" icon>
            <v-icon icon="mdi-swap-horizontal" />
            <v-tooltip text="Changer le pokemon" activator="parent" location="bottom" />
          </v-btn>
          <v-btn variant="text" icon @click="handleDeletePokemon(selectedPokemon.id)">
            <v-icon icon="mdi-delete" />
            <v-tooltip text="Supprimer le pokemon" activator="parent" location="bottom" />
          </v-btn>
        </div>
      </template>
      <template #append>
        <v-tooltip v-if="!teamStore.websocketError" text="Team is sync" location="bottom">
          <template #activator="{ props }">
            <v-icon icon="mdi-web-check" color="#006400" size="x-large" v-bind="props" />
          </template>
        </v-tooltip>
        <v-tooltip v-else text="Team is not sync" location="bottom">
          <template #activator="{ props }">
            <v-icon icon="mdi-web-remove" color="error" size="x-large" v-bind="props" />
          </template>
        </v-tooltip>
      </template>
    </v-toolbar>
    <v-row class="w-100">
      <v-col cols="6">
        <v-row class="pa-10">
          <v-col v-for="(i, index) in 6" :key="index" cols="12" md="6">
            <v-card
              variant="outlined"
              height="11em"
              class="pa-5"
              draggable="true"
              @click="
                ifPokemon(index)
                  ? (selectedPokemon = getPokemonFromId(teamStore.team.pokemons_teams![index].pokemon_id))
                  : (addPokemonDialog = true)
              "
            >
              <v-img
                :src="
                  ifPokemon(index)
                    ? getPokemonFromId(teamStore.team.pokemons_teams![index].pokemon_id).sprite_regular
                    : '/logo.png'
                "
                height="80px"
              />

              <div class="d-flex align-center justify-center mt-5">
                <h2 class="text-center">
                  {{
                    ifPokemon(index)
                      ? getPokemonFromId(teamStore.team.pokemons_teams![index].pokemon_id).name
                      : 'Aucun pokemon'
                  }}
                </h2>
              </div>
              <span class="nb">#{{ i }}</span>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-row justify="center" align-content="center" style="padding-top: 2em">
          <PokemonDetailComponent
            v-if="selectedPokemon"
            :pokemon="selectedPokemon"
            :show-next-and-prev="false"
            width="w-100 "
          />
          <h1 v-else>Cliquer sur un pokemon pour voir le détail</h1>
        </v-row>
      </v-col>
    </v-row>
  </div>

  <v-dialog v-model="addPokemonDialog" transition="dialog-top-transition">
    <v-card class="pa-10">
      <div class="d-flex justify-center w-100">
        <PokemonListComponent
          height="130px"
          width="80%"
          :navigate="false"
          @card-click="(e: IPokemon) => handleAddNewPokemon(e.id)"
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import PokemonListComponent from '@/components/PokemonList/PokemonListComponent.vue';
import PokemonDetailComponent from '@/components/PokemonDetail/PokemonDetailComponent.vue';
import type { IPokemon } from '@/core/interfaces/pokemon.interface';
import { usePokemonStore } from '@/stores/pokemon';
import { useTeamStore } from '@/stores/team';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const { getPokemonFromId } = usePokemonStore();
const teamStore = useTeamStore();
const route = useRoute();

const selectedPokemon = ref<IPokemon>();
const addPokemonDialog = ref(false);

const ifPokemon = (index: number) => teamStore.team!.pokemons_teams && teamStore.team!.pokemons_teams[index];

const handleAddNewPokemon = (pokemonId: number) => {
  teamStore.addNewPokemon(pokemonId);
  addPokemonDialog.value = false;
};

const handleDeletePokemon = (pokemonId: number) => {
  teamStore.deletePokemon(pokemonId);
  selectedPokemon.value = undefined;
};

onMounted(async () => {
  if (route.params.teamId) await teamStore.fetchTeam(route.params.teamId.toString());
});
</script>

<style scoped lang="scss">
.nb {
  position: absolute;
  top: 5px;
  left: 5px;
}
</style>
