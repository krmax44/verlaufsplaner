<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { universities } from '../../data/university';
import { usePlannerStore } from '../../store/plannerStore';
import SetupButton from './SetupButton.vue';

const plannerStore = usePlannerStore();
const router = useRouter();

const emptyProject = async () => {
  const start =
    router.currentRoute.value.params.semester === 'summer' ? 'SS' : 'WS';
  plannerStore.emptyProject(start);
  await router.push({ name: 'planner' });
};
</script>

<template>
  <div>
    <slot />

    <SetupButton @click="emptyProject">
      <i-material-symbols-add class="mr-2 text-purple-900" />
      leeres Projekt
    </SetupButton>

    <SetupButton
      @click="
        $router.push({ name: 'setup:major', params: { slug: university.slug } })
      "
      v-for="university in universities"
      :key="university.slug"
    >
      <i-material-symbols-school class="mr-2 text-purple-900" />
      {{ university.name }}
    </SetupButton>
  </div>
</template>
