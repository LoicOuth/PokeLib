import type { Alert } from '@/core/models/alert.model';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppData = defineStore('app-data', () => {
  const dataIsFetching = ref(false);
  const alerts = ref<Alert[]>([]);

  const fetchFinished = () => {
    dataIsFetching.value = true;
  };

  const setNewAlert = (alert: Alert) => {
    alerts.value.push(alert);

    setTimeout(() => {
      const index = alerts.value.findIndex((el) => el.id === alert.id);
      alerts.value.splice(index, 1);
    }, alert.showtime);
  };

  return {
    alerts,
    dataIsFetching,
    fetchFinished,
    setNewAlert,
  };
});
