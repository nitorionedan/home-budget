import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: () => import("@/views/ListView.vue")
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('@/views/ChartView.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import("@/views/SettingView.vue")
    },
  ]
})

export default router
