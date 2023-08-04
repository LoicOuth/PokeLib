<template>
  <router-link :to="props.to" custom v-slot="{ navigate, isActive }">
    <v-btn class="navlink" :class="{ active: isActive }" :prepend-icon="icon" @click="navigate()">{{
      props.text
    }}</v-btn>
  </router-link>
</template>

<script setup lang="ts">
const props = defineProps({
  to: { type: String, required: true },
  text: { type: String, required: true },
  icon: { type: String, required: true },
});
</script>

<style scoped lang="scss">
$secondary-color: #ffde00;

.navlink {
  margin-left: 2em;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: 0px;
    transition: width 300ms;
    background-color: $secondary-color;
    bottom: 0;
  }
  &:hover::before {
    width: 100%;
  }

  &.active::before {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    transition: width 300ms;
    background-color: $secondary-color;
    bottom: 0;
  }
}
</style>
