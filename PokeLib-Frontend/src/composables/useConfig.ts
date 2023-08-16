export const useConfig = () => {
  const getApiUrl = () => `${import.meta.env.VITE_BACKEND_URL}/api` ?? 'http://127.0.0.1:3000/api';
  const getWebsocketUrl = () => `${import.meta.env.VITE_BACKEND_URL}/team` ?? 'http://localhost:3000/team';
  const getGoogleClientId = () => import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '';
  const getGoogleClientScope = () => import.meta.env.VITE_GOOGLE_CLIENT_SCOPE ?? '';

  return {
    getApiUrl,
    getWebsocketUrl,
    getGoogleClientId,
    getGoogleClientScope,
  };
};
