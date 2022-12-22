<script lang="ts" setup>
import { usePlannerStore } from '../store/plannerStore';
import ModulePicker from '../components/module/ModulePicker.vue';
import Semester from '../components/Semester.vue';
import ScaleGroupTransition from '../components/utils/ScaleGroupTransition.vue';
import Button from '../components/forms/Button.vue';
import TagsProgress from '../components/tag/TagsProgress.vue';

const plannerStore = usePlannerStore();
</script>

<template>
  <section>
    <div class="lg:grid grid-cols-3 gap-x-10 space-y-10 lg:space-y-0">
      <aside>
        <div class="space-y-4 lg:sticky top-8">
          <ModulePicker class="h-96 max-h-128 overflow-auto resize-y" />

          <TagsProgress />
        </div>
      </aside>

      <div class="col-span-2">
        <div class="lg:grid grid-cols-2 gap-4 space-y-4 lg:space-y-0">
          <Semester
            v-for="semester in plannerStore.semesters"
            :semester="semester"
            :key="semester.no"
          />
        </div>

        <div class="flex justify-center my-8">
          <Button primary @click="plannerStore.addSemester" class="w-auto">
            <i-material-symbols-add /> Semester hinzufügen…
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
