<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription
} from '@headlessui/vue';
import Button from './forms/Button.vue';

const { open } = defineProps<{ open: boolean }>();

const emit = defineEmits(['open', 'close']);

const openModal = () => emit('open');
const closeModal = () => emit('close');
</script>

<template>
  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-40">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-90 dark:bg-gray-900"
        />
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
              class="w-full max-w-lg transform overflow-hidden rounded-t-2xl md:rounded-2xl bg-white dark:bg-gray-900 p-6 text-left shadow-xl transition-all"
            >
              <div class="flex">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 flex-1 self-center"
                >
                  <slot name="title" />
                </DialogTitle>

                <div class="ml-auto">
                  <Button @click="closeModal" rounded>
                    <i-material-symbols-close />
                    <span class="sr-only">Schließen</span>
                  </Button>
                </div>
              </div>

              <div class="mt-2 space-y-4">
                <DialogDescription>
                  <slot name="description" />
                </DialogDescription>

                <div>
                  <slot name="body" />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
