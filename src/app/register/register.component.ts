import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  regisForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.regisForm = this.fb.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      bdate: ['', Validators.required],
      photo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.regisForm.invalid) return;
    console.log(JSON.stringify(this.regisForm.value));
  }

  onReset() {
    this.submitted = false;
    this.regisForm.reset();
  }

  get f() { return this.regisForm.controls; }
}
