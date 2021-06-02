import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { AuthAPIService } from '../_shared/services/auth-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  regisForm: FormGroup;
  submitted = false;
  loading = false;
  submitError = false;
  httpErrorResponse: any;
  errormessage: string = "";


  private data: any;

  constructor(
    private fb: FormBuilder,
    public authAPI: AuthAPIService,
    private router: Router
  ) { }

  ngOnInit() {
    this.regisForm = this.fb.group({
      user_name: ['', Validators.required],
      telepon: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nama_lengkap: ['', Validators.required],
      alamat: ['', Validators.required],
      tanggal_lahir: ['', Validators.required],
      foto: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.regisForm.invalid) return;
    this.loading = true;

    this.data = this.regisForm;

    this.data.value.password = CryptoJS.SHA512(this.regisForm.value.password).toString();
    // console.log(JSON.stringify(this.data.value));
    this.authAPI.register(this.data.value).subscribe(
      result => { this.data = result; this.redirectToLogin(); },
      error => { console.log(error); this.displayError(error); }
    );
  }

  onReset() {
    this.submitted = false;
    this.loading = false;
    this.regisForm.reset();
  }

  displayError(error: HttpErrorResponse) {
    this.submitError = true;
    this.errormessage = '';
    if (error.error.message != undefined) this.errormessage += error.error.message;
    for (let a in error.error.result) {
      this.errormessage += error.error.result[a];
      this.errormessage += "\n";
    }
    this.loading = false;
  }

  redirectToLogin() {
    alert("Register successful! You'll be redirected to the login page.");
    this.router.navigateByUrl("/login");
  }

  get f() { return this.regisForm.controls; }
}
