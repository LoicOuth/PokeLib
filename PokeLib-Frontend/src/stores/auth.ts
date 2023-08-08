import { useApi } from '@/composables/useApi';
import type { IRegisterUser } from '@/core/interfaces/forms/register-user.interface';
import type { ILoginReponse } from '@/core/interfaces/login-response.interface';
import { ValidationError } from '@/core/models/pokelib-error.model';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAppData } from './app-data';
import { AlertBuilder } from '@/core/builders/alert.builder';

export const useAuthStore = defineStore('auth', () => {
  const fetch = useApi();
  const { setNewAlert } = useAppData();

  const accessToken = ref();
  const connectedUser = ref();

  const login = async (formdata: { username: string; password: string }) => {
    const response = await fetch.post<ILoginReponse>('auth/login', formdata);

    localStorage.setItem('accessToken', response.access_token);

    accessToken.value = response.access_token;
  };

  const register = async (formData: IRegisterUser) => {
    if (formData.password !== formData.password_confirmation)
      throw new ValidationError('', ['Les mots de passe ne correspondent pas']);

    await fetch.post('users/create', formData);

    setNewAlert(new AlertBuilder("L'enregistrement à réussi").buildSuccess());
  };

  return {
    accessToken,
    connectedUser,
    login,
    register,
  };
});
