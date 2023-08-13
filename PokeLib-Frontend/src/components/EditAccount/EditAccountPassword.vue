<template>
  <v-dialog v-model="changePasswordDialog" transition="dialog-top-transition" width="30vw">
    <template v-slot:activator="{ props: dialogProps }">
      <v-btn variant="text" color="secondary" icon v-bind="dialogProps" @click="changePasswordDialog = true">
        <v-icon icon="mdi-lock-check" />
        <v-tooltip location="bottom" activator="parent" text="Modifier votre mot de passe" />
      </v-btn>
    </template>
    <v-card class="pa-10">
      <GenericForm btn-label="mettre à jour" :execute-fnc="() => handleUpdate()" @reset:form-data="resetFormData()">
        <v-text-field
          v-model="formData.password"
          label="Entrer votre mot de passe"
          :append-inner-icon="visible[1] ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible[1] ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          @click:append-inner="visible[1] = !visible[1]"
          variant="outlined"
        />

        <v-text-field
          v-model="formData.newPassword"
          label="Entrer votre nouveau mot de passe"
          :append-inner-icon="visible[2] ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible[2] ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          @click:append-inner="visible[2] = !visible[2]"
          variant="outlined"
        />

        <v-text-field
          v-model="formData.newPasswordConfirmation"
          label="Confirmer votre nouveau mot de passe"
          :append-inner-icon="visible[3] ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible[3] ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          @click:append-inner="visible[3] = !visible[3]"
          variant="outlined"
        />
      </GenericForm>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GenericForm from '../General/GenericForm.vue';
import { useApi } from '@/composables/useApi';
import { useAppData } from '@/stores/app-data';
import { AlertBuilder } from '@/core/builders/alert.builder';

const fetch = useApi();
const { setNewAlert } = useAppData();

const initialData = {
  password: '',
  newPassword: '',
  newPasswordConfirmation: '',
};

const changePasswordDialog = ref(false);
const visible = ref({
  1: false,
  2: false,
  3: false,
});
const formData = ref({ ...initialData });

const handleUpdate = async () => {
  await fetch.put('users/me/update/password', { ...formData.value });
};

const resetFormData = () => {
  formData.value = { ...initialData };
  changePasswordDialog.value = false;
  setNewAlert(new AlertBuilder('Mot de passe modifié avec succès').buildSuccess());
};
</script>
