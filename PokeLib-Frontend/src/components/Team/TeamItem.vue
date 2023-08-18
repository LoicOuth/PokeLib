<template>
  <div class="d-flex flex-column align-center">
    <v-expansion-panels class="w-50">
      <v-expansion-panel v-for="team in teams?.data" :key="team.id" class="ma-2" elevation="3">
        <template #title>
          <div class="d-flex align-center justify-space-between w-100">
            <div class="d-flex align-center">
              <v-badge v-if="team.is_public && isOwner(team.user_id)" dot color="success">
                <v-icon icon="mdi-pokeball" />
              </v-badge>
              <v-icon v-else icon="mdi-pokeball" />

              <h3 class="ml-3">{{ team.name }}</h3>
            </div>
            <h3 v-if="!isOwner(team.user_id)">by {{ team.user?.pseudo }}</h3>
          </div>
        </template>
        <template #text>
          <v-row>
            <v-col>
              <v-toolbar v-if="isOwner(team.user_id)" rounded color="primary">
                <v-btn prepend-icon="mdi-pencil" :to="`/account/myteams/${team.id}`">Modifier</v-btn>
                <v-btn prepend-icon="mdi-delete">Supprimer</v-btn>
              </v-toolbar>

              <div class="pa-10">
                <div v-if="team.pokemons_teams && team.pokemons_teams.length > 0" class="d-flex justify-space-evenly">
                  <div v-for="(pt, index) in team.pokemons_teams" :key="index">
                    <v-tooltip :text="getPokemonFromId(pt.pokemon_id).name" location="bottom center">
                      <template #activator="{ props }">
                        <v-avatar :image="getPokemonFromId(pt.pokemon_id).sprite_regular" size="110" v-bind="props" />
                      </template>
                    </v-tooltip>
                  </div>
                </div>
                <h1 v-else class="text-center">Aucun pokemon</h1>
              </div>

              <div class="d-flex text-overline">
                <span>
                  {{ new Date(team.created_at).toLocaleString() }}
                  <v-tooltip text="Date de création" activator="parent" location="bottom center" />
                </span>
                <span class="ml-5">
                  {{ new Date(team.updated_at).toLocaleString() }}
                  <v-tooltip text="Date de modification" activator="parent" location="bottom center" />
                </span>
              </div>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <v-pagination
    :length="teams?.pageCount"
    @update:model-value="(e: number) => router.push({ query: { page: e } })"
    rounded="circle"
  />
</template>

<script setup lang="ts">
import type { ITeam } from '@/core/interfaces/team.interface';
import type { PropType } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';
import { useRouter } from 'vue-router';
import type { IPagination } from '@/core/interfaces/common/pagination.interface';
import { useAuthStore } from '@/stores/auth';

const { getPokemonFromId } = usePokemonStore();
const authStore = useAuthStore();
const router = useRouter();

const isOwner = (userId: number) => userId === authStore.connectedUser?.id;

defineProps({
  teams: { type: Object as PropType<IPagination<ITeam>>, required: true },
});
</script>
