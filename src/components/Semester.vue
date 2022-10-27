<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useDragStore } from '../store/dragStore';
import { usePlannerStore } from '../store/plannerStore';
import type { Semester } from '../types';
import { totalEcts } from '../utils';
import ModuleList from './ModuleList.vue';
import ScaleTransition from './utils/ScaleTransition.vue';

const plannerStore = usePlannerStore();
const dragStore = useDragStore();

const { semester } = defineProps<{
  semester: Semester;
}>();

const onDrop = () => {
  dropping.value = false;

  const { module } = dragStore;
  if (module) plannerStore.addModuleToSemester(module, semester);
};

const dropping = ref(false);
const canDrop = computed(() => dragStore.canDrop(semester));

const semesterEcts = computed(() => totalEcts(semester.modules));
</script>

<template>
  <div
    class="rounded shadow relative transition-shadow dark:ring-4 ring-purple-50 dark:ring-opacity-25"
    :class="[
      dropping && !canDrop ? '!ring-8 !ring-red-500 ring-opacity-10' : '',
      dropping && canDrop ? '!ring-8 !ring-purple-500 ring-opacity-10' : ''
    ]"
    @drop="onDrop"
    @dragover.prevent="dropping = true"
    @dragleave.prevent="dropping = false"
  >
    <div class="p-4">
      <div class="flex">
        <div>
          <h3 class="font-bold">Semester {{ semester.no }}</h3>
          <span class="text-purple-800 dark:text-purple-200 text-sm">
            {{ semester.turnus === 'WS' ? 'Wintersemester' : 'Sommersemester' }}
            – {{ semesterEcts }} LP
          </span>
        </div>

        <div
          class="ml-auto"
          v-if="
            semester.modules.length === 0 &&
            semester.no > plannerStore.highestSemesterWithModule
          "
        >
          <Button @click="plannerStore.removeSemester" rounded>
            <i-material-symbols-delete />
            <span class="sr-only">Löschen</span>
          </Button>
        </div>
      </div>

      <div
        class="py-6 rounded bg-purple-50 dark:bg-purple-900 text-purple-900 dark:text-purple-100 flex items-center justify-center mt-2"
        v-if="semester.modules.length === 0"
      >
        Module per Ziehen hinzufügen
      </div>
    </div>

    <ModuleList :modules="semester.modules" :semester="semester">
      <template v-for="m in semester.modules" :key="m.id" #[`menu-${m.id}`]>
        <ModuleMenu
          :module="m"
          @delete="plannerStore.removeModuleFromSemester(m)"
        />
      </template>
    </ModuleList>

    <ScaleTransition>
      <div
        class="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-black bg-opacity-80 text-red-500 text-2xl z-20"
        v-if="dropping && !canDrop"
      >
        <i-material-symbols-error class="mb-2" />
        Modulturnus passt nicht zu Semesterturnus.
      </div>
    </ScaleTransition>
  </div>
</template>
