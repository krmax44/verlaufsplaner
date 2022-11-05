<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import Fuse from 'fuse.js';
import ModuleList from './ModuleList.vue';
import ModuleMenu from './ModuleMenu.vue';
import ModuleCreator from './ModuleCreator.vue';
import Input from '../forms/Input.vue';
import Button from '../forms/Button.vue';
import Dialog from '../Dialog.vue';
import { usePlannerStore } from '../../store/plannerStore';
import { useDragStore } from '../../store/dragStore';
import type { Module } from '../../types';

const plannerStore = usePlannerStore();
const dragStore = useDragStore();

const searchTerm = ref('');

const fuse = new Fuse(plannerStore.unassignedModules, {
  keys: ['name', 'id', 'ects', 'rota']
});

plannerStore.$onAction(({ name, after, args }) => {
  if (name === 'addModuleToSemester') {
    after(() => {
      const [module] = args;
      fuse.remove((m) => m.id === module.id);
    });
  } else if (name === 'removeModuleFromSemester') {
    after(() => {
      const [module] = args;
      fuse.add(module);
    });
  }
});

const modules = computed(() =>
  searchTerm.value === ''
    ? plannerStore.unassignedModules
    : fuse.search(searchTerm.value).map((r) => r.item)
);

const onDrop = () => {
  const { module, semester } = dragStore;
  if (module && semester) plannerStore.removeModuleFromSemester(module);
};

const deleteIsOpen = ref(false);
const moduleForDeletion = ref<Module | undefined>();

const markForDeletion = (module: Module) => {
  moduleForDeletion.value = module;
  deleteIsOpen.value = true;
};

const deleteModule = () => {
  deleteIsOpen.value = false;
  if (moduleForDeletion.value)
    plannerStore.removeModule(moduleForDeletion.value);
  moduleForDeletion.value = undefined;
};
</script>

<template>
  <div
    class="rounded shadow flex-1 dark:ring-4 ring-purple-50 ring-opacity-25"
    @drop="onDrop"
    @dragenter.prevent
    @dragover.prevent
  >
    <div
      class="p-4 pb-0 sticky top-0 bg-white dark:bg-black z-20 shadow-xl shadow-white dark:shadow-black mb-4"
    >
      <div class="flex">
        <h3 class="font-bold mb-1">Module</h3>

        <div class="ml-auto">
          <ModuleCreator v-slot="{ open }">
            <Button rounded @click="open">
              <i-material-symbols-add />
              <span class="sr-only">Neues Modul hinzufügen…</span>
            </Button>
          </ModuleCreator>
        </div>
      </div>

      <Input type="search" placeholder="Suchen…" v-model="searchTerm" />
    </div>

    <ModuleList :modules="modules" class="flex-1 overflow-auto">
      <template v-for="m in modules" :key="m.id" #[`menu-${m.id}`]>
        <ModuleMenu :module="m" @delete="markForDeletion(m)" />
      </template>
    </ModuleList>

    <Dialog :open="deleteIsOpen" @close="deleteIsOpen = false">
      <template #title>Modul löschen</template>

      <template #description>
        Möchtest du das Modul „{{ moduleForDeletion?.name }}“ wirklich löschen?
      </template>

      <template #body>
        <HorizontalFieldset as="div">
          <Button primary @click="deleteIsOpen = false"> Nicht löschen </Button>
          <Button danger @click="deleteModule">Entgültig löschen</Button>
        </HorizontalFieldset>
      </template>
    </Dialog>
  </div>
</template>
