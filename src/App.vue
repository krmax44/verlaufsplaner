<script lang="ts" setup>
import Header from './components/Header.vue';
import ScaleTransition from './components/utils/ScaleTransition.vue';
</script>

<template>
  <Header />

  <main>
    <div class="container mx-auto px-4">
      <ScaleTransition>
        <router-view />
      </ScaleTransition>
    </div>
  </main>
</template>
