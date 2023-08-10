import { useAppData } from '@/stores/app-data';
import { useConfig } from './useConfig';
import { PokelibError, UnauthorizedError, ValidationError } from '@/core/models/pokelib-error.model';
import { AlertBuilder } from '@/core/builders/alert.builder';
import { LOCALSTORAGE } from '@/core/constants';
import { useAuthStore } from '@/stores/auth';

export const useApi = () => {
  const { getApiUrl } = useConfig();
  const { setNewAlert } = useAppData();
  const authStore = useAuthStore();

  const get = async <T>(endpoint: string): Promise<T> => await send(endpoint, 'GET');

  const post = async <T>(endpoint: string, body: Object, parseResponse: boolean = false): Promise<T> =>
    await send(endpoint, 'POST', body, parseResponse);

  const send = async (endpoint: string, method: string, body?: Object, parseReponse: boolean = true) => {
    const accessToken = localStorage.getItem(LOCALSTORAGE.ACCESS_TOKEN);

    try {
      const response = await fetch(`${getApiUrl()}/${endpoint}`, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
        body: JSON.stringify(body) ?? null,
      });

      if (!response.ok) {
        if (response.status === 401) {
          authStore.resetConnection();

          throw new UnauthorizedError(response.statusText);
        } else {
          const errorResponse = await response.json();

          if (errorResponse.message instanceof Array) {
            throw new ValidationError(errorResponse.error, errorResponse.message);
          } else {
            throw new PokelibError(errorResponse.error, errorResponse.message, errorResponse.statusCode);
          }
        }
      } else {
        if (parseReponse) {
          return await response.json();
        }
      }
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        const warningAlert = new AlertBuilder('Vous devez vous reconnecter').buildWarning();
        setNewAlert(warningAlert);
      } else {
        if (err instanceof PokelibError) {
          const errorAlert = new AlertBuilder(err.message).setTitle(err.error).buildError();

          setNewAlert(errorAlert);
        }

        throw err;
      }
    }
  };

  return {
    get,
    post,
  };
};
