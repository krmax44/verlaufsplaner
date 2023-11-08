import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/verlaufsplaner/',
  plugins: [
    Vue(),
    Components({
      resolvers: [IconsResolver()]
    }),
    Icons({})
  ]
});
