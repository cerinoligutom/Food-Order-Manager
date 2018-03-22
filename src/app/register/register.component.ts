import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

class RegisterForm {
  username: string = '';
  email: string = '';
  password: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerObservable: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(form: RegisterForm){
    console.log(form);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.registerObservable = this.http.post('http://graphql-dev.fom.zeferinix.com/auth/signup', form, httpOptions).subscribe();

  }

  ngOnDestroy(){
    this.registerObservable.unsubscribe();
  }


}
