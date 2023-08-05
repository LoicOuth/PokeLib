<template>
  <div class="d-flex justify-center">
    <div class="d-flex flex-wrap" :class="mdAndDown ? 'w-100' : 'w-50'">
      <v-virtual-scroll
        ref="virtual"
        height="calc(100vh - 64px)"
        :items="pokemons"
        v-scroll.self="onScroll"
        style="scroll-behavior: smooth"
      >
        <template v-slot:default="{ item: pokemon }">
          <div
            class="d-flex pokemon pa-5 align-center rounded-lg elevation-3 ma-5"
            :style="{ '--bg': getBackgroundColor(pokemon.first_type_id, pokemon.second_type_id) }"
          >
            <img :src="pokemon.sprite_regular" />
            <h1 class="ml-10">{{ pokemon.name }}</h1>
            <span class="pokedex-number"> #{{ pokemon.pokedex_order }} </span>
          </div>
        </template>
      </v-virtual-scroll>
    </div>
  </div>

  <v-tooltip v-if="!isTop" text="Retourner en haut">
    <template v-slot:activator="{ props }">
      <div class="to-top elevation-3" @click="goToTop" v-bind="props">
        <v-icon icon="mdi-arrow-up" />
      </div>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon';
import { getBackgroundColor } from '@/utils/color.util';
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

const isTop = ref(true);
const virtual = ref();

const { pokemons } = usePokemonStore();
const { mdAndDown } = useDisplay();

const onScroll = (e: any) => {
  isTop.value = e.target.scrollTop === 0;
};

const goToTop = () => {
  virtual.value.scrollToIndex(0);
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
    width: 20%;
    background: var(--bg);
    transition: all 300ms;
    left: -5px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 100px;
    z-index: 0;
  }

  &:hover::before {
    width: 100%;
    border-radius: 0;
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

.to-top {
  position: absolute;
  bottom: 2em;
  right: 2em;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: #ffde00;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  cursor: pointer;
  z-index: 10;
}
</style>
