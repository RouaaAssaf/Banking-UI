import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (!isLoggedIn) {
      // 🧠 'replaceUrl: true' prevents back button from returning to protected routes
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }
    return true;
  }
}
