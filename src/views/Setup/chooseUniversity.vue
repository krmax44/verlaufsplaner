<script lang="ts" setup>
import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { universities } from '../../data/university';

const loading = ref(false);
onBeforeRouteLeave(() => {
  loading.value = true;
});
</script>

<template>
  <div>
    <Button
      class="flex !p-4"
      @click="
        $router.push({ name: 'setup:major', params: { slug: university.slug } })
      "
      v-for="university in universities"
      :key="university.slug"
      :disabled="loading"
    >
      <p>{{ university.name }}</p>
      <div class="ml-auto self-center">
        <i-material-symbols-chevron-right />
      </div>
    </Button>
  </div>
</template>
