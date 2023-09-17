import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _auth: AuthService) { }
  canActivate() {
    if (!this._auth.isLoggedIn()) {
      this._router.navigate(['login']);
      return false;
    }

    return true;
  }
}
