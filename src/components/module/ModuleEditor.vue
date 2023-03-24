<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import { Module, Turnus } from '../../types';
import Dialog from '../Dialog.vue';
import Checkbox from '../forms/Checkbox.vue';
import HorizontalFieldset from '../forms/HorizontalFieldset.vue';
import Legend from '../forms/Legend.vue';
import Input from '../forms/Input.vue';
import Textarea from '../forms/Textarea.vue';
import { usePlannerStore } from '../../store/plannerStore';
import { moduleFitsSemester } from '../../utils';
import mod from 'zod/lib';

const props = defineProps<{ module?: Module; open: boolean }>();
const emit = defineEmits(['close']);

const plannerStore = usePlannerStore();

const defaults = {
  name: '',
  id: undefined as string | undefined,
  ects: undefined as number | undefined,
  rota: ['WS', 'SS'] as Turnus[],
  tags: [] as string[],
  url: '',
  description: '',
  semester: -1
};
type EditableModule = typeof defaults;

const cloneModule = (m: EditableModule): EditableModule => ({
  ...m,
  rota: [...m.rota],
  tags: [...m.tags]
});
const module = ref(cloneModule((props.module as EditableModule) ?? defaults));

const editing = computed((): boolean => {
  return (
    props.module?.id !== undefined &&
    plannerStore.getModuleById(props.module.id) !== undefined
  );
});

const availableSemesters = computed(() =>
  plannerStore.semesters
    .filter((s) => moduleFitsSemester(s, module.value as Module))
    .map((s) => s.no)
);

const save = () => {
  const safeModule = module.value as Module;
  safeModule.semester =
    safeModule.semester === -1 ? undefined : safeModule.semester;

  if (editing.value) {
    plannerStore.updateModule(props.module!.id, safeModule);
  } else {
    plannerStore.addModule(safeModule as Module);
  }

  emit('close');
};

watch(
  module,
  async ({ semester }) => {
    if (!availableSemesters.value.includes(semester))
      module.value.semester = -1;
  },
  { deep: true }
);

watch(props, ({ module: m }) => {
  if (m) module.value = cloneModule(m as EditableModule);
  else module.value = cloneModule(defaults);
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
          <Input type="text" v-model="module.id" minlength="1" required>
            Modulnummer
          </Input>

          <Input type="number" v-model.number="module.ects" min="0" required>
            ECTS
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

        <HorizontalFieldset v-if="plannerStore.tags.length !== 0" :wrap="true">
          <Legend>Tags</Legend>

          <Checkbox
            v-model="module.tags"
            v-for="tag in plannerStore.tags"
            :key="tag.id"
            :value="tag.id"
          >
            {{ tag.name }}
          </Checkbox>
        </HorizontalFieldset>

        <Select v-model="module.semester">
          <template #legend>zu Semester hinzufügen</template>
          <option :value="-1">kein Semester</option>
          <option
            v-for="semester in availableSemesters"
            :key="semester"
            :value="semester"
          >
            {{ semester }}. Semester
          </option>
        </Select>

        <Button primary type="submit" class="!mt-6"> Speichern </Button>
      </form>
    </template>
  </Dialog>
</template>
