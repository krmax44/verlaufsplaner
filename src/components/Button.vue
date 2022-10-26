<script lang="ts" setup>
const { rounded, primary } = defineProps({
  rounded: {
    type: Boolean,
    default: false
  },
  primary: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <button
    class="flex items-center justify-center font-semibold px-2 py-2 transition-colors disabled:bg-gray-300 disabled:text-gray-800 disabled:hover:text-gray-900"
    :class="[
      rounded === false ? 'w-full rounded-sm' : 'rounded-full w-auto',
      primary === false
        ? 'hover:bg-gray-200 active:bg-gray-300'
        : 'bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700 active:text-purple-800'
    ]"
  >
    <slot />
  </button>
</template>
