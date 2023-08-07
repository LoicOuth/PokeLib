<template>
  <div class="d-flex flex-column align-center pokemon-item" @click="router.push(`/pokedex/${props.pokemon.name}`)">
    <img :src="props.pokemon.sprite_regular" :height="props.heigth" :width="props.width" />
    <h3 class="mt-3 text-center">{{ props.pokemon.name }}</h3>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import { type IPokemon } from '@/core/interfaces/pokemon.interface';
import { useRouter } from 'vue-router';

const props = defineProps({
  heigth: { type: String, required: false, default: '150' },
  width: { type: String, required: false, default: '150' },
  pokemon: { type: Object as PropType<IPokemon>, required: true },
});

const router = useRouter();
</script>

<style scoped lang="scss">
.pokemon-item {
  cursor: pointer;

  &:hover > h3 {
    text-decoration: underline;
  }

  &:hover > img {
    animation: bounce 1s;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
</style>
