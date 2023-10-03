<template>
  <v-tooltip v-if="prevPokemon" :text="`Précédent : ${prevPokemon.name}`" location="left">
    <template v-slot:activator="{ props }">
      <img
        :src="prevPokemon.sprite_regular"
        :height="imgSize"
        :width="imgSize"
        class="prev"
        :style="{ left: mdAndDown ? '5%' : '25%' }"
        v-bind="props"
        @click="handleNavigate(prevPokemon.name)"
      />
    </template>
  </v-tooltip>
  <img
    class="default"
    :src="showShiny ? pokemon?.sprite_shiny : pokemon?.sprite_regular"
    :height="defaultImgSize"
    :width="defaultImgSize"
    :style="{ top: mdAndDown ? '100px' : '50px' }"
  />

  <v-tooltip v-if="nextPokemon" :text="`Suivant : ${nextPokemon.name}`">
    <template v-slot:activator="{ props }">
      <img
        :src="nextPokemon.sprite_regular"
        :height="imgSize"
        :width="imgSize"
        class="next"
        :style="{ right: mdAndDown ? '5%' : '25%' }"
        v-bind="props"
        @click="handleNavigate(nextPokemon.name)"
      />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import type { IPokemon } from '@/core/interfaces/pokemon.interface';
import { usePokemonStore } from '@/stores/pokemon';
import type { PropType } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';

const props = defineProps({
  pokemon: { type: Object as PropType<IPokemon>, required: true },
  showShiny: { type: Boolean, required: true },
  showNextAndPrev: { type: Boolean, required: false, default: true },
});

const emits = defineEmits(['onNavigate']);

const { getNextPokemon, getPrevPokemon } = usePokemonStore();
const router = useRouter();
const { mdAndDown } = useDisplay();

const nextPokemon = computed(() => (props.showNextAndPrev ? getNextPokemon(props.pokemon.id) : undefined));
const prevPokemon = computed(() => (props.showNextAndPrev ? getPrevPokemon(props.pokemon.id) : undefined));

const imgSize = computed(() => (mdAndDown.value ? '100' : '150'));
const defaultImgSize = computed(() => (mdAndDown.value ? '150' : '250'));

const handleNavigate = (name: string) => {
  emits('onNavigate');
  router.push(`/pokedex/${name}`);
};
</script>

<style scoped lang="scss">
.default {
  position: absolute;
}

.next {
  position: absolute;
  top: 60px;
  filter: grayscale(1);
  cursor: pointer;
}

.prev {
  position: absolute;
  top: 60px;
  filter: grayscale(1);
  cursor: pointer;
}
</style>
