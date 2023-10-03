<template>
  <div class="d-flex flex-column align-center">
    <div v-for="team in teams?.data" :key="team.id" class="ma-2 elevation-3" :class="mdAndDown ? 'w-100' : width">
      <div class="d-flex align-center justify-space-between w-100">
        <div class="d-flex align-center pa-5">
          <v-badge v-if="team.is_public && isOwner(team.user_id)" dot color="success">
            <v-icon icon="mdi-pokeball" />
          </v-badge>
          <v-icon v-else icon="mdi-pokeball" />

          <h3 class="ml-3">{{ team.name }}</h3>
        </div>
        <h3 v-if="team.user && !isOwner(team.user_id)">Par {{ team.user?.pseudo }}</h3>
      </div>
      <v-row>
        <v-col>
          <v-toolbar v-if="isOwner(team.user_id)" rounded color="primary">
            <v-btn prepend-icon="mdi-pencil" :to="`/account/myteams/${team.id}`">Modifier</v-btn>
            <v-btn prepend-icon="mdi-delete" @click="deleteDialog = { show: true, team }">Supprimer</v-btn>
          </v-toolbar>

          <div v-else-if="team.user" class="avatar-with-name" @click="router.push(`/account/${team.user.pseudo}`)">
            <v-avatar size="large" :image="team.user.avatar" />
            <h3>{{ team.user.pseudo }}</h3>
          </div>

          <div class="pa-10 overflow-x-auto">
            <div v-if="team.pokemons_teams && team.pokemons_teams.length > 0" class="d-flex justify-space-evenly">
              <div v-for="(pt, index) in team.pokemons_teams" :key="index">
                <v-tooltip :text="getPokemonFromId(pt.pokemon_id).name" location="bottom center">
                  <template #activator="{ props }">
                    <v-avatar
                      :image="getPokemonFromId(pt.pokemon_id).sprite_regular"
                      size="110"
                      v-bind="props"
                      class="cursor-pointer"
                      @click="router.push(`/pokedex/${getPokemonFromId(pt.pokemon_id).name}`)"
                    />
                  </template>
                </v-tooltip>
              </div>
            </div>
            <h1 v-else class="text-center">Aucun pokemon</h1>
          </div>

          <div class="d-flex text-overline pl-2">
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
    </div>
  </div>
  <v-pagination
    :length="teams?.pageCount"
    @update:model-value="(e: number) => router.push({ query: { page: e } })"
    rounded="circle"
  />

  <v-dialog v-model="deleteDialog.show" persistent width="auto" transition="dialog-top-transition">
    <v-card>
      <v-card-text>Voulez-vous vraiment supprimmer l'équipe suivante : {{ deleteDialog.team.name }} ?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="deleteDialog = { show: false, team: {} as ITeam }"> Non </v-btn>
        <v-btn color="primary" variant="text" @click="handleDelete()"> Oui </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { ITeam } from '@/core/interfaces/team.interface';
import { ref, type PropType } from 'vue';
import { usePokemonStore } from '@/stores/pokemon';
import { useRouter } from 'vue-router';
import type { IPagination } from '@/core/interfaces/common/pagination.interface';
import { useAuthStore } from '@/stores/auth';
import { useApi } from '@/composables/useApi';
import { useAppData } from '@/stores/app-data';
import { AlertBuilder } from '@/core/builders/alert.builder';
import { useDisplay } from 'vuetify';

const { getPokemonFromId } = usePokemonStore();
const { setNewAlert } = useAppData();
const { mdAndDown } = useDisplay();
const authStore = useAuthStore();
const fetch = useApi();
const router = useRouter();

const emits = defineEmits(['update:teams']);

defineProps({
  teams: { type: Object as PropType<IPagination<ITeam>>, required: true },
  width: { type: String, required: false, default: 'w-50' },
});

const deleteDialog = ref({
  show: false,
  team: {} as ITeam,
});

const isOwner = (userId: number) => userId === authStore.connectedUser?.id;

const handleDelete = async () => {
  try {
    await fetch.deletes(`teams/${deleteDialog.value.team.id}`);

    setNewAlert(new AlertBuilder('Equipes supprimer avec succès').buildSuccess());

    deleteDialog.value = {
      show: false,
      team: {} as ITeam,
    };

    emits('update:teams');
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped lang="scss">
.avatar-with-name {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: min-content;

  & > h3 {
    margin-left: 1em;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 1px;
      width: 0px;
      transition: width 300ms;
      background-color: #ffde00;
      bottom: 0;
    }
  }

  &:hover > h3::before {
    width: 100%;
  }
}
</style>
