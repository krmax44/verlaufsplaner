import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';
import 'tailwindcss/tailwind.css';
import App from './App.vue';

const pinia = createPinia();
const installPersistedStatePlugin = createPersistedStatePlugin({
  overwrite: true
});
pinia.use((context) => installPersistedStatePlugin(context));

createApp(App).use(pinia).mount('#app');
