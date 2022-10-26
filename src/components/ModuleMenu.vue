<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Module, Semester } from '../types';
import { usePlannerStore } from '../store/planner';
import Menu from './Menu.vue';
import Dialog from './Dialog.vue';
import ButtonVue from './Button.vue';
import { moduleFitsSemester } from '../utils';

const plannerStore = usePlannerStore();

const showMover = ref(false);
const { module } = defineProps<{ module: Module }>();

const availableSemesters = computed(() =>
  plannerStore.semesters.filter((s) => moduleFitsSemester(s, module))
);

const pickedSemester = ref(availableSemesters.value[0]?.no);

const moveModuleToSemester = () => {
  const semester = plannerStore.getSemesterByNo(pickedSemester.value);
  if (semester) plannerStore.addModuleToSemester(semester, module);
};
</script>

<template>
  <Menu>
    <MenuItem @click="$emit('delete')">
      <i-material-symbols-delete
        class="mr-1 text-purple-600 group-hover:text-purple-800"
      />

      Löschen
    </MenuItem>

    <MenuItem @click="showMover = true">
      <i-material-symbols-calendar-add-on
        class="mr-1 text-purple-600 group-hover:text-purple-800"
      />

      zu Semester verschieben
    </MenuItem>
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
        <div class="flex flex-col space-y-1">
          <label
            class="inline-flex items-center"
            v-for="semester in availableSemesters"
            :key="semester.no"
          >
            <input
              type="radio"
              name="move-semester"
              :value="semester.no"
              v-model="pickedSemester"
            />
            <span class="ml-2">{{ semester.no }}. Semester</span>
          </label>
        </div>

        <Button
          @click="moveModuleToSemester"
          primary
          class="mt-2"
          type="submit"
          :disabled="pickedSemester === undefined"
        >
          Verschieben
        </Button>
      </form>
    </template>
  </Dialog>
</template>
