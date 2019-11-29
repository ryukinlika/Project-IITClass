import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { AuthAPIService } from '../_shared/services/auth-api.service';

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
    public APIAuth: AuthAPIService
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
    console.log(this.data)
    this.APIAuth.login(this.data.value).subscribe(
      result => { this.data = result; console.log(this.data); },
      error => { console.log(error); }
    );
  }

  get f() { return this.loginForm.controls; }

}
