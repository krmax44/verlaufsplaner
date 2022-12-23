<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ActionLink from '../components/ActionLink.vue';
import SetupButton from './Setup/SetupButton.vue';
import SlideTransition from '../components/utils/SlideTransition.vue';

const router = useRouter();
const route = useRoute();

const to = ref('');
const from = ref('');
router.beforeEach((t, f) => {
  to.value = t.fullPath;
  from.value = f.fullPath;
});
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
      class="rounded border border-gray-100 mt-8 bg-white dark:bg-black shadow dark:ring-4 ring-purple-50 ring-opacity-25"
      @submit.prevent
    >
      <router-view v-slot="{ Component }">
        <SlideTransition
          :direction="from.length < to.length ? 'left' : 'right'"
        >
          <component :is="Component" class="divide-y divide-gray-300">
            <SetupButton
              @click="router.go(-1)"
              v-if="route.name !== 'setup'"
              :chevron="false"
            >
              <i-material-symbols-arrow-back class="mr-2 text-purple-900" />
              Schritt zurück
            </SetupButton>

            <!-- 
            TODO: add search
              <div class="p-4" v-if="route.name !== 'setup'">
                <Input type="search" placeholder="Suche" class="" />
              </div> 
            -->
          </component>
        </SlideTransition>
      </router-view>
    </form>

    <Teleport to="#app">
      <footer class="container mx-auto px-4 py-8 md:py-16 mt-auto">
        <ActionLink href="https://krmax44.de/impressum.html" target="_blank">
          Impressum / Datenschutzerklärung
        </ActionLink>
      </footer>
    </Teleport>
  </section>
</template>
