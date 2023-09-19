<template>
  <h1 class="text-center my-5">Mes équipes ({{ teams?.itemCount }})</h1>

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
import { useRoute } from 'vue-router';

const fetch = useApi();
const route = useRoute();

const teams = ref<IPagination<ITeam>>();

const fetchTeams = async () => {
  teams.value = await fetch.get<IPagination<ITeam>>(`teams/me?page=${route.query.page || 1}&take=4`);
};

watch(
  () => route.query.page,
  async () => await fetchTeams(),
);

onMounted(async () => {
  await fetchTeams();
});
</script>
