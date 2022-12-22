<script lang="ts" setup>
import { computed, ref } from 'vue';
import Fuse from 'fuse.js';
import ModuleList from './ModuleList.vue';
import ModuleMenu from './ModuleMenu.vue';
import MenuItem from '../MenuItem.vue';
import ModuleCreator from './ModuleCreator.vue';
import Input from '../forms/Input.vue';
import Button from '../forms/Button.vue';
import Dialog from '../Dialog.vue';
import { usePlannerStore } from '../../store/plannerStore';
import { useDragStore } from '../../store/dragStore';
import type { Module } from '../../types';
import ModuleMover from './ModuleMover.vue';
import ScaleTransition from '../utils/ScaleTransition.vue';

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

const dropping = ref(false);
const onDrop = () => {
  dropping.value = false;
  const { module, semester } = dragStore;
  if (module && semester) plannerStore.removeModuleFromSemester(module);
};

const isEditorOpen = ref(false);
const isDeleteOpen = ref(false);
const module = ref<Module | undefined>();

const markForEdit = (m: Module) => {
  module.value = m;
  isEditorOpen.value = true;
};

const markForDeletion = (m: Module) => {
  module.value = m;
  isDeleteOpen.value = true;
};

const deleteModule = () => {
  isDeleteOpen.value = false;
  if (module.value) plannerStore.removeModule(module.value);
  module.value = undefined;
};

const isMoverOpen = ref(false);
const markForMove = (m: Module) => {
  module.value = m;
  isMoverOpen.value = true;
};

const addNewModule = () => {
  isEditorOpen.value = true;
  module.value = undefined;
};
</script>

<template>
  <div
    class="flex flex-col flex-1 rounded transition-shadow bg-white dark:bg-black"
    :class="[
      dropping && 'ring-8 ring-purple-500 ring-opacity-50 dark:ring-opacity-75',
      !dropping && 'shadow dark:ring-4 ring-purple-50 ring-opacity-25'
    ]"
    @drop="onDrop"
    @dragenter.prevent
    @dragover.prevent="dropping = true"
    @dragleave.prevent="dropping = false"
  >
    <div
      class="px-4 pt-2 sticky top-0 bg-white dark:bg-black z-20 shadow-xl shadow-white dark:shadow-black mb-4"
    >
      <div class="flex mb-2 items-center">
        <h3 class="font-bold">Module</h3>

        <div class="ml-auto">
          <Button rounded @click="addNewModule">
            <i-material-symbols-add />
            <span class="sr-only">Neues Modul hinzufügen…</span>
          </Button>
        </div>
      </div>

      <Input type="search" placeholder="Suchen…" v-model="searchTerm" />
    </div>

    <ScaleTransition class="flex flex-col flex-1">
      <div
        v-if="modules.length === 0 && searchTerm !== ''"
        class="flex flex-col flex-1 items-center justify-center"
      >
        <p class="text-muted">Keine Suchergebnisse</p>
      </div>

      <div
        v-else-if="plannerStore.modules.length === 0"
        class="flex flex-col flex-1 items-center justify-center"
      >
        <div>
          <Button primary @click="addNewModule">
            <i-material-symbols-add />
            Erstes Modul hinzufügen…
          </Button>
        </div>
      </div>

      <div
        v-else-if="plannerStore.unassignedModules.length === 0"
        class="flex flex-col flex-1 items-center justify-center"
      >
        <p class="text-muted">Super – alle Module sind verteilt!</p>
      </div>

      <ModuleList
        :modules="modules"
        class="flex-1 overflow-auto cursor-move"
        @move="(m) => markForMove(m)"
        v-else
      >
        <template v-for="m in modules" :key="m.id" #[`menu-${m.id}`]>
          <ModuleMenu :module="m" @move="markForMove(m)">
            <MenuItem @click="markForDeletion(m)">
              <i-material-symbols-delete
                class="mr-1 text-purple-600 group-hover:text-purple-800"
              />
              löschen
            </MenuItem>
            <MenuItem @click="markForEdit(m)">
              <i-material-symbols-edit
                class="mr-1 text-purple-600 group-hover:text-purple-800"
              />
              bearbeiten
            </MenuItem>
          </ModuleMenu>
        </template>
      </ModuleList>
    </ScaleTransition>

    <!-- needs to be within root div, so external classes apply -->
    <Teleport to="body">
      <ModuleMover
        :open="isMoverOpen"
        v-if="module !== undefined"
        :module="module"
        @close="isMoverOpen = false"
      />

      <ModuleCreator
        :open="isEditorOpen"
        @close="isEditorOpen = false"
        :module="module"
      />

      <Dialog :open="isDeleteOpen" @close="isDeleteOpen = false">
        <template #title>Modul löschen</template>

        <template #description>
          Möchtest du das Modul „{{ module?.name }}“ wirklich löschen?
        </template>

        <template #body>
          <HorizontalFieldset as="div">
            <Button primary @click="isDeleteOpen = false">
              Nicht löschen
            </Button>
            <Button danger @click="deleteModule">Entgültig löschen</Button>
          </HorizontalFieldset>
        </template>
      </Dialog>
    </Teleport>
  </div>
</template>
