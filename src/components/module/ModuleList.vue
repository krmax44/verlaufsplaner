<script lang="ts" setup>
import type { Module, Semester } from '../../types';
import { useDragStore } from '../../store/dragStore';
import Badge from '../Badge.vue';
import ScaleGroupTransition from '../utils/ScaleGroupTransition.vue';
import { ref } from 'vue';
import ModuleTag from '../tag/ModuleTag.vue';

const menuRefs = ref<Record<string, Element>>({});
const dragStore = useDragStore();

const { semester } = defineProps<{
  modules: Module[];
  semester?: Semester;
}>();
defineEmits<{ (e: 'move', module: Module): void }>();

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
        @contextmenu.prevent="menuRefs[m.id]?.querySelector('button')?.click()"
      >
        <div class="flex">
          <h4 @click="$emit('move', m)" class="cursor-pointer">{{ m.name }}</h4>
          <div
            class="ml-auto"
            :ref="
              (el) => {
                if (el) menuRefs[m.id] = el as Element;
              }
            "
          >
            <slot :name="`menu-${m.id}`" />
          </div>
        </div>
        <div class="space-x-2 mt-2">
          <Badge class="bg-purple-100 text-purple-900"> {{ m.ects }} LP </Badge>
          <Badge class="bg-purple-100 text-purple-900">
            {{
              m.rota.sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0)).join('/')
            }}
          </Badge>

          <ModuleTag :tag="tag" v-for="tag in m.tags" :key="tag" />
        </div>
      </li>
    </ScaleGroupTransition>
  </ul>
</template>
