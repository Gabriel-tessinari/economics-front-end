import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import authService from "../services/auth.service";
import { loginStore } from "../stores/login.store";

export default async function routeAuthentication(
  to: RouteLocationNormalized, 
  from: RouteLocationNormalized, 
  next: NavigationGuardNext
) {
  if(to.meta.needsAuth) {
    try {
      let isAuthenticated = await authService.authenticateTokenByEmail();
      if(!isAuthenticated) {
        loginStore.value.setEmail('');
        loginStore.value.setToken('');
        next('/login');
      }
    } catch(error: any) {
      console.log("🚀 ~ error:", error);
      loginStore.value.setEmail('');
      loginStore.value.setToken('');
      next('/login');
    }
  }
  
  next();
}