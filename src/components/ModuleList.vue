<script lang="ts" setup>
import type { Module, Semester } from '../types';
import Badge from './Badge.vue';
import GroupTransition from './ScaleGroupTransition.vue';

const { semester } = defineProps<{
  modules: Module[];
  semester?: Semester;
}>();

const startDrag = (event: DragEventInit, module: Module) => {
  event.dataTransfer!.dropEffect = 'move';
  event.dataTransfer!.effectAllowed = 'move';
  event.dataTransfer!.setData('moduleId', module.id.toString());

  if (semester !== undefined)
    event.dataTransfer!.setData('semesterNo', semester.no.toString());
};
</script>

<template>
  <ul class="divide-y divide-gray-300">
    <GroupTransition>
      <li
        class="p-4 bg-white"
        v-for="module in modules"
        :key="module.id"
        draggable="true"
        @dragstart="startDrag($event, module)"
      >
        <div class="flex">
          <h4>{{ module.name }}</h4>
          <div class="ml-auto">
            <slot :name="`menu-${module.id}`" />
          </div>
        </div>
        <div class="space-x-2 mt-2">
          <Badge class="bg-purple-100 text-purple-900">
            {{ module.ects }} LP
          </Badge>
          <Badge class="bg-purple-100 text-purple-900">
            {{ module.rota }}
          </Badge>
          <Badge class="bg-purple-100 text-purple-900" v-if="module.required">
            verpflichtend
          </Badge>
        </div>
      </li>
    </GroupTransition>
  </ul>
</template>
