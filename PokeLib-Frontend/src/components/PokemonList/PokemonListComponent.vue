<template>
  <div class="d-flex flex-md-row flex-column justify-center" :style="{ width: mdAndDown ? '100%' : props.width }">
    <PokemonListFilter @update:filtered-pokemons="(e: IPokemon[]) => (filtredPokemons = e)">
      <h3>Nombre de pokemon : {{ filtredPokemons.length }}</h3>
    </PokemonListFilter>
    <div :style="{ width: mdAndDown ? '100%' : props.width }">
      <h1 v-if="filtredPokemons.length <= 0" class="text-center">Aucun pokemon trouvé</h1>

      <div v-for="pokemon in filtredPokemons" :key="pokemon.id">
        <div
          class="d-flex pokemon pa-5 align-center rounded-lg elevation-3 ma-5"
          :style="{ '--bg': getBackgroundColor(pokemon.first_type_id, pokemon.second_type_id) }"
          @click="props.navigate ? router.push(`/pokedex/${pokemon.name}`) : emits('cardClick', pokemon)"
        >
          <div class="pokemon__img">
            <v-img :src="pokemon.sprite_regular">
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-skeleton-loader type="avatar" />
                </div>
              </template>
            </v-img>
          </div>
          <h1 class="ml-10">{{ pokemon.name }}</h1>
          <v-skeleton-loader type="avatar" />

          <span class="pokedex-number"> #{{ pokemon.pokedex_order }} </span>
        </div>
      </div>
    </div>
  </div>

  <GoToTop @go-to-top="virtual.scrollToIndex(0)" :is-top="isTop" />
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon';
import { getBackgroundColor } from '@/utils/color.util';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PokemonListFilter from './PokemonListFilter.vue';
import type { IPokemon } from '@/core/interfaces/pokemon.interface';
import { useDisplay } from 'vuetify';
import GoToTop from '../General/GoToTop.vue';

const emits = defineEmits(['cardClick']);

const props = defineProps({
  height: { type: String, required: false, default: '64px' },
  width: { type: String, required: false, default: '75%' },
  navigate: { type: Boolean, required: false, default: true },
});

const { pokemons } = usePokemonStore();
const { mdAndDown } = useDisplay();
const router = useRouter();

const isTop = ref(true);
const virtual = ref();
const filtredPokemons = ref(pokemons);
</script>

<style scoped lang="scss">
.pokemon {
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 10em;
    background: var(--bg);
    transition: all 300ms;
    left: 0px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 100px;
    z-index: 0;
  }

  &:hover::before {
    width: 100%;
    border-radius: 5px;
  }

  &__img {
    height: 100px;
    width: 100px;
    z-index: 5;
    padding: 0px;
  }

  > h1 {
    z-index: 5;
  }

  > span.pokedex-number {
    position: absolute;
    top: 30px;
    right: 30px;
    color: gray;
    z-index: 5;
  }
}
</style>
