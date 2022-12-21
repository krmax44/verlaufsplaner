<script lang="ts" setup>
import type { Module } from '../../types';
import Menu from '../Menu.vue';
import MenuItem from '../MenuItem.vue';

defineProps<{ module: Module }>();
defineEmits<{
  (e: 'move', module: Module): void;
}>();
</script>

<template>
  <Menu>
    <MenuItem @click="$emit('move', module)">
      <i-material-symbols-swap-horiz
        class="mr-1 text-purple-600 group-hover:text-purple-800"
      />

      verschieben
    </MenuItem>

    <slot />
  </Menu>
</template>
