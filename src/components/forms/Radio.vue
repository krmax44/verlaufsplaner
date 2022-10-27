<script lang="ts" setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>

<template>
  <label class="inline-flex items-center">
    <input
      type="radio"
      name="move-semester"
      class="text-purple-500 ring-purple-100"
      :value="$attrs.value"
      :checked="modelValue === $attrs.value"
      @input="
        $emit('update:modelValue', (<HTMLInputElement>$event.target).value)
      "
    />
    <span class="ml-2"><slot /></span>
  </label>
</template>
