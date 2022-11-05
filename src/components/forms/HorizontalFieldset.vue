<script lang="ts" setup>
const { as } = defineProps<{ as?: string }>();
</script>

<template>
  <component
    :is="as ?? 'fieldset'"
    class="fieldset flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-4"
  >
    <slot />
  </component>
</template>

<style scoped>
.fieldset:deep(legend + label) {
  margin-left: 0 !important;
}
</style>
