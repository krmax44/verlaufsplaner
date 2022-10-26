<script lang="ts" setup>
import { MenuItem } from '@headlessui/vue';
import Button from './Button.vue';
</script>

<template>
  <MenuItem
    as="button"
    class="flex w-full items-center rounded-sm px-2 py-2 text-sm hover:bg-gray-200 active:bg-gray-300"
  >
    <slot />
  </MenuItem>
</template>
