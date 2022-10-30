<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router';

defineProps<{
  to?: RouteLocationRaw;
}>();
</script>

<template>
  <component
    :is="$props.to ? 'router-link' : 'a'"
    :to="to"
    class="font-semibold text-purple-500 hover:text-purple-600 focus:text-purple-600"
  >
    <slot />
  </component>
</template>
