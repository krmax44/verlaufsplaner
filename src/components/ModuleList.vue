<script lang="ts" setup>
import type { Module, Semester } from '../types';
import { useDragStore } from '../store/dragStore';
import Badge from './Badge.vue';
import ScaleGroupTransition from './utils/ScaleGroupTransition.vue';

const dragStore = useDragStore();

const { semester } = defineProps<{
  modules: Module[];
  semester?: Semester;
}>();

const startDrag = (event: DragEventInit, module: Module) => {
  event.dataTransfer!.dropEffect = 'move';
  event.dataTransfer!.effectAllowed = 'move';
  dragStore.$patch({ module, semester });
};
</script>

<template>
  <ul class="divide-y divide-gray-300">
    <ScaleGroupTransition>
      <li
        class="p-4 bg-white dark:bg-black"
        v-for="m in modules"
        :key="m.id"
        draggable="true"
        @dragstart="startDrag($event, m)"
      >
        <div class="flex">
          <h4>{{ m.name }}</h4>
          <div class="ml-auto">
            <slot :name="`menu-${m.id}`" />
          </div>
        </div>
        <div class="space-x-2 mt-2">
          <Badge class="bg-purple-100 text-purple-900"> {{ m.ects }} LP </Badge>
          <Badge class="bg-purple-100 text-purple-900">
            {{ m.rota }}
          </Badge>
          <Badge class="bg-purple-100 text-purple-900" v-if="m.required">
            verpflichtend
          </Badge>
        </div>
      </li>
    </ScaleGroupTransition>
  </ul>
</template>
