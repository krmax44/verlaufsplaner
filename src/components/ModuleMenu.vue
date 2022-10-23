<script lang="ts" setup>
import Menu from './Menu.vue';
</script>

<template>
  <Menu>
    <MenuItem @click="$emit('delete')">
      <i-material-symbols-delete
        class="mr-1 text-purple-600 group-hover:text-purple-800"
      />

      Löschen
    </MenuItem>

    <MenuItem @click="$emit('move')">
      <i-material-symbols-calendar-add-on
        class="mr-1 text-purple-600 group-hover:text-purple-800"
      />

      zu Semester hinzufügen
    </MenuItem>
  </Menu>
</template>
