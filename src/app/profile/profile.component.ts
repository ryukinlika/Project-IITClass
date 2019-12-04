import { Component, OnInit } from '@angular/core';
import { AuthAPIService } from '../_shared/services/auth-api.service';
import { serverResponse } from '../_shared/models/serverResponse';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private user?: any = JSON.parse(localStorage.getItem("user"));
  private data: any;
  private token = localStorage.getItem("token");
  private response: any;
  private edit: boolean;

  private fullname: string = this.user.result.user.nama_lengkap;
  private address: string = this.user.result.user.alamat;
  private bdate: string = this.user.result.user.tanggal_lahir;
  private photo: string = this.user.result.user.foto;
  private password: string = "";
  private SHApassword: string = "";


  constructor(
    private authAPI: AuthAPIService
  ) {
  }

  ngOnInit() {
    this.authAPI.checkAuth(this.user);
    this.edit = false;

    // console.log(this.fullname);
    // console.log(this.address);
    // console.log(this.bdate);
    // console.log(this.photo);


  }

  submitChange() {
    if (this.password.length > 0) {
      this.SHApassword = CryptoJS.SHA512(this.password).toString();
      this.data = JSON.parse(`{"nama_lengkap": "${this.fullname}", 
                            "foto": "${this.photo}", 
                            "alamat": "${this.address}", 
                            "tanggal_lahir": "${this.bdate}", 
                            "password": "${this.SHApassword}",
                            "token": "${this.token}"}`);
    }
    else {
      this.data = JSON.parse(`{"nama_lengkap": "${this.fullname}", 
                            "foto": "${this.photo}", 
                            "alamat": "${this.address}", 
                            "tanggal_lahir": "${this.bdate}", 
                            "token": "${this.token}"}`);
    }
    console.log(this.data);
    this.authAPI.update(this.data).subscribe(
      result => {
        this.response = result;
        this.token = this.response.token;
        localStorage.setItem("token", this.token);

        this.user.result.user.nama_lengkap = this.fullname;
        this.user.result.user.foto = this.photo;
        this.user.result.user.alamat = this.address;
        this.user.result.user.tanggal_lahir = this.bdate;
        this.user.result.user.token = this.token
        localStorage.setItem("user", JSON.stringify(this.user));

        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );


  }

}
