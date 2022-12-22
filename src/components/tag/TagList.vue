<script lang="ts" setup>
import { ref } from 'vue';
import { usePlannerStore } from '../../store/plannerStore';
import { ModuleTag } from '../../types';
import Progress from '../forms/Progress.vue';
import Menu from '../Menu.vue';
import MenuItem from '../MenuItem.vue';
import TagEditor from './TagEditor.vue';

const plannerStore = usePlannerStore();

const color = (tag: ModuleTag): string | undefined => {
  const minEcts = tag.checks.minEcts ?? 0;
  const maxEcts = tag.checks.maxEcts ?? Infinity;
  const ects = plannerStore.getTagEcts(tag.id);

  if (ects > maxEcts) return 'bg-red-400';
  if (ects >= minEcts) return 'bg-green-400';
};

const tag = ref<ModuleTag | undefined>();
const isEditorOpen = ref(false);
const isDeleteOpen = ref(false);

const addNewTag = () => {
  tag.value = undefined;
  isEditorOpen.value = true;
};

const editTag = (t: ModuleTag) => {
  tag.value = t;
  isEditorOpen.value = true;
};

const markForDeletion = (t: ModuleTag) => {
  tag.value = t;
  isDeleteOpen.value = true;
};

const deleteTag = () => {
  isDeleteOpen.value = false;
  if (tag.value) plannerStore.removeTag(tag.value);
};
</script>

<template>
  <div
    class="rounded shadow flex-1 dark:ring-4 ring-purple-50 ring-opacity-25 bg-white dark:bg-black"
  >
    <div class="px-4 pt-2 flex items-center">
      <h3 class="font-bold">Kategorien</h3>

      <div class="ml-auto">
        <Button rounded @click="addNewTag">
          <i-material-symbols-add />
          <span class="sr-only">Neuen Tag hinzufügen…</span>
        </Button>
      </div>
    </div>

    <ul class="divide-y divide-gray-300">
      <li
        v-for="tag in plannerStore.tags"
        :key="tag.id"
        class="flex p-4 items-center"
      >
        <div class="flex-1">
          <h4>{{ tag.name }}</h4>

          <div>
            <Progress
              v-if="tag.checks.minEcts || tag.checks.maxEcts"
              :min="0"
              :max="tag.checks.maxEcts ?? tag.checks.minEcts!"
              :value="plannerStore.getTagEcts(tag.id)"
              :background="color(tag)"
              aria-hidden="true"
              class="pt-2"
            />

            <p class="text-muted text-sm" v-if="tag.checks.maxEcts">
              {{ plannerStore.getTagEcts(tag.id) }} /
              {{ tag.checks.maxEcts }} ECTS
            </p>
            <p class="text-muted text-sm" v-else>
              {{ plannerStore.getTagEcts(tag.id) }} ECTS
            </p>
          </div>
        </div>
        <div class="pl-8">
          <Menu>
            <MenuItem @click="() => editTag(tag)">
              <i-material-symbols-edit />
              bearbeiten
            </MenuItem>
            <MenuItem @click="() => markForDeletion(tag)">
              <i-material-symbols-delete />
              entfernen
            </MenuItem>
          </Menu>
        </div>
      </li>
    </ul>

    <Teleport to="body">
      <TagEditor
        :tag="tag"
        :open="isEditorOpen"
        @close="isEditorOpen = false"
      />

      <Dialog :open="isDeleteOpen" @close="isDeleteOpen = false">
        <template #title>Modul löschen</template>

        <template #description>
          Möchtest du den Tag „{{ tag?.name }}“ wirklich löschen?
        </template>

        <template #body>
          <HorizontalFieldset as="div">
            <Button primary @click="isDeleteOpen = false">
              Nicht löschen
            </Button>
            <Button danger @click="deleteTag">Entgültig löschen</Button>
          </HorizontalFieldset>
        </template>
      </Dialog>
    </Teleport>
  </div>
</template>
