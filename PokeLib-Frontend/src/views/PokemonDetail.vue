<template>
  <div
    class="h-100 d-flex justify-center"
    :style="{
      backgroundImage: getBackgroundColor(pokemon!.first_type_id, pokemon?.second_type_id),
      paddingTop: '10em',
    }"
  >
    <PokemonDetailComponent v-if="pokemon" :pokemon="pokemon" />
  </div>
</template>

<script setup lang="ts">
import PokemonDetailComponent from '@/components/PokemonDetail/PokemonDetailComponent.vue';
import { usePokemonStore } from '@/stores/pokemon';
import { getBackgroundColor } from '@/utils/color.util';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const { getPokemonFromName } = usePokemonStore();

const pokemon = computed(() => getPokemonFromName(route.params.name.toString()));
</script>
