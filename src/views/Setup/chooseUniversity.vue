<script lang="ts" setup>
import { ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { universities } from '../../data/university';
import { usePlannerStore } from '../../store/plannerStore';

const plannerStore = usePlannerStore();
const router = useRouter();

const loading = ref(false);
onBeforeRouteLeave(() => {
  loading.value = true;
});

const emptyProject = async () => {
  plannerStore.emptyProject();
  await router.push({ name: 'planner' });
};
</script>

<template>
  <div>
    <Button class="flex !p-4" @click.prevent="emptyProject" :disabled="loading">
      <p class="flex items-center">
        <i-material-symbols-add class="mr-2 text-purple-900" />
        leeres Projekt
      </p>
      <div class="ml-auto self-center">
        <i-material-symbols-chevron-right />
      </div>
    </Button>

    <Button
      class="flex !p-4"
      @click.prevent="
        $router.push({ name: 'setup:major', params: { slug: university.slug } })
      "
      v-for="university in universities"
      :key="university.slug"
      :disabled="loading"
    >
      <p class="flex items-center">
        <i-material-symbols-school class="mr-2 text-purple-900" />
        {{ university.name }}
      </p>
      <div class="ml-auto self-center">
        <i-material-symbols-chevron-right />
      </div>
    </Button>
  </div>
</template>
