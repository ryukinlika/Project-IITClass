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
  private edit: boolean = false;
  private data: any;
  private token = localStorage.getItem("token");
  private response: any;

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
        console.log(result);
        this.response = result;
        this.token = this.response.token;
        localStorage.setItem("token", this.token);
        // this.authAPI.verify(JSON.parse(`{"token": "${this.token}"}`)).subscribe(
        //   result => {
        //     console.log("==============");
        //     console.log(result);
        //   }
        // )

        this.user.result.user.nama_lengkap = this.fullname;
        this.user.result.user.foto = this.photo;
        this.user.result.user.alamat = this.address;
        this.user.result.user.tanggal_lahir = this.bdate;
        localStorage.setItem("user", this.user);

        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );


  }

}
