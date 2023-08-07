<template>
  <div class="d-flex my-5" :class="showFilter ? (mdAndDown ? 'w-100' : 'w-25') : 'w-0'">
    <v-card v-if="showFilter" class="w-100 h-100">
      <template v-slot:title>
        <div class="d-flex justify-space-between align-center">
          <span>Filtre</span>
          <div>
            <v-tooltip text="Rénitialiser les filtres">
              <template v-slot:activator="{ props }">
                <v-btn
                  density="compact"
                  variant="text"
                  color="secondary"
                  icon="mdi-refresh"
                  v-bind="props"
                  @click="resetFilter()"
                />
              </template>
            </v-tooltip>
            <v-tooltip v-if="!mdAndDown" text="Cacher les filtres">
              <template v-slot:activator="{ props }">
                <v-btn
                  density="compact"
                  variant="text"
                  color="secondary"
                  icon="mdi-filter-off"
                  v-bind="props"
                  @click="showFilter = false"
                />
              </template>
            </v-tooltip>
          </div>
        </div>
      </template>
      <div class="d-flex flex-column pa-5">
        <v-text-field
          v-model="filter.name"
          clearable
          label="Filtrer par nom"
          variant="outlined"
          @update:model-value="handleFilter"
          @click:clear="handleFilter"
        />
        <v-select
          v-model="filter.type"
          clearable
          chips
          label="Filtrer par type"
          :items="types"
          item-title="name"
          item-value="id"
          multiple
          variant="outlined"
          @update:model-value="handleFilter"
          @click:clear="handleFilter"
        />
        <v-select
          v-model="filter.generation"
          clearable
          label="Filtrer par génération"
          :items="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
          multiple
          variant="outlined"
          @update:model-value="handleFilter"
          @click:clear="handleFilter"
        />

        <div class="d-flex flex-column">
          <div class="d-flex align-center justify-space-between">
            <v-label>Filtrer par poids</v-label>
            <h4>entre {{ filter.weight[0] }} kg et {{ filter.weight[1] }} kg</h4>
          </div>
          <v-range-slider
            v-model="filter.weight"
            color="primary"
            :step="1"
            max="999"
            @update:model-value="handleFilter"
          />
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex align-center justify-space-between">
            <v-label>Filtrer par taille</v-label>
            <h4>entre {{ filter.heigth[0] }} m et {{ filter.heigth[1] }} m</h4>
          </div>
          <v-range-slider
            v-model="filter.heigth"
            color="primary"
            :step="0.1"
            max="10"
            @update:model-value="handleFilter"
          />
        </div>
      </div>

      <div v-if="!mdAndDown" class="footer">
        <slot />
      </div>
    </v-card>

    <v-tooltip v-else text="Afficher les filtres">
      <template v-slot:activator="{ props }">
        <v-btn
          density="compact"
          variant="text"
          color="secondary"
          icon="mdi-filter"
          v-bind="props"
          @click="showFilter = true"
        />
      </template>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon';
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

const emits = defineEmits(['update:filteredPokemons']);

const { types, pokemons } = usePokemonStore();
const { mdAndDown } = useDisplay();

const initialFilter = {
  name: '',
  type: [] as number[],
  generation: [] as number[],
  weight: [0, 0],
  heigth: [0, 0],
};

const filter = ref({ ...initialFilter });
const showFilter = ref(true);

const resetFilter = () => {
  filter.value = { ...initialFilter };
  handleFilter();
};

const handleFilter = () => {
  emits(
    'update:filteredPokemons',
    pokemons.filter((pokemon) => {
      const weight = parseFloat(pokemon.weight.split('kg')[0].replace(',', '.'));
      const height = parseFloat(pokemon.height.split('m')[0].replace(',', '.'));
      // //Filter by weight
      if (filter.value.weight[0] !== 0 || filter.value.weight[1] !== 0)
        if (weight < filter.value.weight[0] || weight > filter.value.weight[1]) return false;

      //Filter by height
      if (filter.value.heigth[0] !== 0 || filter.value.heigth[1] !== 0)
        if (height < filter.value.heigth[0] || height > filter.value.heigth[1]) return false;

      //Filter by name
      if (filter.value.name) if (!pokemon.name.toLowerCase().includes(filter.value.name.toLowerCase())) return false;

      //Filter by type
      if (filter.value.type.length > 0) {
        // Check if at least one of the selected types matches either the first or second type of the Pokémon
        const hasMatchingType =
          filter.value.type.includes(pokemon.first_type_id) ||
          (pokemon.second_type_id && filter.value.type.includes(pokemon.second_type_id));

        if (!hasMatchingType) return false;
      }

      //Filter by generation
      if (filter.value.generation.length > 0) if (!filter.value.generation.includes(pokemon.generation)) return false;

      return true;
    }),
  );
};
</script>

<style scoped lang="scss">
.footer {
  position: absolute;
  width: 100%;
  height: 80px;
  bottom: 0px;
  padding: 1em;
  text-align: center;
  border-top: 1px solid gray;
}
</style>
