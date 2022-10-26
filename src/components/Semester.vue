<script lang="ts" setup>
import { computed, ref } from 'vue';
import { usePlannerStore } from '../store/planner';
import type { Semester } from '../types';
import { moduleFitsSemester } from '../utils';
import ModuleList from './ModuleList.vue';
import ScaleTransition from './ScaleTransition.vue';

const plannerStore = usePlannerStore();

const { semester } = defineProps<{
  semester: Semester;
}>();

const getDragModule = (event: DragEvent) => {
  const moduleId = parseInt(event.dataTransfer!.getData('moduleId') ?? '');
  if (!moduleId) return;

  return plannerStore.getModuleById(moduleId);
};

const onDrop = (event: DragEvent) => {
  dropping.value = false;
  const module = getDragModule(event);
  if (module) plannerStore.addModuleToSemester(semester, module);
};

const dropping = ref(false);
const allowedToDrop = ref(true);
const onDragEnter = (event: DragEvent) => {
  dropping.value = true;

  const module = getDragModule(event);
  if (module) {
    allowedToDrop.value = moduleFitsSemester(semester, module);
  }
};

const onDragLeave = () => {
  dropping.value = false;
};

const totalEcts = computed(() =>
  semester.modules.reduce((count, module) => count + module.ects, 0)
);
</script>

<template>
  <div
    class="rounded shadow relative transition-shadow"
    :class="[
      dropping && !allowedToDrop ? 'ring-8 ring-red-500 ring-opacity-10' : '',
      dropping && allowedToDrop ? 'ring-8 ring-purple-500 ring-opacity-10' : ''
    ]"
    @drop="onDrop"
    @dragover.prevent="onDragEnter"
    @dragleave.prevent="onDragLeave"
  >
    <div class="p-4">
      <h3 class="font-bold">Semester {{ semester.no }}</h3>
      <span class="text-purple-800 text-sm">
        {{ semester.turnus === 'WS' ? 'Wintersemester' : 'Sommersemester' }} –
        {{ totalEcts }} LP
      </span>

      <div
        class="py-6 rounded bg-purple-50 text-purple-900 flex items-center justify-center mt-2"
        v-if="semester.modules.length === 0"
      >
        Module per Ziehen hinzufügen
      </div>
    </div>

    <ModuleList :modules="semester.modules" :semester="semester">
      <template
        v-for="module in semester.modules"
        :key="module.id"
        #[`menu-${module.id}`]
      >
        <ModuleMenu
          :module="module"
          @delete="plannerStore.removeModuleFromSemester(semester, module)"
        />
      </template>
    </ModuleList>

    <ScaleTransition>
      <div
        class="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 text-red-500 text-2xl"
        v-if="dropping && !allowedToDrop"
      >
        <i-material-symbols-error class="mb-2" />
        Modulturnus passt nicht zu Semesterturnus.
      </div>
    </ScaleTransition>
  </div>
</template>
