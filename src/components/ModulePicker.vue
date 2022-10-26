<script lang="ts" setup>
import { computed, ref } from 'vue';
import Fuse from 'fuse.js';
import ModuleList from './ModuleList.vue';
import ModuleMenu from './ModuleMenu.vue';
import type { Module } from '../types';
import { usePlannerStore } from '../store/planner';

const plannerStore = usePlannerStore();
const searchTerm = ref('');

const fuse = new Fuse(plannerStore.unassignedModules, {
  keys: ['name', 'id', 'ects', 'rota']
});

plannerStore.$onAction(({ name, after, args }) => {
  if (name === 'addModuleToSemester') {
    after(() => {
      const [, module] = args;
      fuse.remove((m) => m.id === module.id);
    });
  } else if (name === 'removeModuleFromSemester') {
    after(() => {
      const [, module] = args;
      fuse.add(module);
    });
  }
});

const modules = computed(() =>
  searchTerm.value === ''
    ? plannerStore.unassignedModules
    : fuse.search(searchTerm.value).map((r) => r.item)
);

const onDrop = (event: DragEvent) => {
  const moduleId = parseInt(event.dataTransfer!.getData('moduleId'));
  const semesterNo = parseInt(event.dataTransfer!.getData('semesterNo'));
  console.log(moduleId, semesterNo);
  if (!moduleId || !semesterNo) return;

  const module = plannerStore.getModuleById(moduleId);
  const semester = plannerStore.getSemesterByNo(semesterNo);
  if (module && semester)
    plannerStore.removeModuleFromSemester(semester, module);
};
</script>

<template>
  <div
    class="rounded shadow flex-1 dark:ring-4 ring-purple-50 ring-opacity-25"
    @drop="onDrop($event)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div
      class="p-4 pb-0 sticky top-0 bg-white dark:bg-black z-50 shadow-xl shadow-white dark:shadow-black mb-4"
    >
      <h3 class="font-bold mb-2">Module</h3>

      <input
        type="search"
        class="w-full text-md py-1 rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 bg-white dark:bg-black"
        placeholder="Suchen…"
        v-model="searchTerm"
      />
    </div>

    <ModuleList :modules="modules" class="flex-1 overflow-auto">
      <template
        v-for="module in modules"
        :key="module.id"
        #[`menu-${module.id}`]
      >
        <ModuleMenu :module="module" />
      </template>
    </ModuleList>
  </div>
</template>
