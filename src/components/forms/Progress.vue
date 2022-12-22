<script lang="ts" setup>
defineProps<{
  min: number;
  max: number;
  value: number;
  background?: string;
}>();
</script>

<template>
  <div>
    <div
      class="rounded-full overflow-hidden bg-gray-300 relative"
      role="progressbar"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="value"
    >
      <div
        class="h-2"
        :class="background ?? 'bg-purple-400'"
        :style="{ width: `${(value / max) * 100}%` }"
        v-bind="$attrs"
      ></div>
    </div>
  </div>
</template>
