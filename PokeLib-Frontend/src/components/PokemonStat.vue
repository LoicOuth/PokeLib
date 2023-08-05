<template>
  <v-progress-linear
    :model-value="props.value"
    class="rounded"
    :height="20"
    max="252"
    :color="isHovered ? 'primary' : 'white'"
    :striped="isHovered"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <template v-slot:default="{ value }">
      <strong>{{ props.label }} ({{ Math.floor(value) }})</strong>
    </template>
  </v-progress-linear>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  value: { type: Number, required: true },
  label: { type: String, required: true },
});

const isHovered = ref(false);
</script>
