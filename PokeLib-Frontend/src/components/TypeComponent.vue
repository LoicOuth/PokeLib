<template>
  <div class="mtd-flex">
    <v-tooltip :text="type1?.name" location="bottom">
      <template v-slot:activator="{ props }">
        <img :src="type1?.sprite" v-bind="props" />
      </template>
    </v-tooltip>
    <v-tooltip v-if="type2" :text="type2.name" location="bottom">
      <template v-slot:activator="{ props }">
        <img class="ml-5" :src="type2.sprite" v-bind="props" />
      </template>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemon';
import { computed } from 'vue';

const { getTypeFromId } = usePokemonStore();

const props = defineProps({
  firstTypeId: { type: Number, required: true },
  secondTypeId: { type: Number, required: false },
});

const type1 = computed(() => getTypeFromId(props.firstTypeId));
const type2 = computed(() => (props.secondTypeId ? getTypeFromId(props.secondTypeId) : null));
</script>
