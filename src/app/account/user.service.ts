import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.baseUrl;
  jwthelper = new JwtHelperService();
  headers = new HttpHeaders({
    'Authorization':`Bearer ${this.getToken()}` 
    });
  options = { headers: this.headers };

  constructor(private http: HttpClient) {}
  getToken(){
    return localStorage.getItem('token') || undefined;
  }
  getUserId() {
    return localStorage.getItem('id') || undefined;
  }
  getUserByToken(token:any){
    var decodedToken:any = this.jwthelper.decodeToken(token);
    var user = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    return user;
  }
  getUserByUsername(username: string):Observable<any> {
    return this.http.get(this.baseUrl + '/api/UserManager/get-user-by-username?userName='+username, this.options);
  }
  changePassword(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'/api/UserManager/change-password',data,this.options);
  }
  

  
}
