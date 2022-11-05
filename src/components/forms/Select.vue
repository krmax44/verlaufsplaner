<script lang="ts" setup>
import { computed } from 'vue';

const id = (Math.random() + 1).toString(36).substring(7);
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
  <div>
    <label :for="id" v-if="$slots.legend">
      <p class="text-sm text-gray-500 mb-1"><slot name="legend" /></p>
    </label>
    <select
      class="w-full text-md py-1 rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 bg-white dark:bg-black"
      :id="id"
      v-model="value"
      v-bind="$attrs"
    >
      <slot />
    </select>
  </div>
</template>
