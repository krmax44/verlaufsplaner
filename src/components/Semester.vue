<script lang="ts" setup>
import { computed, toRefs, ref } from 'vue';
import { useDragStore } from '../store/dragStore';
import { usePlannerStore } from '../store/plannerStore';
import type { Semester, Module } from '../types';
import ModuleList from './module/ModuleList.vue';
import MenuItem from './MenuItem.vue';
import ScaleTransition from './utils/ScaleTransition.vue';
import ModuleMover from './module/ModuleMover.vue';

const plannerStore = usePlannerStore();
const dragStore = useDragStore();

const { semester } = toRefs(
  defineProps<{
    semester: Semester;
  }>()
);

const onDrop = () => {
  dropping.value = false;

  const { module } = dragStore;
  if (module) plannerStore.addModuleToSemester(module, semester.value);
};

const dropping = ref(false);
const canDrop = computed(() => dragStore.canDrop(semester.value));

const module = ref<Module | undefined>();
const showMover = ref(false);
const markForMove = (m: Module) => {
  module.value = m;
  showMover.value = true;
};
</script>

<template>
  <div
    class="flex flex-col rounded relative transition-shadow bg-white dark:bg-black"
    :class="[
      dropping && 'ring-8 ring-opacity-50 dark:ring-opacity-75',
      dropping && !canDrop && 'ring-8 ring-red-500',
      dropping && canDrop && 'ring-purple-500',

      !dropping && 'shadow dark:ring-4 dark:ring-purple-50 dark:ring-opacity-25'
    ]"
    @drop="onDrop"
    @dragover.prevent="dropping = true"
    @dragleave.prevent="dropping = false"
  >
    <div class="flex flex-col p-4 w-full">
      <div class="flex">
        <div>
          <h3 class="font-bold">{{ semester.no }}. Semester</h3>
          <span class="text-purple-800 dark:text-purple-200 text-sm">
            {{ semester.turnus === 'WS' ? 'Wintersemester' : 'Sommersemester' }}
            – {{ semester.collectedEcts }} LP
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
    </div>

    <div
      class="flex-1 m-4 py-6 rounded bg-purple-50 dark:bg-purple-900 text-purple-900 dark:text-purple-100 flex items-center justify-center mt-2"
      v-if="semester.modules.length === 0"
    >
      Module per Ziehen hinzufügen
    </div>

    <ModuleList :modules="semester.modules" :semester="semester">
      <template v-for="m in semester.modules" :key="m.id" #[`menu-${m.id}`]>
        <ModuleMenu :module="m" @move="markForMove">
          <MenuItem @click="plannerStore.removeModuleFromSemester(m)">
            <i-material-symbols-delete
              class="mr-1 text-purple-600 group-hover:text-purple-800"
            />

            entfernen
          </MenuItem>
        </ModuleMenu>
      </template>
    </ModuleList>

    <Teleport to="body">
      <ModuleMover
        :module="module"
        v-if="module"
        :open="showMover"
        @close="showMover = false"
      />
    </Teleport>

    <ScaleTransition>
      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center bg-white dark:bg-black bg-opacity-90 text-red-500 text-xl z-20"
        v-if="dropping && !canDrop"
      >
        <i-material-symbols-error class="mb-2" />
        Modulturnus passt nicht zu Semesterturnus.
      </div>
    </ScaleTransition>
  </div>
</template>
