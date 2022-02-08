import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class HoroscopeService {
  jwthelper = new JwtHelperService();
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}`,
  });
  options = { headers: this.headers };

  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('token');
  }
  getUserByToken(token: any) {
    var decodedToken: any = this.jwthelper.decodeToken(token);
    var user =
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];
    return user;
  }

  getHoroscope(data: any): Observable<any> {
    return this.http.post(
      baseUrl + '/api/ClientHoroscopeDetails/get-current-horoscope-details',
      data
    );
  }

  updateHoroscope(data: any): Observable<any> {
    return this.http.put(
      baseUrl + '/api/ClientHoroscopeDetails/set-user-horoscope-language',
      data,
      this.options
    );
  }
}
