import { useAppData } from '@/stores/app-data';
import { useConfig } from './useConfig';
import { PokelibError, ValidationError } from '@/core/models/pokelib-error.model';
import { AlertBuilder } from '@/core/builders/alert.builder';

export const useApi = () => {
  const { getApiUrl } = useConfig();
  const { setNewAlert } = useAppData();

  const get = async <T>(endpoint: string): Promise<T> => await send(endpoint, 'GET');

  const post = async <T>(endpoint: string, body: Object): Promise<T> => await send(endpoint, 'POST', body);

  const send = async (endpoint: string, method: string, body?: Object) => {
    try {
      const response = await fetch(`${getApiUrl()}/${endpoint}`, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body) ?? null,
      });

      if (!response.ok) {
        const errorResponse = await response.json();

        if (errorResponse.message instanceof Array) {
          throw new ValidationError(errorResponse.error, errorResponse.message);
        } else {
          throw new PokelibError(errorResponse.error, errorResponse.message, errorResponse.statusCode);
        }
      } else {
        if (response.status !== 201) return await response.json();
      }
    } catch (err) {
      if (err instanceof PokelibError) {
        const errorAlert = new AlertBuilder(err.message).setTitle(err.error).buildError();

        setNewAlert(errorAlert);
      }

      throw err;
    }
  };

  return {
    get,
    post,
  };
};
