import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import MainView from '@/views/MainView.vue'
import AccountView from '@/views/AccountView.vue'
import CreditCardView from '@/views/CreditCardView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path: '/card',
    name: 'card',
    component: CreditCardView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
