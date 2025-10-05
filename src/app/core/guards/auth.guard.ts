import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
// Replace this with your real auth service
private isLoggedIn() { 
    return !!localStorage.getItem('token'); 
}


constructor(private router: Router) {}


canActivate(): Observable<boolean | UrlTree> {
const ok = this.isLoggedIn();
if (!ok) {
return of(this.router.parseUrl('/login'));
}
return of(true);
}
}