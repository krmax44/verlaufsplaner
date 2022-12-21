<script lang="ts" setup>
import { computed } from 'vue';
import { usePlannerStore } from '../../store/plannerStore';
import { ModuleTag } from '../../types';
import Progress from '../forms/Progress.vue';

const plannerStore = usePlannerStore();

const color = (tag: ModuleTag): string | undefined => {
  const minEcts = tag.checks.minEcts ?? 0;
  const maxEcts = tag.checks.minEcts ?? Infinity;
  const ects = plannerStore.getTagEcts(tag.id);

  if (ects > maxEcts) return 'bg-red-400';
  if (ects >= minEcts) return 'bg-green-400';
};
</script>

<template>
  <div
    class="rounded shadow flex-1 dark:ring-4 ring-purple-50 ring-opacity-25 bg-white dark:bg-black p-4"
  >
    <h3 class="font-bold mb-3">Kategorien</h3>

    <ul class="space-y-3">
      <li v-for="tag in plannerStore.tags" :key="tag.id">
        <Progress
          v-if="tag.checks.minEcts || tag.checks.maxEcts"
          :min="0"
          :max="tag.checks.maxEcts ?? tag.checks.minEcts!"
          :value="plannerStore.getTagEcts(tag.id)"
          :background="color(tag)"
        />
        <h4 class="mt-1 text-sm text-gray-700">{{ tag.name }}</h4>
      </li>
    </ul>
  </div>
</template>
