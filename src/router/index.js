import { createWebHistory, createRouter } from "vue-router";

const history = createWebHistory();

const routes = [
  { path: '/bubble-turntable/', component: () => import('../views/Home.vue') },
  { path: '/bubble-turntable/stars/', component: () => import('../components/Stars.vue') }
];

const router = createRouter({ history, routes });

export default router;
