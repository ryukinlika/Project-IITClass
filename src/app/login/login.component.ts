import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as CryptoJS from "crypto-js";
import { AuthAPIService } from "../_shared/services/auth-api.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  private data: any;
  submitError = false;
  httpErrorResponse: any;
  errormessage: string = "";

  constructor(
    private form: FormBuilder,
    public APIAuth: AuthAPIService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.form.group({
      user_name: ["", Validators.required],
      password: ["", Validators.required],
      remember_me: []
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }


    this.data = this.loginForm;
    // console.log(this.data.value);
    this.data.value.password = CryptoJS.SHA512(
      this.data.value.password
    ).toString();

    this.APIAuth.login(this.data.value).subscribe(
      result => {
        this.data = result;
        localStorage.setItem("profile", JSON.stringify(this.data));
        this.APIAuth.verify(this.data).subscribe(result => {
          this.data = result;
          this.APIAuth.setSession(this.data);
        });
        this.successLogin(this.data);
      },
      error => {
        console.log(error); this.displayError(error);
      }
    );
  }

  displayError(error: HttpErrorResponse) {
    this.submitError = true;
    this.errormessage = '';
    if (error.error.message != undefined) this.errormessage += error.error.message;
    for (let a in error.error.result) {
      this.errormessage += error.error.result[a];
      this.errormessage += "\n";
    }
  }

  successLogin(data: any) {
    localStorage.setItem("token", data.token);
    alert("Login successful!");
    this.router.navigateByUrl("/home");
  }

  get f() {
    return this.loginForm.controls;
  }
}
