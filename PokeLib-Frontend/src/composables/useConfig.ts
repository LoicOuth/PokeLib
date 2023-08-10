export const useConfig = () => {
  const getApiUrl = () => import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:3000/api';
  const getGoogleClientId = () => import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '';
  const getGoogleClientScope = () => import.meta.env.VITE_GOOGLE_CLIENT_SCOPE ?? '';

  return {
    getApiUrl,
    getGoogleClientId,
    getGoogleClientScope,
  };
};
