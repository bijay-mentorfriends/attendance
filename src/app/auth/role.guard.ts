import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor( private _router: Router, private _auth: AuthService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this._auth.isLoggedIn() && !this._auth.hasPermission(state?.url)){
      this._router.navigate(['/not-found']);
      return false;
    }
    return true;
  }
}
