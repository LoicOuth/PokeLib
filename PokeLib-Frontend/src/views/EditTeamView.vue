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
        <div class="d-flex align-center w-100" :class="{ 'justify-space-between': selectedPokemon }">
          <div>
            <v-switch
              :model-value="teamStore.team.is_public"
              label="Equipe publique"
              color="secondary"
              density="compact"
              class="mt-5 pa-2 text-white"
              @update:model-value="teamStore.updatePublic"
            />
          </div>
          <div v-if="selectedPokemon">
            <v-btn variant="text" icon @click="listPokemonDialog = { show: true, isSwitch: true }">
              <v-icon icon="mdi-swap-horizontal" />
              <v-tooltip text="Changer le pokemon" activator="parent" location="bottom" />
            </v-btn>
            <v-btn variant="text" icon @click="handleDeletePokemon(selectedPokemon.id)">
              <v-icon icon="mdi-delete" />
              <v-tooltip text="Supprimer le pokemon" activator="parent" location="bottom" />
            </v-btn>
          </div>
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
      <v-col cols="12" md="6" order="2" order-md="0">
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
                  : (listPokemonDialog = { show: true, isSwitch: false })
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
      <v-col cols="12" md="6">
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

  <v-dialog v-model="listPokemonDialog.show" transition="dialog-top-transition">
    <v-card class="pa-10">
      <div class="d-flex justify-center w-100">
        <PokemonListComponent
          height="130px"
          width="80%"
          :navigate="false"
          @card-click="
            (e: IPokemon) => (listPokemonDialog.isSwitch ? handleSwitchPokemon(e.id) : handleAddNewPokemon(e.id))
          "
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
import { onUnmounted } from 'vue';

const { getPokemonFromId } = usePokemonStore();
const teamStore = useTeamStore();
const route = useRoute();

const selectedPokemon = ref<IPokemon>();
const listPokemonDialog = ref({
  show: false,
  isSwitch: false,
});

const ifPokemon = (index: number) => teamStore.team!.pokemons_teams && teamStore.team!.pokemons_teams[index];

const handleAddNewPokemon = (pokemonId: number) => {
  teamStore.addNewPokemon(pokemonId);
  listPokemonDialog.value.show = false;
};

const handleDeletePokemon = (pokemonId: number) => {
  teamStore.deletePokemon(pokemonId);
  selectedPokemon.value = undefined;
};

const handleSwitchPokemon = (pokemonId: number) => {
  teamStore.switchPokemon(selectedPokemon.value!.id, pokemonId);
  listPokemonDialog.value.show = false;
  selectedPokemon.value = getPokemonFromId(pokemonId);
};

onMounted(async () => {
  if (route.params.teamId) await teamStore.fetchTeam(route.params.teamId.toString());
});

onUnmounted(() => {
  teamStore.websocketDisconnect();
});
</script>

<style scoped lang="scss">
.nb {
  position: absolute;
  top: 5px;
  left: 5px;
}
</style>
