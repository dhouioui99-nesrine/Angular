import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const actualRole = this.authService.getRole();

    if (actualRole === expectedRole) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}