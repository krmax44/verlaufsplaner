<script lang="ts" setup>
import { MenuItem } from '@headlessui/vue';
</script>

<template>
  <MenuItem
    as="button"
    class="
      group
      flex
      w-full
      items-center
      rounded-sm
      px-2
      py-2
      text-sm
      hover:bg-gray-200
      active:bg-gray-300
    "
  >
    <slot />
  </MenuItem>
</template>