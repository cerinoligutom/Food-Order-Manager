import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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

  registerObservable: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(form: RegisterForm) {
    console.log(form);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.registerObservable = this.http.post('http://graphql-dev.fom.zeferinix.com/auth/signup', form, httpOptions).subscribe();

  }

  ngOnDestroy() {
    this.registerObservable.unsubscribe();
  }


}
