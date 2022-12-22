<script lang="ts" setup>
import { useRouter } from 'vue-router';
import ActionLink from '../components/ActionLink.vue';
import Input from '../components/forms/Input.vue';
import SlideTransition from '../components/utils/SlideTransition.vue';
import { usePlannerStore } from '../store/plannerStore';

const plannerStore = usePlannerStore();
const router = useRouter();

const emptyProject = () => {
  plannerStore.$patch({ isSetup: true, modules: [] });
  router.push({ name: 'planner' });
};
</script>

<template>
  <section class="max-w-2xl">
    <h2 class="text-2xl">Willkommen bei studieren.lol!</h2>
    <p class="mt-2">
      Hier kannst du deinen Studienverlauf einfach planen. Wähle eine passende
      Vorlage zu deiner Uni und deinem Studiengang,
      <ActionLink href="#!" @click.prevent="emptyProject"
        >oder starte ein leeres Projekt</ActionLink
      >.
    </p>

    <p class="mt-2" v-if="plannerStore.isSetup">
      Du kannst auch
      <ActionLink :to="{ name: 'planner' }"
        >zu deinem bestehenden Plan zurückkehren</ActionLink
      >.
    </p>

    <p class="mt-2">
      Achtung: dieses Tool befindet sich noch im frühen Entwicklungsstatus.
      Deine Planungsdaten könnten bei Updates verloren gehen.
    </p>

    <form
      class="rounded border border-gray-100 mt-8 divide-y divide-gray-100 bg-white dark:bg-black shadow dark:ring-4 ring-purple-50 ring-opacity-25"
    >
      <div class="p-4">
        <Input type="search" placeholder="Suche" class="" />
      </div>

      <router-view v-slot="{ Component }">
        <SlideTransition>
          <component :is="Component" class="divide-y divide-gray-300" />
        </SlideTransition>
      </router-view>
    </form>
  </section>
</template>
