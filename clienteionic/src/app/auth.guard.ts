import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const routeConfig = next.routeConfig;
    const isDeveloperRoute = routeConfig && routeConfig.path === 'encuesta';
    if (this.authService.getAuthStatus() && (!isDeveloperRoute || this.authService.getDeveloperStatus())) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}