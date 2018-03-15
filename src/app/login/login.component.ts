import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmailValidator } from '@angular/forms';


class LoginForm {
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
  // dataModel: string = '';
  constructor() { }

  // form: LoginForm = new LoginForm();

  ngOnInit() {
  }


}
