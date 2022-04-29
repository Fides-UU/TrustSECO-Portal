import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Packages from '../views/Packages.vue';
import Package from '../views/Package.vue';
import AddPackage from '../views/AddPackage.vue';
import DltStatus from '../views/DltStatus.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/packages',
    name: 'View Packages list',
    component: Packages,
    props: true,
  },
  {
    path: '/package/:id',
    name: 'Package',
    component: Package,
    props: true,
  },
  {
    path: '/add-package',
    name: 'Add Package',
    component: AddPackage,
    props: true,
  },
  {
    path: '/dlt',
    name: 'Dlt Status',
    component: DltStatus,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
