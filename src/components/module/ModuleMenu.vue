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
      <i-material-symbols-swap-horiz />

      verschieben
    </MenuItem>

    <slot />
  </Menu>
</template>
