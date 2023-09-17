import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { moduleManagementComposition } from '../shared/constants/composition.const';
import { IUser } from '../shared/interfaces/IUser.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseUrl;
  jwthelper = new JwtHelperService();

  userProfile: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({
    token: '',
    userId: '',
    email: '',
    pcode: '',
    amcode: ''
  });

  userMenus: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private _router: Router) { }

  isLoggedIn(): boolean {
    const user = this.loadFromLocalStorage();
    return !this.jwthelper.isTokenExpired(user.token);
  }

  hasPermission(url: string): boolean {
    let urlArr = url.split('/');
    const itemName = moduleManagementComposition;
    let user = this.loadFromLocalStorage();
    const allowed_modules = JSON.parse(window.atob(user.amcode));

    let allowed_menus = allowed_modules.map((item: any) => {
      // let arr = [];
      // if(item?.data[itemName]?.menus?.length > 0){
      //   let array = item?.data[itemName]?.menus;
      //   array.forEach((element:any) => {
      //     arr.push(element.path);
      //   });
      //   arr.push(item?.data[itemName]?.module_url);
      //   return arr;
      // }
      return item?.data[itemName]?.module_url
    });

    return allowed_menus.includes('/' + urlArr[1]);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + '/auth/login', model);
  }
  signup(model: any) {
    return this.http.post(this.baseUrl + '/auth/signup', model);
  }
  admin_signup(model: any) {
    return this.http.post(this.baseUrl + '/createAdminUser', model);
  }

  saveToLocalStorage(user: IUser) {
    localStorage.setItem('profile', JSON.stringify(user));
  }


  loadFromLocalStorage(): IUser {
    if (!this.userProfile.value.token) {
      let fromLocalStorage = localStorage.getItem('profile');
      if (!!fromLocalStorage) {
        let userInfo = JSON.parse(fromLocalStorage);
        this.userProfile.next(userInfo);
      }
    }
    return this.userProfile.value;
  }

  logout() {
    localStorage.removeItem('profile');
    this.userProfile.next({
      token: '',
      userId: '',
      email: '',
      pcode: '',
      amcode: '',
    });

    this._router.navigate(['login']);
  }


}
