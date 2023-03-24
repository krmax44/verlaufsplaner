<script lang="ts" setup>
const { as, wrap } = defineProps<{ as?: string; wrap?: boolean }>();
</script>

<template>
  <component
    :is="as ?? 'fieldset'"
    class="fieldset flex flex-col md:flex-row"
    :class="[
      wrap === true
        ? 'flex-wrap gap-1 md:gap-x-4'
        : 'space-y-1 md:space-y-0 md:space-x-4'
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.fieldset:deep(legend + label) {
  margin-left: 0 !important;
}
</style>
