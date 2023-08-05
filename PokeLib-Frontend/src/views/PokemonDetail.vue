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
      <img class="pokemon-img" :src="pokemon?.sprite_regular" height="250" width="250" />

      <div class="d-flex justify-space-between w-100 detail-header">
        <div class="d-flex flex-column">
          <h1>{{ pokemon?.name }}</h1>
          <TypeComponent :first-type-id="pokemon!.first_type_id" :second-type-id="pokemon?.second_type_id" />
        </div>

        <h1>#{{ pokemon?.pokedex_order }}</h1>
      </div>

      <div class="d-flex justify-space-between w-100 mt-10 text-center">
        <h2 class="flex-1-1">Taille : {{ pokemon?.height }}</h2>
        <h2 class="flex-1-1">Poid : {{ pokemon?.weight }}</h2>
        <h2 class="flex-1-1">Generation {{ pokemon?.generation }}</h2>
      </div>

      <div class="d-flex flex-column w-100 stat-container">
        <h1>Stats :</h1>
        <PokemonStat :value="pokemon!.atk" label="Attaque" />
        <PokemonStat :value="pokemon!.def" label="Défense" />
        <PokemonStat :value="pokemon!.spe_atk" label="Attaque spéciale" />
        <PokemonStat :value="pokemon!.spe_def" label="Défense spéciale" />
        <PokemonStat :value="pokemon!.vit" label="Vitesse" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonStat from '@/components/PokemonStat.vue';
import TypeComponent from '@/components/TypeComponent.vue';
import { usePokemonStore } from '@/stores/pokemon';
import { getBackgroundColor } from '@/utils/color.util';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';

const route = useRoute();
const { mdAndDown } = useDisplay();
const { getPokemonFromName } = usePokemonStore();

const pokemon = ref(getPokemonFromName(route.params.name.toString()));
</script>

<style scoped lang="scss">
.pokemon-img {
  position: absolute;
  top: 50px;
}

.detail-header {
  margin-top: 5em;
}

.stat-container > * {
  margin-top: 1.5em;
}
</style>
