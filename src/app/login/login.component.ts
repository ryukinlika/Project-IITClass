import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { AuthAPIService } from '../_shared/services/auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup
  submitted = false;

  private data: any;

  constructor(
    private form: FormBuilder,
    public APIAuth: AuthAPIService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.form.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }


    this.data = this.loginForm

    this.data.value.password = CryptoJS.SHA512(this.loginForm.value.password).toString();
    this.APIAuth.login(this.data.value).subscribe(
      result => { 
        this.data = result; console.log(this.data); 
        this.APIAuth.verify(this.data).subscribe(
          result => {
            this.data = result; console.log(this.data)
            this.APIAuth.setSession(this.data);
          }
        );
        this.successLogin(this.data.token);
      },
      error => { console.log(error); }
    );
  }

  successLogin(token: string) {
    localStorage.setItem("token", token);
    // console.log(localStorage.getItem("token"));
    alert("Login successful!");
    this.router.navigateByUrl("/home");
  }

  get f() { return this.loginForm.controls; }

}
