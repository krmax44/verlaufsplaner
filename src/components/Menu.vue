<script lang="ts" setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
import Button from './Button.vue';
</script>

<template>
  <Menu as="div" class="relative z-10">
    <MenuButton as="template">
      <Button rounded>
        <i-mdi-dots-horizontal />
        <span class="sr-only">Optionen…</span>
      </Button>
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 top-0 w-56 origin-top-right rounded bg-white dark:bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1 gap-y-2"
      >
        <slot />
      </MenuItems>
    </transition>
  </Menu>
</template>
