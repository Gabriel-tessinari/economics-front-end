import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreditCard from "../views/CreditCard.vue";
import Login from "../views/Login.vue";
import authService from "../services/auth.service";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: Login },
    { path: '/', component: Home, meta: { needsAuth: true } },
    { path: '/credit-card', component: CreditCard, meta: { needsAuth: true } }
  ]
});

router.beforeEach(async (to, from, next) => {
  if(to.meta?.needsAuth) {
    let isAuthenticated = await authService.authenticateTokenByEmail();
    if(!isAuthenticated) {
      next('/login');
    }
  }
  
  next();
});

export default router;