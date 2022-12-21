<script lang="ts" setup>
import { usePlannerStore } from '../../store/plannerStore';
import Badge from '../Badge.vue';

const plannerStore = usePlannerStore();
const props = defineProps<{ tag: string }>();

const tag = plannerStore.getTagById(props.tag);
</script>

<template>
  <Badge class="bg-purple-100 text-purple-900" v-if="tag !== undefined">
    {{ tag.name }}
  </Badge>
</template>
