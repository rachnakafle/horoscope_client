import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class userRoleServices {

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
  getAllRoles(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/UserManager/get-roles-list', this.options);
  }
  getRoleById(id: any): Observable<any> {
    return this.http.get(this.baseUrl + '/api/UserManager/get-role-by-id?Id=' + id, this.options);
  }
  create(data: string): Observable<any> {
    console.log(`Bearer ${this.getToken()}`);
    return this.http.post(this.baseUrl + '/api/UserManager/add-role?roleName=' + data, '', this.options);
  }
  update(id: string, data: any): Observable<any> {
    return this.http.put(this.baseUrl + '/api/UserManager/update-role?Id=' + id, data, this.options);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + '/api/UserManager/delete-role?Id=' + id, this.options);
  }

}
