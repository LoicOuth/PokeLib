<template>
  <div class="d-flex flex-column align-center mt-5">
    <v-divider class="w-75 my-5" />
    <TeamItem v-if="teams && teams.data.length > 0" :teams="teams" @update:teams="fetchTeams()" />
    <h1 v-else>Acune équipe</h1>
  </div>
</template>

<script setup lang="ts">
import TeamItem from '@/components/Team/TeamItem.vue';
import { useApi } from '@/composables/useApi';
import type { IPagination } from '@/core/interfaces/common/pagination.interface';
import type { ITeam } from '@/core/interfaces/team.interface';
import { ref, watch } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const fetch = useApi();
const route = useRoute();

const teams = ref<IPagination<ITeam>>();

const fetchTeams = async () => {
  teams.value = await fetch.get<IPagination<ITeam>>(`teams/public?page=${route.query.page || 1}&take=4`);
};

watch(
  () => route.query.page,
  async () => await fetchTeams(),
);

onMounted(async () => {
  await fetchTeams();
});

onMounted(async () => {});
</script>
