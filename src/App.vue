<script lang="ts" setup>
import { usePlannerStore } from './store/plannerStore';
import Planner from './views/Planner.vue';
import Settings from './views/Settings.vue';

const plannerStore = usePlannerStore();
</script>

<template>
  <header>
    <div class="container mx-auto px-4 py-16 flex">
      <div>
        <h1 class="text-xl font-semibold text-purple-900 dark:text-purple-100">
          studieren.lol
        </h1>
        <h2 class="text-purple-500 text-sm">Studienverlaufsplaner</h2>
      </div>

      <div class="flex ml-auto space-x-12 items-center">
        <div class="text-center">
          <div
            v-text="plannerStore.collectedEcts"
            class="text-purple-800 dark:text-purple-200 text-xl"
          />
          <span class="text-gray-500 dark:text-gray-300 text-sm">ECTS</span>
        </div>

        <div>
          <Settings />
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="container mx-auto px-4">
      <Planner />
    </div>
  </main>
</template>
