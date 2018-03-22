import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

const AUTH_CONFIG = {
    BASE_URL: 'http://graphql-dev.fom.zeferinix.com/auth/'
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


  login(form) {
    return this.http.post(AUTH_CONFIG.BASE_URL + 'login', form, httpOptions)
      .map((res: any) => res.token);
  }

  logout() {

  }

  isLoggedIn() {
    return this.http.get(AUTH_CONFIG.BASE_URL + 'isAuthenticated', httpOptions);
  }

  isSuperAdmin() {
    return true;
  }
}
