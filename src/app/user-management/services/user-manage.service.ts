import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { IUserDetails } from '../../interfaces/IUserDetails';



@Injectable({
  providedIn: 'root'
})
export class userManageServices {

  baseUrl: string = environment.baseUrl;
  jwthelper = new JwtHelperService();

  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.getToken()}`
  });
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getToken() {
    return localStorage.getItem('token');
  }
  getUserByToken(token: any): string {
    var decodedToken: any = this.jwthelper.decodeToken(token);
    return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];;
  }
  getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/UserManager/get-users-list', this.options);
  }
  getUserById(id: any): Observable<any> {
    return this.http.get(this.baseUrl + '/api/UserManager/get-user-by-id?Id=' + id, this.options);
  }
  getAllRoles(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/UserManager/get-roles-list', this.options);
  }
  addNewUser(data: IUserDetails): Observable<any> {
    return this.http.post(this.baseUrl + '/api/UserManager/create-user', data, this.options);
  }
  update(data: IUserDetails): Observable<any> {
    return this.http.put(this.baseUrl + '/api/UserManager/update-user', data, this.options);
  }
  deleteUserById(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + '/api/UserManager/delete-user?Id=' + id, this.options);
  }
  resetPassword(id: any, data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/api/UserManager/admin-password-reset?Id=' + id, data, this.options);
  }
}
