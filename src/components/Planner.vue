<script lang="ts" setup>
import { usePlannerStore } from '../store/planner';
import ModulePicker from './ModulePicker.vue';
import Semester from './Semester.vue';
import GroupTransition from './ScaleGroupTransition.vue';
import Button from './Button.vue';

const plannerStore = usePlannerStore();
</script>

<template>
  <section>
    <div class="lg:grid grid-cols-3 gap-x-12 space-y-12 lg:space-y-0">
      <ModulePicker
        class="lg:sticky top-8 h-96 max-h-128 overflow-auto resize-y"
      />

      <div class="col-span-2">
        <div class="space-y-8">
          <GroupTransition>
            <Semester
              v-for="semester in plannerStore.semesters"
              :semester="semester"
              :key="semester.no"
            />
          </GroupTransition>

          <div class="flex justify-center mt-4">
            <Button primary @click="plannerStore.addSemester" class="w-auto">
              <i-material-symbols-add /> Semester hinzufügen…
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
