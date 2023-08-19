<template>
  <div class="d-flex flex-column align-center mt-5">
    <v-card class="pa-5" :class="mdAndDown ? 'w-100' : 'w-50'">
      <v-text-field label="Rechercher une équipe" variant="outlined" />

      <v-card-actions>
        <div class="d-flex justify-end w-100">
          <v-btn variant="text" prepend-icon="mdi-filter" color="secondary">Filtrer</v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <v-divider class="w-75 my-5"></v-divider>
  </div>
  <TeamItem v-if="teams" :teams="teams" />
</template>

<script setup lang="ts">
import TeamItem from '@/components/Team/TeamItem.vue';
import { useApi } from '@/composables/useApi';
import type { IPagination } from '@/core/interfaces/common/pagination.interface';
import type { ITeam } from '@/core/interfaces/team.interface';
import { ref, watch } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';

const fetch = useApi();
const route = useRoute();
const { mdAndDown } = useDisplay();

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
