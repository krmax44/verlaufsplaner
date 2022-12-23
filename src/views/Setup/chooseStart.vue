<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { usePlannerStore } from '../../store/plannerStore';
import { Turnus } from '../../types';
import SetupButton from './SetupButton.vue';

const plannerStore = usePlannerStore();
const router = useRouter();

const setSemester = async (start: Turnus) => {
  const semester = start === 'WS' ? 'winter' : 'summer';
  await router.push({ name: 'setup:university', params: { semester } });
};
</script>

<template>
  <div>
    <slot />

    <SetupButton
      @click="router.push({ name: 'planner' })"
      v-if="plannerStore.isSetup"
      :chevron="false"
    >
      <i-material-symbols-arrow-back class="mr-2 text-purple-900" />
      zurück zum bestehenden Projekt
    </SetupButton>

    <SetupButton @click="() => setSemester('WS')">
      <i-material-symbols-ac-unit class="mr-2 text-purple-900" />
      Start im Wintersemester
    </SetupButton>

    <SetupButton @click="() => setSemester('SS')">
      <i-material-symbols-sunny class="mr-2 text-purple-900" />
      Start im Sommersemester
    </SetupButton>
  </div>
</template>
