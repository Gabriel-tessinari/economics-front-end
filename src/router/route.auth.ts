import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import authService from "../services/auth.service";

export default async function routeAuthentication(
  to: RouteLocationNormalized, 
  from: RouteLocationNormalized, 
  next: NavigationGuardNext
) {
  if(to.meta.needsAuth) {
    let isAuthenticated = await authService.authenticateTokenByEmail();
    if(!isAuthenticated) next('/login');
  }
  
  next();
}