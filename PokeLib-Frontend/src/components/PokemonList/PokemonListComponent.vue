<template>
  <div class="d-flex flex-md-row flex-column w-75 justify-center" :class="mdAndDown ? 'w-100' : 'w-75'">
    <PokemonListFilter @update:filtered-pokemons="(e: IPokemon[]) => (filtredPokemons = e)">
      <h3>Nombre de pokemon : {{ filtredPokemons.length }}</h3>
    </PokemonListFilter>
    <div :class="mdAndDown ? 'w-100' : 'w-75'">
      <h1 v-if="filtredPokemons.length <= 0" class="text-center">Aucun pokemon trouvé</h1>
      <v-virtual-scroll
        v-else
        ref="virtual"
        height="calc(100vh - 64px)"
        :items="filtredPokemons"
        v-scroll.self="onScroll"
        style="scroll-behavior: smooth"
      >
        <template v-slot:default="{ item: pokemon }">
          <div
            class="d-flex pokemon pa-5 align-center rounded-lg elevation-3 ma-5"
            :style="{ '--bg': getBackgroundColor(pokemon.first_type_id, pokemon.second_type_id) }"
            @click="router.push(`/pokedex/${pokemon.name}`)"
          >
            <img :src="pokemon.sprite_regular" />
            <h1 class="ml-10">{{ pokemon.name }}</h1>
            <span class="pokedex-number"> #{{ pokemon.pokedex_order }} </span>
          </div>
        </template>
      </v-virtual-scroll>
    </div>
  </div>

  <GoToTop @go-to-top="virtual.scrollToIndex(0)" :is-top="isTop" />
</template>

<script setup lang="ts">
import GoToTop from '@/components/GoToTop.vue';
import { usePokemonStore } from '@/stores/pokemon';
import { getBackgroundColor } from '@/utils/color.util';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PokemonListFilter from './PokemonListFilter.vue';
import type { IPokemon } from '@/core/interfaces/pokemon.interface';
import { useDisplay } from 'vuetify';

const { pokemons } = usePokemonStore();
const { mdAndDown } = useDisplay();
const router = useRouter();

const isTop = ref(true);
const virtual = ref();
const filtredPokemons = ref(pokemons);

const onScroll = (e: any) => {
  isTop.value = e.target.scrollTop === 0;
};
</script>

<style scoped lang="scss">
.pokemon {
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 15%;
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

  > img {
    height: 100px;
    width: 100px;
    z-index: 5;
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
