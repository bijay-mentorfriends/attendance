import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

const baseUrl = environment.baseUrl;

const initialState: any = {
  itemData: [],
};

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient, private _auth: AuthService) {}

  getAll(itemName: string, pageNumer = 1, inpage = 1000): Observable<any> {
    return this.http.get(
      baseUrl +
        `/concepts/list?type=${itemName}&page=${pageNumer}&inpage=${inpage}`
    );
  }

  getById(id: number): Observable<any> {
    return this.http.post(baseUrl + `/concepts/${id}`, {});
  }

  getByIdClean(id: number): Observable<any> {
    return this.http.get(baseUrl + `/edit-api-clean?id=${id}`);
  }

  getALlWithoutAuth(itemName: string, pageNumber = 1, inpage = 1000): Observable<any> {
    return this.http.get(
      baseUrl + `/list-api-clean?type=${itemName}&page=${pageNumber}&inpage=${inpage}`
    );
  }

  create(data: any, itemName: string) {
    return this.http.post(baseUrl + `/concepts`, data);
  }

  noAuthCreate(data: any, itemName: string) {
    return this.http.post(baseUrl + '/createApiWithoutAuth', data);
  }

  update(data: any): Observable<any> {
    return this.http.post(baseUrl + `/concepts/update`, data);
  }

  uploadImage(data: any): Observable<any> {
    return this.http.post(baseUrl + `/upload/images`, data);
  }

  uploadFile(data: any): Observable<any> {
    return this.http.post(baseUrl + `/upload/files`, data);
  }

  getAllUsers(role = 'ROLE_USER'): Observable<any> {
    return this.http.get(baseUrl + `/get-user-by-roles?role=${role}`);
  }

  getProfile(id: string) {
    return this.http.get(baseUrl + `/edit-api-clean?id=${id}`);
  }

  getAllRoles(): Observable<any> {
    return this.http.get(baseUrl + `/roles/list`);
  }

  getUserAccessComposition(compId: any): Observable<any> {
    return this.http.get(baseUrl + `/get/access?id=${compId}`);
  }

  userAccessComposition(data: any): Observable<any> {
    return this.http.post(baseUrl + `/access`, data);
  }

  createRole(role: any): Observable<any> {
    return this.http.post(baseUrl + `/roles/create`, role);
  }

  addPermission(role: any): Observable<any> {
    return this.http.post(baseUrl + `/permissions/add`, role);
  }
  search(
    keyword: string,
    type: string = 'title',
    compositionName = 'articleDetails',
    inpage = 100
  ): Observable<any> {
    return this.http.get(
      baseUrl +
        `/searchApi?composition=${compositionName}&search=${keyword}&type=${type}&inpage=${inpage}`
    );
  }
}
