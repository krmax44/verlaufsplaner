<script lang="ts">
import { getMajors } from '../../data/university';

import { ref } from 'vue';
import { Major } from '../../types';
import { usePlannerStore } from '../../store/plannerStore';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const plannerStore = usePlannerStore();
    const route = useRoute();
    const router = useRouter();

    const loading = ref(false);
    const majors = ref([] as Major[]);

    const setData = (m: Major[]) => {
      majors.value.push(...m);
    };

    const setMajor = async (major: Major) => {
      await plannerStore.setMajor(route.params.slug as string, major.slug);
      await router.push({ name: 'planner' });
    };

    return { loading, majors, setData, setMajor };
  },
  beforeRouteEnter(to, from, next) {
    try {
      getMajors(to.params.slug as string).then((majors) =>
        next((vm: any) => vm.setData(majors))
      );
    } catch (e) {
      next();
    }
  },
  async beforeRouteUpdate(to) {
    const majors = await getMajors(to.params.slug as string);
    this.majors.push(...majors);
  },
  beforeRouteLeave() {
    this.loading = true;
  }
};
</script>

<template>
  <div>
    <Button
      class="flex !p-4"
      @click="setMajor(major)"
      v-for="major in majors"
      :key="major.slug"
      :disabled="loading"
    >
      <p>Informatik</p>
      <div class="ml-auto self-center">
        <i-material-symbols-chevron-right />
      </div>
    </Button>
  </div>
</template>
