import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/components/layout/Layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'Home' },
  },
  {
    name: 'app',
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'packages/',
        name: 'Package List',
        component: () => import('@/views/Packages.vue'),
        props: true,
      },
      {
        path: 'package/:name/',
        name: 'Package',
        component: () => import('@/views/Package.vue'),
        props: true,
        children: [
          {
            path: 'version/:version/',
            name: 'Package with Version',
            component: () => import('@/views/Package.vue'),
            props: true,
          },
        ],
      },
      {
        path: 'metrics/',
        name: 'Metrics',
        component: () => import('@/views/Metrics.vue'),
      },
      {
        path: 'user/settings/',
        name: 'Settings',
        component: () => import('@/views/UserSettings.vue'),
        props: true,
      },
      {
        path: 'add-package/',
        name: 'Add Package',
        component: () => import('@/views/AddPackage.vue'),
        props: true,
      },
      {
        path: 'search/',
        name: 'SearchSECO',
        component: () => import('@/views/search/Miners.vue'),
        props: true,
      },
      {
        path: 'search/add-miner/',
        name: 'SearchSECO Add Miner',
        component: () => import('@/views/search/AddMiner.vue'),
        props: true,
      },
      {
        path: 'search/miner/:id',
        name: 'SearchSECO Miner',
        component: () => import('@/views/search/Miner.vue'),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  // linkActiveClass: 'router-link-active',
  routes,
});

export default router;

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */
