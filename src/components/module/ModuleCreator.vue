<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
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

const props = defineProps<{ module?: Module; open: boolean }>();
const emit = defineEmits(['close']);

const plannerStore = usePlannerStore();

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
const module = ref({ ...(props.module ?? defaults) });

const editing = computed((): boolean => {
  return (
    props.module?.id !== undefined &&
    plannerStore.getModuleById(props.module.id) !== undefined
  );
});

const availableSemesters = computed(() =>
  plannerStore.semesters.filter((s) =>
    moduleFitsSemester(s, module.value as Module)
  )
);

const save = () => {
  if (editing) {
    plannerStore.updateModule(props.module!.id, module.value as Module);
  } else {
    plannerStore.addModule(module.value as Module);
  }

  emit('close');
};

watch(module, ({ semester }) => {
  const semesters = availableSemesters.value.map((s) => s.no);
  if (semester && !semesters.includes(semester))
    module.value.semester = undefined;
});

watch(props, ({ module: m }) => {
  if (m) module.value = { ...m };
});
</script>

<template>
  <Dialog :open="props.open" @close="$emit('close')">
    <template #title>
      {{ editing ? `Modul #${module.id} bearbeiten` : 'Modul hinzufügen' }}
    </template>

    <template #body>
      <form class="space-y-2" @submit.prevent="save">
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

        <Button primary type="submit" class="!mt-6"> Speichern </Button>
      </form>
    </template>
  </Dialog>
</template>
