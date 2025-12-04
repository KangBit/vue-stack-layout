import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/page-a/:component?',
      name: 'pageA',
      component: () => import('@/pages/pageA.vue'),
    },
    {
      path: '/page-b/:component?',
      name: 'pageB',
      component: () => import('@/pages/pageB.vue'),
    },
  ],
})

export default router
