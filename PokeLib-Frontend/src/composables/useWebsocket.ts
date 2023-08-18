import { reactive } from 'vue';
import { useConfig } from './useConfig';
import { io } from 'socket.io-client';
import { LOCALSTORAGE } from '@/core/constants';
import { useAppData } from '@/stores/app-data';
import { AlertBuilder } from '@/core/builders/alert.builder';

export const useWebsocket = () => {
  const { getWebsocketUrl } = useConfig();
  const { setNewAlert } = useAppData();

  const state = reactive({
    connected: false,
    onError: false,
    teamId: '',
  });

  let timeout: null | number = null;

  const socket = io(getWebsocketUrl(), {
    auth: {
      token: localStorage.getItem(LOCALSTORAGE.ACCESS_TOKEN),
    },
    autoConnect: false,
  });

  socket.on('connect', () => {
    state.connected = true;

    if (state.teamId.length > 0) socket.emit('join:room', state.teamId);
  });

  socket.on('disconnect', () => {
    state.connected = false;
  });

  socket.on('exception', (e: { message: string; status: string }) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      setNewAlert(new AlertBuilder(e.message).buildError());
      state.onError = true;
    }, 500);
  });

  socket.onAny(() => {
    state.onError = false;
  });

  const connect = (teamId: string = '') => {
    state.teamId = teamId;

    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  const emit = (event: string, body: object) => {
    if (state.teamId.length > 0) socket.emit(event, state.teamId, body);
  };

  const setTeamId = (teamId: number) => {
    state.teamId = teamId.toString();
  };

  return {
    state,
    setTeamId,
    connect,
    emit,
    disconnect,
  };
};
