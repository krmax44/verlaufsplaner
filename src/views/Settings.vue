<script lang="ts" setup>
import { ref } from 'vue';
import { Promised } from 'vue-promised';
import ActionLink from '../components/ActionLink.vue';
import Dialog from '../components/Dialog.vue';
import Button from '../components/forms/Button.vue';
import { plannerStoreSchema } from '../schemas';
import { usePlannerStore } from '../store/plannerStore';
import { version } from '../../package.json';

const isOpen = ref(false);

const plannerStore = usePlannerStore();
const settingsExport = JSON.stringify(plannerStore.$state);
const settingsBlob = new Blob([settingsExport], { type: 'application/json' });
const downloadLink = URL.createObjectURL(settingsBlob);

const importFile = ref<HTMLInputElement>();
const importStatus = ref<Promise<boolean> | undefined>();

const importBackup = () => {
  importStatus.value = new Promise(async (resolve, reject) => {
    const json = await importFile?.value?.files?.[0]?.text();
    if (!json) return reject();

    try {
      const data = JSON.parse(json);
      const safeData = plannerStoreSchema.parse(data);
      if (safeData.version !== version) return reject();
      plannerStore.$patch(data);
    } catch {
      return reject();
    }

    isOpen.value = false;
    resolve(true);
  });
};
</script>

<template>
  <Dialog :open="isOpen" @close="isOpen = false">
    <template #title> Einstellungen </template>

    <template #body>
      <ul class="space-y-4">
        <li>
          <p class="text-sm mb-1">Backup</p>
          <div class="flex space-x-4">
            <ActionLink :href="downloadLink" download="settings.json">
              <i-material-symbols-download /> Exportieren
            </ActionLink>

            <ActionLink button aria-hidden="true" @click="importFile?.click()">
              <i-material-symbols-upload /> Importieren
            </ActionLink>

            <form class="sr-only" @submit="importBackup">
              <input
                type="file"
                ref="importFile"
                aria-label="Zu importierende Backup-Datei"
                @change="importBackup"
              />

              <button type="submit">Importieren</button>
            </form>
          </div>

          <Promised :promise="importStatus" v-if="importStatus !== undefined">
            <template #rejected>
              <p class="text-red-600 text-sm mt-2">
                Die Datei konnte nicht importiert werden.
              </p>
            </template>

            <template></template>
          </Promised>
        </li>
        <li>
          <p class="text-sm mb-1">
            Verlaufsplan zurücksetzen und von vorne beginnen
          </p>
          <ActionLink :to="{ name: 'setup' }">
            <i-material-symbols-restart-alt />
            zur Einrichtung
          </ActionLink>
        </li>
      </ul>
    </template>
  </Dialog>

  <Button rounded primary @click="isOpen = true">
    <i-material-symbols-settings class="w-8 h-8" />
    <span class="sr-only">Einstellungen</span>
  </Button>
</template>
