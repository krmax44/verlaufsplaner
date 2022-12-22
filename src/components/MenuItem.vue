<script lang="ts" setup>
import { MenuItem } from '@headlessui/vue';
</script>

<template>
  <MenuItem v-slot="{ active }">
    <button
      class="flex w-full items-center rounded-sm px-2 py-2 text-sm active:bg-gray-300 dark:active:bg-gray-900"
      :class="active && 'bg-gray-200 dark:bg-gray-800'"
    >
      <slot />
    </button>
  </MenuItem>
</template>

<style scoped>
button :deep(svg) {
  @apply mr-1 text-purple-600;
}
</style>
