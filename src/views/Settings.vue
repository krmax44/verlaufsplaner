<script lang="ts" setup>
import { ref } from 'vue';
import ActionLink from '../components/ActionLink.vue';
import Dialog from '../components/Dialog.vue';

const isOpen = ref(false);
</script>

<template>
  <Dialog :open="isOpen" @close="isOpen = false">
    <template #title> Einstellungen </template>

    <template #body>
      <ActionLink :to="{ name: 'setup' }">zur Einrichtung</ActionLink>
    </template>
  </Dialog>

  <Button rounded primary @click="isOpen = true">
    <i-material-symbols-settings class="w-8 h-8" />
    <span class="sr-only">Einstellungen</span>
  </Button>
</template>