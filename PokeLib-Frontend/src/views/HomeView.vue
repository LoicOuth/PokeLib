<template>
  <div class="d-flex flex-column ma-md-10 ma-2 home-container">
    <h1 class="text-h2 text-center">Bienvenue sur Pokemon library</h1>

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
            <TypeComponent
              class="mt-5"
              :first-type-id="pokemonStore.randomPokemon.first_type_id"
              :second-type-id="pokemonStore.randomPokemon.second_type_id"
            />
            <v-btn class="mt-8" @click="router.push(`/pokedex/${pokemonStore.randomPokemon.name}`)"
              >En savoir plus</v-btn
            >
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

    <div>
      <TeamSystem />
    </div>

    <div>
      <TechStack />
    </div>

    <div>
      <PartnairSection />
    </div>
  </div>
  <v-footer elevation="3" class="pa-5" style="margin-top: 5em">
    <div class="w-100">
      <v-row class="pa-5">
        <v-col cols="12" md="4">
          <img src="/logo.png" height="80" />
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="font-weight-bold text-h5">Informations</h3>
          <ul class="text-h6">
            <li>
              <a href="/rgpd" target="_blank" class="text-primary text-decoration-none">Politique de Confidentialité</a>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="font-weight-bold text-h5">Retrouvez-nous</h3>
          <ul class="text-h6">
            <li>
              <a href="https://github.com/LoicOuth/PokeLib" target="_blank" class="text-primary text-decoration-none"
                >GitHub</a
              >
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/lo%C3%AFc-outhier-508329180/"
                target="_blank"
                class="text-primary text-decoration-none"
                >Linkedin</a
              >
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <p class="mt-5">
        &copy; 2023 Pokemon Library. Tous droits réservés. Pokémon est une marque déposée de Nintendo, Game Freak et
        Creatures Inc.
      </p>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import TypeComponent from '@/components/TypeComponent.vue';
import TechStack from '@/components/Home/TechStack.vue';
import TeamSystem from '@/components/Home/TeamSystem.vue';
import PartnairSection from '@/components/Home/PartnairSection.vue';
import { usePokemonStore } from '@/stores/pokemon';
import { getBackgroundColor } from '@/utils/color.util';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';

const pokemonStore = usePokemonStore();
const { mdAndDown } = useDisplay();
const router = useRouter();

onMounted(() => {
  pokemonStore.generateNewRandomPokemon();
});
</script>

<style scoped lang="scss">
.pokedex-number {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.home-container {
  & > div {
    margin-top: 6em;
  }
}

li {
  list-style-type: none;

  & > a:hover {
    text-decoration: underline !important;
  }
}
</style>
