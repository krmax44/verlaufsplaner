<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Module } from '../../types';
import { usePlannerStore } from '../../store/plannerStore';
import { moduleFitsSemester } from '../../utils';
import Menu from '../Menu.vue';
import MenuItem from '../MenuItem.vue';
import Dialog from '../Dialog.vue';
import Button from '../forms/Button.vue';
import VerticalFieldset from '../forms/VerticalFieldset.vue';
import Radio from '../forms/Radio.vue';

defineEmits<{
  (e: 'delete', module: Module): void;
  (e: 'edit', module: Module): void;
}>();

const plannerStore = usePlannerStore();

const showMover = ref(false);
const { module } = defineProps<{ module: Module }>();

const availableSemesters = computed(() =>
  plannerStore.semesters.filter((s) => moduleFitsSemester(s, module))
);

const pickedSemester = ref(availableSemesters.value[0]?.no);

const moveModuleToSemester = () => {
  const semester = plannerStore.getSemesterByNo(pickedSemester.value);
  if (semester) plannerStore.addModuleToSemester(module, semester);

  showMover.value = false;
};
</script>

<template>
  <Menu>
    <MenuItem @click="showMover = true">
      <i-material-symbols-swap-horiz
        class="mr-1 text-purple-600 group-hover:text-purple-800"
      />

      verschieben
    </MenuItem>

    <slot />
  </Menu>

  <Dialog :open="showMover" @close="showMover = false">
    <template #title> Modul verschieben </template>

    <template #description>
      <p>
        Das Modul „{{ module.name }}“ kann in folgende Semester verschoben
        werden:
      </p>
    </template>

    <template #body>
      <form @submit.prevent="moveModuleToSemester">
        <VerticalFieldset>
          <Radio
            v-for="semester in availableSemesters"
            :key="semester.no"
            v-model="pickedSemester"
            :value="semester.no"
            name="move-semester"
          >
            {{ semester.no }}. Semester
          </Radio>
        </VerticalFieldset>

        <Button
          @click="moveModuleToSemester"
          primary
          class="mt-4"
          type="submit"
          :disabled="pickedSemester === undefined"
        >
          Verschieben
        </Button>
      </form>
    </template>
  </Dialog>
</template>
