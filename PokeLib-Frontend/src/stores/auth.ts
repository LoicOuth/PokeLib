import { useApi } from '@/composables/useApi';
import type { IRegisterUser } from '@/core/interfaces/forms/register-user.interface';
import type { ILoginReponse } from '@/core/interfaces/login-response.interface';
import { ValidationError } from '@/core/models/pokelib-error.model';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAppData } from './app-data';
import { AlertBuilder } from '@/core/builders/alert.builder';
import { LOCALSTORAGE } from '@/core/constants';
import { type IUser } from '@/core/interfaces/user.interface';

export const useAuthStore = defineStore('auth', () => {
  const fetch = useApi();
  const { setNewAlert } = useAppData();

  const connectedUser = ref<IUser>();

  const handleLogin = async (response: ILoginReponse) => {
    localStorage.setItem(LOCALSTORAGE.ACCESS_TOKEN, response.access_token);

    await fetchConnectedUser();
  };

  const login = async (formdata: { username: string; password: string }) => {
    const response = await fetch.post<ILoginReponse>('auth/login', formdata, true);

    await handleLogin(response);
  };

  const loginWithGoogle = async (authCode: string) => {
    const response = await fetch.post<ILoginReponse>('auth/google', { authCode }, true);

    await handleLogin(response);
  };

  const register = async (formData: IRegisterUser) => {
    if (formData.password !== formData.password_confirmation)
      throw new ValidationError('', ['Les mots de passe ne correspondent pas']);

    await fetch.post('users/create', formData);

    setNewAlert(new AlertBuilder("L'enregistrement à réussi").buildSuccess());
  };

  const fetchConnectedUser = async () => {
    const response = await fetch.get<IUser>('users/me');

    connectedUser.value = response;
  };

  const resetConnection = () => {
    localStorage.clear();
    connectedUser.value = undefined;
  };

  const updateAvatar = async (file: File) => {
    const form = new FormData();
    form.append('avatar', file);

    await fetch.put('users/me/update/avatar', form);

    await fetchConnectedUser();
  };

  const updateUser = async (formData: { email: string; pseudo: string }) => {
    await fetch.put('users/me/update', formData);

    setNewAlert(new AlertBuilder('Données modifier avec succès').buildSuccess());

    await fetchConnectedUser();
  };

  return {
    connectedUser,
    login,
    loginWithGoogle,
    register,
    fetchConnectedUser,
    resetConnection,
    updateAvatar,
    updateUser,
  };
});
