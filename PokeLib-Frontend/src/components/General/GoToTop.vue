<template>
  <Transition name="fade">
    <div
      v-if="props.isTop != null ? !props.isTop : !isTopRef"
      class="to-top elevation-3"
      @click="props.isTop != null ? emits('goToTop') : handleGoToTop()"
      v-bind="props"
    >
      <v-icon icon="mdi-arrow-up" />
      <v-tooltip text="Retourner en haut" activator="parent" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';

const emits = defineEmits(['goToTop']);

const props = defineProps({
  isTop: { type: Boolean, required: false, default: null },
});

const isTopRef = ref(true);

const handleGoToTop = () => {
  window.scrollTo({
    top: 0,
  });
};

const handleScroll = () => {
  isTopRef.value = window.scrollY === 0;
};

onMounted(() => {
  if (props.isTop === null) window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  if (props.isTop === null) window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(150px);
}

.to-top {
  position: fixed;
  bottom: 2em;
  right: 2em;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: #ffde00;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  cursor: pointer;
  z-index: 10;
}
</style>
