import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@auth0/auth0-vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/sites',
      name: 'sites',
      beforeEnter: authGuard,
      component: () => import('../views/ListSiteView.vue')
    },
    {
      path: '/sites/create/',
      name: 'create-site',
      component: () => import('../views/NewSiteView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/sites/edit/:id',
      name: 'edit-site',
      component: () => import('../views/NewSiteView.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../components/layout/NotFound.vue')
    }
  ]
})

export default router
