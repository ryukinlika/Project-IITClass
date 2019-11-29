import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { AuthAPIService } from '../_shared/services/auth-api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  regisForm: FormGroup;
  submitted = false;
  loading = false;

  private data: any;

  constructor(
    private fb: FormBuilder,
    public APIAuth: AuthAPIService
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
    this.loading = true;
    if (this.regisForm.invalid) return;

    this.data = this.regisForm;

    this.data.value.password = CryptoJS.SHA512(this.regisForm.value.password).toString();
    console.log(JSON.stringify(this.data.value));
    this.APIAuth.register(this.data.value).subscribe(
      result => { this.data = result; console.log(this.data); },
      error => { console.log(error); }
    );

  }

  onReset() {
    this.submitted = false;
    this.regisForm.reset();
  }

  get f() { return this.regisForm.controls; }
}
