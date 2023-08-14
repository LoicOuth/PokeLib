<template>
  <v-alert v-if="validationErrors.length > 0" type="error" variant="tonal" density="compact" class="mb-5">
    <template #text>
      <ul>
        <li v-for="error in validationErrors" :key="error">{{ error }}</li>
      </ul>
    </template>
  </v-alert>

  <v-form>
    <slot />

    <v-btn
      block
      class="mt-5"
      color="secondary"
      size="large"
      variant="tonal"
      :loading="loading"
      @click="handleExecute()"
      :disabled="btnDisable"
    >
      {{ btnLabel }}
    </v-btn>
  </v-form>

  <slot name="append" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ValidationError } from '@/core/models/pokelib-error.model';

const props = defineProps({
  btnLabel: { type: String, required: true },
  btnDisable: { type: Boolean, required: false, default: false },
  executeFnc: { type: Function, required: true },
});

const emits = defineEmits(['reset:formData']);

const validationErrors = ref<string[]>([]);
const loading = ref(false);

const handleExecute = async () => {
  loading.value = true;
  validationErrors.value = [];

  try {
    await props.executeFnc();

    emits('reset:formData');
  } catch (error) {
    if (error instanceof ValidationError) validationErrors.value = (error as ValidationError).errors;
  }

  loading.value = false;
};
</script>
