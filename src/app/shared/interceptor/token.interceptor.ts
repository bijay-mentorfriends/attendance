import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService, private _router: Router) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const profile = this._auth.loadFromLocalStorage();
    let request = httpRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${profile.token}`,
      },
    });
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {

              // if( err.status === 403 ){
              //   let user = this._auth.loadFromLocalStorage();
              //   this._router.navigate(['company/'+user.companyCode]);
              // }
              
              return;
            }
            
            
            this._router.navigate(['login']);
          }
        }
      )
    );
  }
}
