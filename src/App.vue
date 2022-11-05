<script lang="ts" setup>
import Header from './components/Header.vue';
import ScaleTransition from './components/utils/ScaleTransition.vue';
</script>

<template>
  <Header />

  <main>
    <div class="container mx-auto px-4">
      <router-view v-slot="{ Component }">
        <ScaleTransition>
          <component :is="Component" />
        </ScaleTransition>
      </router-view>
    </div>
  </main>
</template>
