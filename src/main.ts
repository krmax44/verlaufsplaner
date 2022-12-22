import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import App from './App.vue';
import { usePlannerStore } from './store/plannerStore';
import { routes } from './routes';
import { version } from '../package.json';
import './style.css';

const app = createApp(App);

if (localStorage.getItem('version') !== version) {
  localStorage.clear();
  localStorage.setItem('version', version);
}

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const plannerStore = usePlannerStore();

router.beforeEach(async (to) => {
  if (!plannerStore.isSetup && !to.name?.toString().startsWith('setup')) {
    return { name: 'setup' };
  }
});

app.use(router);
app.mount('#app');
