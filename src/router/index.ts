import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/page-a',
      name: 'pageA',
      component: () => import('@/pages/pageA.vue'),
    },
    {
      path: '/page-b',
      name: 'pageB',
      component: () => import('@/pages/pageB.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach', to, from)
})

export default router
