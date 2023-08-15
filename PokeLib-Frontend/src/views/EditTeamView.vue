<template>
  <div v-if="teamStore.team">
    <v-toolbar color="primary">
      <template #title>
        <span contenteditable @input="(e) => (teamStore.team!.name = (e.target! as any).innerText)">{{
          teamStore.team.name
        }}</span>
      </template>
      <template #prepend>
        <v-icon icon="mdi-pokeball" />
      </template>
      <template #append>
        <v-tooltip text="Team is sync" location="bottom">
          <template #activator="{ props }">
            <v-icon icon="mdi-web-check" color="#006400" size="x-large" v-bind="props" />
          </template>
        </v-tooltip>
      </template>
    </v-toolbar>

    <v-row class="w-50 pa-10">
      <v-col v-for="(i, index) in 6" :key="index" cols="12" md="6">
        <v-card variant="outlined" height="12em" class="pa-5" draggable="true">
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
  </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon';
import { useTeamStore } from '@/stores/team';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const { getPokemonFromId } = usePokemonStore();
const teamStore = useTeamStore();
const route = useRoute();

const ifPokemon = (index: number) => teamStore.team!.pokemons_teams && teamStore.team!.pokemons_teams[index];

onMounted(async () => {
  if (route.params.teamId) {
    await teamStore.fetchTeam(route.params.teamId.toString());
  }
});
</script>

<style scoped lang="scss">
.nb {
  position: absolute;
  top: 5px;
  left: 5px;
}
</style>
