import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CheckExpiresGuard implements CanActivate {
  constructor(
      private authService: AuthenticationService,
      private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
      const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser.timestamp) {
          const timestamp: any = currentUser.timestamp;
          if (new Date().valueOf() - timestamp > 5 * 60 * 1000) {
              this.authService.logout();
              this.router.navigate(['/login']);
              return false;
          }
      }
      return true;
  }
}
