<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import { Module, Turnus } from '../../types';
import Dialog from '../Dialog.vue';
import Checkbox from '../forms/Checkbox.vue';
import HorizontalFieldset from '../forms/HorizontalFieldset.vue';
import Legend from '../forms/Legend.vue';
import Input from '../forms/Input.vue';
import Textarea from '../forms/Textarea.vue';
import { usePlannerStore } from '../../store/plannerStore';
import { moduleFitsSemester } from '../../utils';
import Select from '../forms/Select.vue';

const plannerStore = usePlannerStore();
const isOpen = ref(false);
const open = () => (isOpen.value = true);

const defaults = {
  name: '',
  id: undefined as number | undefined,
  ects: undefined as number | undefined,
  rota: ['WS', 'SS'] as Turnus[],
  url: '',
  description: '',
  semester: undefined,
  required: false
};
const module = reactive({ ...defaults });

const availableSemesters = computed(() =>
  plannerStore.semesters.filter((s) => moduleFitsSemester(s, module as Module))
);

const add = () => {
  plannerStore.addModule(module as Module);
};

watch(module, ({ semester }) => {
  console.log(semester);
  const semesters = availableSemesters.value.map((s) => s.no);
  if (semester && !semesters.includes(semester)) module.semester = undefined;
});
</script>

<template>
  <slot :open="open" />

  <Dialog :open="isOpen" @close="isOpen = false">
    <template #title> Modul hinzufügen </template>

    <template #body>
      <form class="space-y-2" @submit.prevent="add">
        <Input type="text" v-model="module.name" required minlength="1">
          Modulname
        </Input>

        <HorizontalFieldset as="div">
          <Input type="number" v-model.number="module.id" min="0" required>
            Modulnummer
          </Input>

          <Input type="number" v-model.number="module.ects" min="0" required>
            ETCS
          </Input>
        </HorizontalFieldset>

        <Input type="url" placeholder="URL" v-model="module.url">
          Link zum Modul
        </Input>

        <Textarea
          v-model="module.description"
          class="min-h-[6rem] max-h-64 resize-y"
        >
          Modulbeschreibung
        </Textarea>

        <HorizontalFieldset>
          <Legend>Angeboten im</Legend>
          <Checkbox
            v-model="module.rota"
            value="WS"
            :disabled="module.rota.length === 1 && module.rota[0] === 'WS'"
          >
            Wintersemester
          </Checkbox>
          <Checkbox
            v-model="module.rota"
            value="SS"
            :disabled="module.rota.length === 1 && module.rota[0] === 'SS'"
          >
            Sommersemester
          </Checkbox>
        </HorizontalFieldset>

        <Checkbox v-model="module.required"> Pflichtmodul </Checkbox>

        <Select v-model="module.semester">
          <template #legend>zu Semester hinzufügen</template>
          <option value="undefined">kein Semester</option>
          <option
            v-for="semester in availableSemesters"
            :key="semester.no"
            :value="semester.no"
          >
            {{ semester.no }}. Semester
          </option>
        </Select>

        <Button primary type="submit" class="!mt-6"> Hinzufügen </Button>
      </form>
    </template>
  </Dialog>
</template>
