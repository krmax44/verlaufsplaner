<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router';

defineProps<{
  to?: RouteLocationRaw;
  button?: Boolean;
}>();
</script>

<template>
  <component
    :is="button !== undefined ? 'button' : $props.to ? 'router-link' : 'a'"
    :to="to"
    class="inline-flex items-center font-semibold text-purple-500 hover:text-purple-600 focus:text-purple-600 disabled:text-gray-500 action-link"
  >
    <slot />
  </component>
</template>

<style scoped>
.action-link :deep(svg) {
  @apply mr-1;
}
</style>
