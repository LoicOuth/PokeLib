import { useConfig } from './useConfig';

export const useApi = () => {
  const { getApiUrl } = useConfig();

  const get = async <T>(endpoint: string): Promise<T> => await send(endpoint, 'GET');

  const send = async (endpoint: string, method: string) => {
    try {
      const response = await fetch(`${getApiUrl()}/${endpoint}`, {
        method,
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    get,
  };
};
