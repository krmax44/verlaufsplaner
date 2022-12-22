<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { ModuleTag } from '../../types';
import Dialog from '../Dialog.vue';
import HorizontalFieldset from '../forms/HorizontalFieldset.vue';
import Input from '../forms/Input.vue';
import { usePlannerStore } from '../../store/plannerStore';
import { randomString } from '../../utils';

const props = defineProps<{ tag?: ModuleTag; open: boolean }>();
const emit = defineEmits(['close']);

const plannerStore = usePlannerStore();
const cloneTag = (t: ModuleTag): ModuleTag => ({
  ...t,
  checks: { ...t.checks }
});

const defaults = () => ({
  name: '',
  id: randomString(6),
  checks: {
    minEcts: undefined as number | undefined,
    maxEcts: undefined as number | undefined
  }
});
const tag = ref(cloneTag(props.tag ?? defaults()));

const editing = computed((): boolean => {
  return (
    props.tag?.id !== undefined &&
    plannerStore.getTagById(props.tag.id) !== undefined
  );
});

const save = () => {
  const t = { ...tag.value };
  t.checks.minEcts = t.checks.minEcts || undefined;
  t.checks.maxEcts = t.checks.maxEcts || undefined;

  if (editing.value) {
    plannerStore.updateTag(props.tag!.id, t);
  } else {
    plannerStore.addTag(t);
  }

  emit('close');
};

watch(props, ({ tag: t }) => {
  if (t) tag.value = cloneTag(t);
  else tag.value = defaults();
});
</script>

<template>
  <Dialog :open="props.open" @close="$emit('close')">
    <template #title>
      {{ editing ? `Tag bearbeiten` : 'Tag hinzufügen' }}
    </template>

    <template #body>
      <form class="space-y-2" @submit.prevent="save">
        <Input type="text" v-model="tag.name" required minlength="1">
          Name
        </Input>

        <HorizontalFieldset as="div">
          <Input
            type="number"
            v-model.number="tag.checks.minEcts"
            min="0"
            :max="Math.min(tag.checks.maxEcts ?? 0) || ''"
          >
            Minimale ECTS
          </Input>

          <Input
            type="number"
            v-model.number="tag.checks.maxEcts"
            :min="Math.max(tag.checks.minEcts ?? 0, 0)"
          >
            Maximale ECTS
          </Input>
        </HorizontalFieldset>

        <Button primary type="submit" class="!mt-6"> Speichern </Button>
      </form>
    </template>
  </Dialog>
</template>
