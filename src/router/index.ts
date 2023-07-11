import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CreditCard from "../views/CreditCard.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import routeAuthentication from "./route.auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home, meta: { needsAuth: true } },
    { path: '/credit-card', component: CreditCard, meta: { needsAuth: true } },
    { path: '/login', component: Login, meta: { needsAuth: false } },
    { path: '/:pathMatch(.*)*', component: NotFound, meta: { needsAuth: false } }
  ]
});

router.beforeEach(routeAuthentication);

export default router;