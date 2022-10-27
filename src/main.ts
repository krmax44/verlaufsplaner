import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import App from './App.vue';
import 'tailwindcss/tailwind.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

createApp(App).use(pinia).mount('#app');
