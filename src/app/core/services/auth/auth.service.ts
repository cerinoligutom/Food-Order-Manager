import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

const AUTH_CONFIG = {
    BASE_URL: 'http://graphql-dev.fom.zeferinix.com/auth/'
    // BASE_URL: 'http://192.168.1.35:3000/auth/'
}

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
// };

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

const httpOptions = {
  headers: headers,
  // withCredentials: true
};

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


  login(form){
    return this.http.post(AUTH_CONFIG.BASE_URL+'login', form, httpOptions);
  }

  logout(){

  }

  isLoggedIn(){
    return this.http.get(AUTH_CONFIG.BASE_URL+'isAuthenticated', httpOptions);
  }

  isSuperAdmin(){
    return true;
  }
}
