import { createRouter, createWebHistory } from 'vue-router'

import Layout from "@/views/layout/layout.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      {
        path: 'score',
        name: 'score',
        meta: {
          title: "成绩管理"
        },
        component: () => import('../views/scores/index.vue')
      },
    ],
    redirect: { path: '/score' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/index.vue')
  },
]
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export const menuRoutes = routes.find(i => i.name === "home")?.children

