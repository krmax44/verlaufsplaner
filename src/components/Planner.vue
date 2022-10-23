<script lang="ts" setup>
import { usePlannerStore } from '../store/planner';
import ModulePicker from './ModulePicker.vue';
import Semester from './Semester.vue';
import GroupTransition from './ScaleGroupTransition.vue';

const plannerStore = usePlannerStore();
</script>

<template>
  <section>
    <div class="lg:grid grid-cols-3 gap-x-12">
      <ModulePicker class="sticky top-0" />

      <div class="col-span-2">
        <div class="space-y-4">
          <GroupTransition>
            <Semester
              v-for="semester in plannerStore.semesters"
              :semester="semester"
              :key="semester.no"
            />
          </GroupTransition>
        </div>

        <div class="flex justify-center mt-4">
          <button
            class="flex text-purple-600 hover:text-purple-700 focus:text-purple-700 active:text-purple-800 font-semibold items-center"
            @click="plannerStore.addSemester"
          >
            <i-material-symbols-add /> Semester hinzufügen…
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
