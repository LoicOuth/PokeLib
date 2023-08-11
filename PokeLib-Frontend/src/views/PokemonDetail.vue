<template>
  <div
    class="h-100 d-flex justify-center"
    :style="{
      backgroundImage: getBackgroundColor(pokemon!.first_type_id, pokemon?.second_type_id),
      paddingTop: '10em',
    }"
  >
    <div
      class="bg-surface h-100 d-flex flex-column align-center relative rounded px-md-10 px-4"
      :class="mdAndDown ? 'w-100' : 'w-50'"
    >
      <PokemonDetailHeader :pokemon="pokemon!" :show-shiny="showShiny" />
      <div class="d-flex justify-space-between w-100 detail-header">
        <div class="d-flex flex-column">
          <h1>
            {{ pokemon?.name }}
            <v-tooltip :text="showShiny ? 'Normal' : 'shiny'" location="bottom">
              <template v-slot:activator="{ props }">
                <v-icon
                  v-if="pokemon?.sprite_shiny"
                  class="ml-2 icon-shiny"
                  icon="mdi-drama-masks"
                  @click="showShiny = !showShiny"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </h1>
          <TypeComponent :first-type-id="pokemon!.first_type_id" :second-type-id="pokemon?.second_type_id" />
        </div>

        <h1>#{{ pokemon?.pokedex_order }}</h1>
      </div>

      <div class="d-flex justify-space-between w-100 mt-10 text-center">
        <h2 class="flex-1-1">Taille : {{ pokemon?.height }}</h2>
        <h2 class="flex-1-1">Poid : {{ pokemon?.weight }}</h2>
        <h2 class="flex-1-1">Génération {{ pokemon?.generation }}</h2>
      </div>

      <v-tabs v-model="tab" class="mt-10 w-100" stacked bg-color="primary">
        <v-tab value="stat">
          <v-icon class="mb-3" icon="mdi-chart-timeline" />
          Stats
        </v-tab>
        <v-tab v-if="pokemon?.evolutions && pokemon.evolutions.length > 0" value="evolution">
          <v-icon class="mb-3" icon="mdi-arrow-top-right-thin" />
          Evolutions
        </v-tab>
      </v-tabs>

      <v-window v-model="tab" class="w-100">
        <v-window-item value="stat">
          <div class="d-flex flex-column w-100 stat-container">
            <PokemonStat :value="pokemon!.atk" label="Attaque" />
            <PokemonStat :value="pokemon!.def" label="Défense" />
            <PokemonStat :value="pokemon!.spe_atk" label="Attaque spéciale" />
            <PokemonStat :value="pokemon!.spe_def" label="Défense spéciale" />
            <PokemonStat :value="pokemon!.vit" label="Vitesse" />
          </div>
        </v-window-item>

        <v-window-item value="evolution">
          <PokemonEvolution class="mt-16" :pokemon="pokemon!" />
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonStat from '@/components/PokemonStat.vue';
import TypeComponent from '@/components/TypeComponent.vue';
import PokemonEvolution from '@/components/PokemonEvolution/PokemonEvolutionComponent.vue';
import { usePokemonStore } from '@/stores/pokemon';
import { getBackgroundColor } from '@/utils/color.util';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';
import { computed } from 'vue';
import PokemonDetailHeader from '@/components/PokemonDetailHeader.vue';

const route = useRoute();
const { mdAndDown } = useDisplay();
const { getPokemonFromName } = usePokemonStore();

const tab = ref('stat');
const showShiny = ref(false);

const pokemon = computed(() => getPokemonFromName(route.params.name.toString()));
</script>

<style scoped lang="scss">
.icon-shiny:hover {
  color: #30a7d7;
}

.detail-header {
  margin-top: 5em;
}

.stat-container > * {
  margin-top: 1.5em;
}
</style>
