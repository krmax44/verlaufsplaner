<script lang="ts" setup>
import { computed, ref } from 'vue';
import { usePlannerStore } from '../../store/plannerStore';
import { Module } from '../../types';
import { moduleFitsSemester } from '../../utils';

const { module } = defineProps<{ module: Module; open: boolean }>();
const $emit = defineEmits<{ (e: 'close'): void }>();

const plannerStore = usePlannerStore();

const availableSemesters = computed(() =>
  plannerStore.semesters.filter((s) => moduleFitsSemester(s, module))
);

const pickedSemester = ref(availableSemesters.value[0]?.no);

const moveModuleToSemester = () => {
  const semester = plannerStore.getSemesterByNo(pickedSemester.value);
  if (semester) plannerStore.addModuleToSemester(module, semester);

  $emit('close');
};
</script>

<template>
  <Dialog :open="open" @close="$emit('close')">
    <template #title> Modul verschieben </template>

    <template #description>
      <p>
        Das Modul „{{ module.name }}“ kann in folgende Semester verschoben
        werden:
      </p>
    </template>

    <template #body>
      <form @submit.prevent="moveModuleToSemester">
        <VerticalFieldset>
          <Radio
            v-for="semester in availableSemesters"
            :key="semester.no"
            v-model="pickedSemester"
            :value="semester.no"
            name="move-semester"
          >
            {{ semester.no }}. Semester
          </Radio>
        </VerticalFieldset>

        <Button
          @click="moveModuleToSemester"
          primary
          class="mt-4"
          type="submit"
          :disabled="pickedSemester === undefined"
        >
          Verschieben
        </Button>
      </form>
    </template>
  </Dialog>
</template>
