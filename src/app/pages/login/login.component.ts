import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/shared/interfaces/IUser.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  notLoading: boolean = true;

  jwthelper = new JwtHelperService();
  currentUser!: IUser;
  errorMessage!: string;
  loginError: Boolean = false;


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    private _auth: AuthService,
    private _router: Router,

  ) { }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    console.log(1);

    var login_model = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    if (!this.loginForm.invalid) {
      this.notLoading = false;
      let authFlow = this._auth.login(login_model);
      authFlow.subscribe({
        next: (x: any) => {
          console.log(x);
          let permissions = x?.data?.roles;
          let string_permissions = JSON.stringify(permissions);
          let encoded_permissions = window.btoa(string_permissions);

          /*
          Role permissions are stored in: pcode, using base64 encoding
          Allowed Menus is expected to be stored in: amcode, using base64 encoding
          */

          let userProfile: IUser = {
            token: x.data.token,
            email: x?.data?.email,
            userId: x.data.entity[0].id,
            pcode: encoded_permissions,
            amcode: ''
          }

          this._auth.saveToLocalStorage(userProfile);

          this._router.navigate(['/home']);
          this.notLoading = true;
        },
        error: (err: any) => {
          this.loginError = true;
          this.errorMessage = err.error.message;
          this.notLoading = true;
        }
      });
    }


  }

}
