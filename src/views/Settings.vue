<script lang="ts" setup>
import { ref } from 'vue';
import Dialog from '../components/Dialog.vue';

const isOpen = ref(false);
</script>

<template>
  <Dialog :open="isOpen" @close="isOpen = false">
    <template #title> Einstellungen </template>

    <template #body> </template>
  </Dialog>

  <Button rounded primary @click="isOpen = true">
    <i-material-symbols-settings class="w-8 h-8" />
    <span class="sr-only">Einstellungen</span>
  </Button>
</template>
