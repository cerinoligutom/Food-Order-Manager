import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '@app/services';

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
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(form: RegisterForm) {
    this.registerObservable = this.authService.signup(form)
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
