
import { Component } from '@angular/core';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginFormComponent {



  model = new Login('william@gmail.com', 'Chuck Overstreet');

  submitted = false;

  onSubmit() { this.submitted = true; }

}
