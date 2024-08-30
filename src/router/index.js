import { createWebHistory, createRouter } from "vue-router";

const history = createWebHistory();

const routes = [
  { path: '/', meta: {title: '小王子的唱片机'}, component: () => import('../views/Home.vue') },
  { path: '/sorrow', meta: {title: 'void'}, component: () => import('../views/Sorrow.vue') },
  { path: '/stars', component: () => import('../components/Stars.vue') },
  { path: '/rose', component: () => import('../components/Rose.vue') }
];

const router = createRouter({ history, routes });

router.beforeEach((to) => {
  document.title = `${to.meta.title}`;
});

export default router;
