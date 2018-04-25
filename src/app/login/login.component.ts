import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmailValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import { AuthService } from '../core/services';
import { MatSnackBar } from '@angular/material';


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
  fromRegistration: boolean = false;
  errorMessage: any = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    if (this.route.snapshot.paramMap.get('fromRegistration')) {
      this.fromRegistration = true;
    }
  }

  onSubmit(form: LoginForm) {

    this.loginSubscription = this.authService.login(form).subscribe(token => {
      this.snackBar.open('Successfully logged in!', 'Dismiss', {
        duration: 5000
      });
      localStorage.setItem('token', token);

      this.router.navigate(['/dashboard']);
    }, err => {
      this.fromRegistration = false;
      this.snackBar.open(err.error.message, 'Dismiss', {
        duration: 5000
      });
      this.errorMessage = err.error.message;
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
