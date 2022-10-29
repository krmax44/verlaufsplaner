<script lang="ts" setup>
import Input from '../components/forms/Input.vue';
import SlideTransition from '../components/utils/SlideTransition.vue';
</script>

<template>
  <section class="max-w-2xl">
    <h2 class="text-2xl">Willkommen bei studieren.lol!</h2>
    <p class="mt-2">
      Hier kannst du deinen Studienverlauf einfach planen. Wähle eine passende
      Vorlage zu deiner Uni und deinem Studiengang, oder starte ein leeres
      Projekt.
    </p>

    <form class="rounded border border-gray-100 mt-8 divide-y divide-gray-100">
      <div class="p-4">
        <Input type="search" placeholder="Suche" class="" />
      </div>

      <router-view v-slot="{ Component }">
        <SlideTransition>
          <component :is="Component" class="divide-y divide-gray-100" />
        </SlideTransition>
      </router-view>
    </form>
  </section>
</template>
