<script lang="ts" setup>
import Header from './components/Header.vue';
</script>

<template>
  <Header />

  <main>
    <div class="container mx-auto px-4">
      <router-view />
    </div>
  </main>
</template>
