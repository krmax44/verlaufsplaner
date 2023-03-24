<script lang="ts" setup>
const { as } = defineProps<{ as?: string }>();
</script>

<template>
  <component
    :is="as ?? 'fieldset'"
    class="fieldset flex flex-col flex-wrap md:flex-row gap-1 md:gap-x-4"
  >
    <slot />
  </component>
</template>

<style scoped>
.fieldset:deep(legend + label) {
  margin-left: 0 !important;
}
</style>
