export const useConfig = () => {
  const getApiUrl = () => import.meta.env.API_URL ?? 'http://127.0.0.1:3000/api';

  return {
    getApiUrl,
  };
};
