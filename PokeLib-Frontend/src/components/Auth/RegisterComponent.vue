<template>
  <GenericForm
    btn-label="S'enregistrer"
    :execute-fnc="() => handleRegister()"
    @reset:form-data="resetFormData()"
    :btn-disable="!isChecked"
  >
    <v-text-field
      v-model="formData.pseudo"
      label="Entrer un pseudo"
      variant="outlined"
      prepend-inner-icon="mdi-account"
    />

    <v-text-field
      v-model="formData.email"
      label="Entrer un email"
      type="email"
      variant="outlined"
      prepend-inner-icon="mdi-email"
    />

    <v-text-field
      v-model="formData.password"
      label="Entrer un mot de passe"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      prepend-inner-icon="mdi-lock-outline"
      @click:append-inner="visible = !visible"
      variant="outlined"
    />

    <v-text-field
      v-model="formData.password_confirmation"
      label="Confirmer le mot de passe"
      :append-inner-icon="visibleConfirmation ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visibleConfirmation ? 'text' : 'password'"
      prepend-inner-icon="mdi-lock-outline"
      @click:append-inner="visibleConfirmation = !visibleConfirmation"
      variant="outlined"
    />

    <v-checkbox class="w-100" v-model="isChecked">
      <template #label>
        <div>
          <p class="checkbox-label">J'accepte</p>
          <a href="/rgpd" target="_blank">la politique sur la protection des données</a>
        </div>
      </template>
    </v-checkbox>
  </GenericForm>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import GenericForm from '../General/GenericForm.vue';

const emits = defineEmits(['goToLogin']);

const authStore = useAuthStore();

const visible = ref(false);
const visibleConfirmation = ref(false);
const isChecked = ref(false);

const initialFormData = {
  pseudo: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const formData = ref({ ...initialFormData });

const handleRegister = async () => {
  await authStore.register({ ...formData.value });
};

const resetFormData = () => {
  formData.value = { ...initialFormData };
  emits('goToLogin');
};
</script>

<style scoped lang="scss">
.checkbox-label {
  display: inline-block;
  margin-right: 2px;
}
</style>
