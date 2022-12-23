<script lang="ts" setup>
defineProps({
  chevron: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <button
    class="flex p-4 w-full items-center font-semibold transition-colors focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-800 focus:bg-gray-200 dark:focus:bg-gray-800 focus:text-purple-700 dark:focus:text-purple-300"
  >
    <p class="flex items-center">
      <slot />
    </p>
    <div class="ml-auto self-center" v-if="chevron !== false">
      <i-material-symbols-chevron-right />
    </div>
  </button>
</template>

<style scoped>
:deep(svg) {
  @apply mr-2 text-purple-900 dark:text-purple-300;
}
</style>
