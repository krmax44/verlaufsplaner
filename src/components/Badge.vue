<script lang="ts" setup>
defineProps<{
  color?: string;
}>();
</script>

<template>
  <span
    class="px-2 py-1 rounded text-sm"
    :class="
      color ??
      'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-50'
    "
  >
    <slot />
  </span>
</template>
