<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue';
import Button from './Button.vue';

const { open } = defineProps<{ open: boolean }>();

const emit = defineEmits(['open', 'close']);

const openModal = () => emit('open');
const closeModal = () => emit('close');
</script>

<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-end md:items-center justify-center md:p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-t-2xl md:rounded-2xl bg-white p-6 text-left shadow-xl transition-all"
            >
              <div class="flex">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 flex-1"
                >
                  <slot name="title" />
                </DialogTitle>

                <div class="ml-auto">
                  <Button @click="closeModal" class="!rounded-full">
                    <i-material-symbols-close />
                    <span class="sr-only">Schließen</span>
                  </Button>
                </div>
              </div>
              <div class="mt-2">
                <slot name="body" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
