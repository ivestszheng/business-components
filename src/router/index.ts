import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/rolling-up-list',
    name: 'RollingUpList',
    component: () => import('@/views/RollingUpListView/index.vue'),
  },
  {
    path: '/tree-in-select',
    name: 'TreeInSelect',
    component: () => import('@/views/TreeInSelect/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
