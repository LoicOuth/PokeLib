import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppData = defineStore('app-data', () => {
  const dataIsFetching = ref(false);

  const fetchFinished = () => {
    dataIsFetching.value = true;
  };

  return {
    dataIsFetching,
    fetchFinished,
  };
});
