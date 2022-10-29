<script lang="ts" setup>
const onEnter = (el: HTMLElement) => {
  if (el.parentElement) {
    el.parentElement.style.minHeight = `${el.offsetHeight}px`;
  }
};

const beforeAfterEnter = (el: HTMLElement) => {
  if (el.parentElement) {
    el.parentElement.style.minHeight = `${el.parentElement.offsetHeight}px`;
  }
};

const afterLeave = (el: HTMLElement) => {
  if (el.parentElement) {
    el.parentElement.style.minHeight = 'initial';
  }
};
</script>

<template>
  <div class="relative overflow-hidden transition-all">
    <transition
      enter-active-class="transition-transform duration-300 ease-in-out absolute inset-x-0 top-0"
      enter-from-class="transform translate-x-full"
      enter-to-class="transform translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in-out"
      leave-from-class="transform translate-x-0"
      leave-to-class="transform -translate-x-full"
      @before-enter="beforeAfterEnter"
      @enter="onEnter"
      @after-enter="beforeAfterEnter"
      @after-leave="afterLeave"
    >
      <slot />
    </transition>
  </div>
</template>
