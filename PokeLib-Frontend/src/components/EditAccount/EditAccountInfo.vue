<template>
  <GenericForm
    btn-label="Mettre à jour"
    :execute-fnc="() => handleUpdateInfo()"
    @reset:form-data="emits('close:edit-mode')"
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
      variant="outlined"
      prepend-inner-icon="mdi-email"
      :disabled="props.user.register_with_google"
    />
  </GenericForm>
</template>

<script setup lang="ts">
import type { IUser } from '@/core/interfaces/user.interface';
import { useAuthStore } from '@/stores/auth';
import type { PropType } from 'vue';
import { toRef } from 'vue';
import GenericForm from '../General/GenericForm.vue';

const emits = defineEmits(['close:edit-mode']);

const props = defineProps({
  user: { type: Object as PropType<IUser>, required: true },
});

const { updateUser } = useAuthStore();

const formData = toRef(props, 'user');

const handleUpdateInfo = async () => {
  await updateUser({ ...formData.value });
};
</script>
