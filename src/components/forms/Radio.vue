<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>

<template>
  <label class="inline-flex items-center">
    <input
      type="radio"
      class="text-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
      v-model="value"
      v-bind="$attrs"
    />
    <span class="ml-2"><slot /></span>
  </label>
</template>
