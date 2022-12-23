<script lang="ts" setup>
import { computed, ref, nextTick } from 'vue';

type Direction = 'left' | 'right';
const props = defineProps<{
  direction?: Direction;
}>();

const direction = computed(
  (): Direction => (props.direction === 'right' ? 'right' : 'left')
);
const container = ref<HTMLDivElement | undefined>();

const enterFromClass = computed(() =>
  direction.value === 'left'
    ? 'transform translate-x-full'
    : 'transform -translate-x-full'
);
const leaveToClass = computed(() =>
  direction.value === 'left'
    ? 'transform -translate-x-full'
    : 'transform translate-x-full'
);

const beforeEnter = async () => {
  const c = container.value!;
  c.style.overflowY = 'hidden';
  c.style.height = `${c.offsetHeight}px`;
};

const onEnter = async (el: HTMLElement) => {
  await nextTick();
  const c = container.value!;
  c.style.height = `${el.offsetHeight}px`;
};

const afterLeave = (el: HTMLElement) => {
  container.value!.style.overflowY = 'unset';
  container.value!.style.height = 'unset';
};
</script>

<template>
  <div class="relative overflow-hidden transition-all" ref="container">
    <transition
      enter-active-class="transition-transform duration-300 ease-in-out absolute inset-x-0 top-0"
      :enter-from-class="enterFromClass"
      enter-to-class="transform translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in-out"
      leave-from-class="transform translate-x-0"
      :leave-to-class="leaveToClass"
      @before-enter="beforeEnter"
      @enter="onEnter"
      @after-enter="afterLeave"
    >
      <slot />
    </transition>
  </div>
</template>
