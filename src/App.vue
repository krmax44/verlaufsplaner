<script lang="ts" setup>
import Planner from './components/Planner.vue';
import Button from './components/Button.vue';
import { usePlannerStore } from './store/planner';

const plannerStore = usePlannerStore();
</script>

<template>
  <div>
    <header>
      <div class="container mx-auto px-4 py-16 flex">
        <div>
          <h1 class="text-xl font-semibold text-purple-900">studieren.lol</h1>
          <h2 class="text-purple-500">Studienverlauf einfach planen</h2>
        </div>

        <div class="flex ml-auto space-x-12 items-center">
          <div class="text-center">
            <div
              v-text="plannerStore.collectedEtcs"
              class="text-purple-800 text-xl"
            />
            <span class="text-gray-500 text-sm">ETCS</span>
          </div>

          <div>
            <Button rounded primary>
              <i-material-symbols-settings class="w-8 h-8" />
              <span class="sr-only">Einstellungen</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="container mx-auto px-4">
        <Planner />
      </div>
    </main>
  </div>
</template>
