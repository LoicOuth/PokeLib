<template>
  <div class="d-flex flex-column ma-md-14 ma-2">
    <div v-if="pokemonStore.randomPokemon" class="d-flex flex-md-row flex-column-reverse">
      <v-card
        :style="{
          backgroundImage: getBackgroundColor(
            pokemonStore.randomPokemon.first_type_id,
            pokemonStore.randomPokemon.second_type_id,
          ),
        }"
        class="pa-md-5 pa-1 mt-6 mt-md-0"
        :class="mdAndDown ? 'w-100' : 'w-50'"
      >
        <div class="relative">
          <h1 class="text-center">
            {{ pokemonStore.randomPokemon.name }}
          </h1>
        </div>
        <div class="d-flex justify-space-between align-center">
          <img :src="pokemonStore.randomPokemon.sprite_regular" :height="mdAndDown ? '100' : '250'" />
          <div class="d-flex flex-column text-h6 w-50">
            {{ pokemonStore.randomPokemon.description }}
            <type-component
              class="mt-5"
              :first-type-id="pokemonStore.randomPokemon.first_type_id"
              :second-type-id="pokemonStore.randomPokemon.second_type_id"
            />
            <v-btn class="mt-8">En savoir plus</v-btn>
          </div>
          <h1 class="pokedex-number">#{{ pokemonStore.randomPokemon.pokedex_order }}</h1>
        </div>
      </v-card>

      <div class="d-flex flex-column pa-md-8 pa-2" :class="mdAndDown ? 'w-100' : 'w-50'">
        <h1>Le pokémon aléatoire</h1>
        <v-divider color="white" />

        <p class="mt-8 text-h6">
          Bienvenue dans le monde des Pokémon ! Ce widget vous présente un Pokémon aléatoire, choisi parmi une sélection
          de {{ pokemonStore.pokemonsCount }} créatures de notre Pokédex. Cliquez sur le bouton ci-dessous pour
          découvrir de nouveaux Pokémon à chaque instant. Préparez-vous à vivre une aventure pleine de surprises et de
          magie ! Gotta catch 'em all !
        </p>

        <v-btn class="mt-10" prepend-icon="mdi-dice-6" color="primary" @click="pokemonStore.generateNewRandomPokemon()"
          >Afficher un nouveau Pokémon</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TypeComponent from '@/components/TypeComponent.vue';
import { usePokemonStore } from '@/stores/pokemon';
import { getBackgroundColor } from '@/utils/color.util';
import { onMounted } from 'vue';
import { useDisplay } from 'vuetify';

const pokemonStore = usePokemonStore();
const { mdAndDown } = useDisplay();

onMounted(() => {
  pokemonStore.generateNewRandomPokemon();
});
</script>

<style scoped lang="scss">
.pokedex-number {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>
