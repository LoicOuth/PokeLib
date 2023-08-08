<template>
  <GenericForm btn-label="Se connecter" :execute-fnc="() => handleLogin()" @reset:form-data="resetFormData()">
    <v-text-field
      v-model="formData.username"
      label="Pseudo ou email"
      variant="outlined"
      prepend-inner-icon="mdi-account"
    />

    <v-text-field
      v-model="formData.password"
      label="Mot de passe"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      prepend-inner-icon="mdi-lock-outline"
      @click:append-inner="visible = !visible"
      variant="outlined"
    />

    <template #append>
      <v-divider class="my-10" />

      <v-btn block size="large" variant="tonal">
        <template #prepend>
          <GoogleIcon class="mr-5" height="25" width="25" />
        </template>
        Se connecter avec google
      </v-btn>
    </template>
  </GenericForm>
</template>

<script setup lang="ts">
import GoogleIcon from '@/resources/GoogleIcon.vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import GenericForm from '../General/GenericForm.vue';

const authStore = useAuthStore();

const visible = ref(false);

const initialFormData = {
  username: '',
  password: '',
};

const formData = ref({ ...initialFormData });

const handleLogin = async () => {
  await authStore.login({ ...formData.value });
};

const resetFormData = () => {
  formData.value = { ...initialFormData };
};
</script>
