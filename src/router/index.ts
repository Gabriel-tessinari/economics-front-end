import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import MainView from '@/views/main/MainView.vue'
import AccountView from '@/views/account/AccountView.vue'
import CreditCardView from '@/views/creditCard/CreditCardView.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'main', component: MainView },
  { path: '/account', name: 'account', component: AccountView },
  { path: '/card', name: 'card', component: CreditCardView }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router
