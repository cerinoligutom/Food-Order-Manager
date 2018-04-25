import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

class RegisterForm {
  username = '';
  email = '';
  password = '';
  firstName = '';
  middleName = '';
  lastName = '';
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerObservable: Subscription = new Subscription();
  errors: any[] = [];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(form: RegisterForm) {
    console.log(form);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'appication/json'
      })
    };

    this.registerObservable = this.http
      .post('http://graphql-dev.fom.zeferinix.com/auth/signup', form, httpOptions)
      .subscribe(
        userId => {
          this.errors = [];
          this.snackBar.open('Successfully registered!', 'Dismiss', {
            duration: 5000
          });
          this.router.navigate(['/login', { fromRegistration: true }])
        },
        err => {
          this.errors = err.error;
          this.snackBar.open('Failed to register, see errors', 'Dismiss', {
            duration: 5000
          });
        }
      );
  }

  ngOnDestroy() {
    this.registerObservable.unsubscribe();
  }
}
