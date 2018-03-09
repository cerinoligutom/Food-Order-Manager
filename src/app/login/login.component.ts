import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

class LoginForm{
  username: string = '';
  email: string = '';
  password: string = '';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dataModel: string = '';

  constructor(private router: Router) { }

  form: LoginForm = new LoginForm();

  ngOnInit() {
  }

  onSubmit(form: LoginForm){
    console.log(form);
    this.router.navigate(['/user-profile']);
  }

}
