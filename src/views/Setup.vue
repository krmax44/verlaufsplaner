<script lang="ts" setup>
import { useRouter } from 'vue-router';
import ActionLink from '../components/ActionLink.vue';
import Input from '../components/forms/Input.vue';
import ScaleTransition from '../components/utils/ScaleTransition.vue';
import SlideTransition from '../components/utils/SlideTransition.vue';
import { usePlannerStore } from '../store/plannerStore';

const plannerStore = usePlannerStore();
const router = useRouter();

const emptyProject = async () => {
  plannerStore.emptyProject();
  await router.push({ name: 'planner' });
};
</script>

<template>
  <section class="max-w-2xl">
    <h2 class="text-2xl">Willkommen bei studieren.lol!</h2>
    <p class="mt-2">Hier kannst du deinen Studienverlauf einfach planen.</p>

    <p class="mt-2">
      Achtung: dieses Tool befindet sich noch im frühen Entwicklungsstatus.
      Deine Planungsdaten könnten bei Updates verloren gehen.
    </p>

    <form
      class="rounded border border-gray-100 mt-8 divide-y divide-gray-100 bg-white dark:bg-black shadow dark:ring-4 ring-purple-50 ring-opacity-25"
    >
      <ScaleTransition>
        <div class="p-4" v-if="router.currentRoute.value.name !== 'setup'">
          <Input type="search" placeholder="Suche" class="" />
        </div>
      </ScaleTransition>

      <router-view v-slot="{ Component }">
        <SlideTransition>
          <component :is="Component" class="divide-y divide-gray-300" />
        </SlideTransition>
      </router-view>
    </form>

    <Teleport to="#app">
      <footer class="container mx-auto px-4 mt-16">
        <ActionLink href="https://krmax44.de/impressum.html" target="_blank">
          Impressum / Datenschutzerklärung
        </ActionLink>
      </footer>
    </Teleport>
  </section>
</template>
