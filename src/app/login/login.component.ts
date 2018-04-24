import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import { AuthService } from '../core/services';


class LoginForm {
  username = '';
  email = '';
  password = '';
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }


  ngOnInit() {
  }

  onSubmit(form: LoginForm) {

    this.loginSubscription = this.authService.login(form).subscribe(token => {
      localStorage.setItem('token', token);

      this.router.navigate(['/dashboard']);

      // todo is authenticated
      // this.authService.isLoggedIn().subscribe(res => {
      //   console.log(res);
      // })
    });

  }

  ngOnDestroy() {
    console.log('on destroy login screen');
    this.loginSubscription.unsubscribe();
  }

  goToRegistrationPage() {
    this.router.navigate(['/register']);
  }
}
