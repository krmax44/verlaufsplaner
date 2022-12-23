import type { RouteRecordRaw } from 'vue-router';
import Planner from './views/Planner.vue';
import Setup from './views/Setup.vue';
import chooseUniversity from './views/Setup/chooseUniversity.vue';
import chooseMajor from './views/Setup/chooseMajor.vue';

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: Planner,
    name: 'planner'
  },
  {
    path: '/setup',
    component: Setup,
    children: [
      {
        path: '/',
        name: 'setup',
        component: chooseUniversity
      },
      {
        path: '/:slug/',
        name: 'setup:major',
        component: chooseMajor
      }
    ]
  }
];
