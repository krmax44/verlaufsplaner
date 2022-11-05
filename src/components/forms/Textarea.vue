<script lang="ts">
export default {
  inheritAttrs: false
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';

const { modelValue } = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const value = ref(modelValue);
const update = (event: Event) => {
  value.value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value.value);
};
</script>

<template>
  <label class="block">
    <p
      class="text-gray-500 mb-1 transition-transform transform origin-left"
      :class="
        value
          ? 'translate-0 scale-75'
          : 'translate-x-3 translate-y-9 pointer-events-none'
      "
      v-if="$slots.default"
    >
      <slot />
    </p>
    <textarea
      class="w-full text-md py-2 rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 bg-white dark:bg-black"
      :class="
        $slots.default
          ? 'placeholder:text-transparent'
          : 'placeholder:text-gray-500'
      "
      :value="modelValue"
      v-bind="$attrs"
      @input="update"
    />
  </label>
</template>
