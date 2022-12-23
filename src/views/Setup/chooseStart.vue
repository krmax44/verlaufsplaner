<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { usePlannerStore } from '../../store/plannerStore';
import { Turnus } from '../../types';

const plannerStore = usePlannerStore();
const router = useRouter();

const setSemester = async (start: Turnus) => {
  plannerStore.reset();
  plannerStore.$patch({ settings: { start } });
  await router.push({ name: 'setup:university' });
};
</script>

<template>
  <div>
    <Button
      class="flex !p-4 !justify-start"
      @click.prevent="router.push({ name: 'planner' })"
      v-if="plannerStore.isSetup"
    >
      <p class="flex items-center">
        <i-material-symbols-undo class="mr-2 text-purple-900" />
        zurück zum bestehenden Projekt
      </p>
    </Button>

    <Button class="flex !p-4" @click.prevent="() => setSemester('WS')">
      <p class="flex items-center">
        <i-material-symbols-ac-unit class="mr-2 text-purple-900" />
        Start im Wintersemester
      </p>
      <div class="ml-auto self-center">
        <i-material-symbols-chevron-right />
      </div>
    </Button>

    <Button class="flex !p-4" @click.prevent="() => setSemester('SS')">
      <p class="flex items-center">
        <i-material-symbols-sunny class="mr-2 text-purple-900" />
        Start im Sommersemester
      </p>
      <div class="ml-auto self-center">
        <i-material-symbols-chevron-right />
      </div>
    </Button>
  </div>
</template>
