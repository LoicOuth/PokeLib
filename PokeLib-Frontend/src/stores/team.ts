import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { type ITeam } from '@/core/interfaces/team.interface';
import { useApi } from '@/composables/useApi';
import { useWebsocket } from '@/composables/useWebsocket';

export const useTeamStore = defineStore('teams', () => {
  const fetch = useApi();
  const team = ref<ITeam>();
  const websocket = useWebsocket();

  const fetchTeam = async (id: string) => {
    const data = await fetch.get<ITeam>(`teams/${id}`);

    console.log('test');

    team.value = data;
    websocket.setTeamId(data.id);
    websocket.socket.connect();
  };

  const updateName = (name: string) => {
    team.value!.name = name;
    websocket.socket.emit('update:name', team.value?.id.toString(), { name });
  };

  return {
    team,
    websocketError: computed(() => websocket.state.onError) ,
    fetchTeam,
    updateName,
  };
});
