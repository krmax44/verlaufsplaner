<script lang="ts" setup>
import Planner from './components/Planner.vue';
</script>

<template>
  <div>
    <header>
      <div class="container mx-auto px-4 py-16">
        <h1 class="text-xl font-semibold text-purple-900">
          Studienverlaufsplaner
        </h1>
      </div>
    </header>
    <main>
      <div class="container mx-auto px-4">
        <planner />
      </div>
    </main>
  </div>
</template>
