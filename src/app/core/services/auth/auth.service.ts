import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

const AUTH_CONFIG = {
  BASE_URL: 'http://graphql-dev.fom.zeferinix.com/auth/'
  // BASE_URL: 'http://localhost:3000/auth/'
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(form) {
    return this.http
      .post(AUTH_CONFIG.BASE_URL + 'login', form, httpOptions)
      .map((res: any) => res.token);
  }

  signup(form) {
    return this.http
      .post(AUTH_CONFIG.BASE_URL + 'signup', form, httpOptions)
      .map((res: any) => res);
  }

  logout() {
    return new Promise((resolve, reject) => {
      localStorage.clear()
      resolve();
    });
  }

  isLoggedIn() {
    return this.http.get(AUTH_CONFIG.BASE_URL + 'isAuthenticated', httpOptions);
  }

  isSuperAdmin() {
    return true;
  }
}
