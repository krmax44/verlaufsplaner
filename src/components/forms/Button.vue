<script lang="ts" setup>
const { rounded, primary } = defineProps({
  rounded: {
    type: Boolean,
    default: false
  },
  primary: {
    type: Boolean,
    default: false
  },
  danger: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <button
    class="flex items-center justify-center font-semibold px-2 py-2 transition-colors disabled:bg-gray-300 disabled:text-gray-800 disabled:hover:text-gray-900 focus:outline-none focus:ring focus:ring-purple-200"
    :class="[
      rounded === false ? 'w-full rounded-sm' : 'rounded-full w-auto',
      primary === false
        ? 'hover:bg-gray-200  dark:hover:bg-gray-800 '
        : 'bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700 dark:bg-purple-600 dark:text-purple-50 dark:hover:bg-purple-700 dark:hover:text-purple-100 ',
      danger !== false &&
        'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:bg-red-700 dark:text-red-50 dark:hover:bg-red-800 dark:hover:text-red-100 focus:ring-red-200'
    ]"
  >
    <slot />
  </button>
</template>
