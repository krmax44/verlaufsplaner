<script lang="ts" setup>
import { computed, ref } from 'vue';
import Dialog from '../components/Dialog.vue';
import RadioGroup from '../components/forms/RadioGroup.vue';
import Radio from '../components/forms/Radio.vue';
import { usePlannerStore } from '../store/plannerStore';
import { Turnus } from '../types';

const plannerStore = usePlannerStore();

const isOpen = ref(false);

const startSemester = computed({
  get() {
    return plannerStore.settings.start;
  },
  set(start: Turnus) {
    plannerStore.$patch({
      settings: { start }
    });
  }
});
</script>

<template>
  <Dialog :open="isOpen" @close="isOpen = false">
    <template #title> Einstellungen </template>

    <template #body>
      <form>
        <h4 class="font-medium mb-1">Startsemester</h4>
        <RadioGroup>
          <Radio v-model="startSemester" value="WS">Wintersemester</Radio>
          <Radio v-model="startSemester" value="SS">Sommersemester</Radio>
        </RadioGroup>
      </form>
    </template>
  </Dialog>

  <Button rounded primary @click="isOpen = true">
    <i-material-symbols-settings class="w-8 h-8" />
    <span class="sr-only">Einstellungen</span>
  </Button>
</template>
