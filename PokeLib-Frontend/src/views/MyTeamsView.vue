<template>
  <div class="d-flex justify-center align-center w-100">
    <v-btn icon size="x-small" color="primary" class="mr-5" @click="createNewTeam()">
      <v-icon icon="mdi-plus" />
      <v-tooltip location="bottom" activator="parent" text="Ajouter une équipe" />
    </v-btn>
    <h1 class="text-center my-5">Mes équipes ({{ teams?.itemCount }})</h1>
  </div>

  <TeamItem v-if="teams" :teams="teams" @update:teams="fetchTeams()" />
</template>

<script setup lang="ts">
import TeamItem from '@/components/Team/TeamItem.vue';
import { useApi } from '@/composables/useApi';
import type { IPagination } from '@/core/interfaces/common/pagination.interface';
import type { ITeam } from '@/core/interfaces/team.interface';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const fetch = useApi();
const route = useRoute();
const router = useRouter();

const teams = ref<IPagination<ITeam>>();

const fetchTeams = async () => {
  teams.value = await fetch.get<IPagination<ITeam>>(`teams/me?page=${route.query.page || 1}&take=4`);
};

const createNewTeam = async () => {
  const team = await fetch.post<ITeam>(`teams/create`, {}, true);

  router.push(`/account/myteams/${team.id}`);
};

watch(
  () => route.query.page,
  async () => await fetchTeams(),
);

onMounted(async () => {
  await fetchTeams();
});
</script>
