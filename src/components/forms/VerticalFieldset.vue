<script lang="ts" setup>
const { as } = defineProps<{ as?: string }>();
</script>

<template>
  <component :is="as ?? 'fieldset'" class="flex flex-col gap-y-1">
    <slot />
  </component>
</template>
