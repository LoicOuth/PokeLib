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

  const put = async <T>(endpoint: string, body: Object | FormData, parseResponse: boolean = false): Promise<T> =>
    await send(endpoint, 'PUT', body, parseResponse);

  const deletes = async <T>(endpoint: string): Promise<T> => await send(endpoint, 'DELETE', undefined, false);

  const send = async (endpoint: string, method: string, body?: Object | FormData, parseReponse: boolean = true) => {
    const accessToken = localStorage.getItem(LOCALSTORAGE.ACCESS_TOKEN);

    const headers: HeadersInit = {
      Accept: body && body instanceof FormData ? 'multipart/form-data' : 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    };

    if (body && !(body instanceof FormData)) headers['Content-Type'] = 'application/json';

    try {
      const response = await fetch(`${getApiUrl()}/${endpoint}`, {
        method,
        headers: { ...headers },
        body: body && body instanceof FormData ? body : JSON.stringify(body),
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
    put,
    deletes,
  };
};
