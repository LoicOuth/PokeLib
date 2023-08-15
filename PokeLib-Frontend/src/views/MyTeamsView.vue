<template>
  <div class="d-flex flex-column">
    <router-link v-for="team in teams?.data" :key="team.id" :to="`/account/myteams/${team.id}`">{{
      team.name
    }}</router-link>
  </div>
</template>

<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import type { ITeam } from '@/core/interfaces/team.interface';
import type { IPagination } from '@/core/interfaces/common/pagination.interface';
import { ref } from 'vue';
import { onMounted } from 'vue';

const fetch = useApi();
const teams = ref<IPagination<ITeam>>();

onMounted(async () => {
  teams.value = await fetch.get<IPagination<ITeam>>('teams/public?page=1&take=10');
});
</script>
