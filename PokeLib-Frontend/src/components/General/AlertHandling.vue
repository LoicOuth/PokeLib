<template>
  <div class="alert-container">
    <v-alert
      v-for="alert in appDataStore.alerts"
      :key="alert.id"
      closable
      :text="alert.message"
      :title="alert.title"
      :type="alert.type"
      density="compact"
      variant="elevated"
      :style="{ '--animation-duration': `${alert.showtime}ms` }"
    />
  </div>
</template>

<script setup lang="ts">
import { useAppData } from '@/stores/app-data';

const appDataStore = useAppData();
</script>

<style scoped lang="scss">
.alert-container {
  box-sizing: border-box;
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 3000;

  & > div {
    margin-top: 1em;
  }

  & > div::before {
    content: '';
    position: absolute;
    bottom: 0;
    height: 5px;
    background-color: white;
    animation: var(--animation-duration) fill-loader forwards linear;
  }
}

@keyframes fill-loader {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>
