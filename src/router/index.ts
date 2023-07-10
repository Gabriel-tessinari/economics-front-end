import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreditCard from "../views/CreditCard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/credit-card', component: CreditCard }
  ]
});

export default router;