import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { type ITeam } from '@/core/interfaces/team.interface';
import { useApi } from '@/composables/useApi';

export const useTeamStore = defineStore('teams', () => {
  const fetch = useApi();
  const team = ref<ITeam>();

  const fetchTeam = async (id: string) => {
    const data = await fetch.get<ITeam>(`teams/${id}`);

    team.value = data;
  };

  watch(
    team,
    () => {
      console.log(team.value);
    },
    { deep: true },
  );

  return {
    team,
    fetchTeam,
  };
});
