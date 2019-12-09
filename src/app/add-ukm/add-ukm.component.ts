import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthAPIService } from '../_shared/services/auth-api.service';
import { PelayananAPIService } from '../_shared/services/pelayanan-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ukm',
  templateUrl: './add-ukm.component.html',
  styleUrls: ['./add-ukm.component.scss']
})
export class AddUkmComponent implements OnInit {

  addForm: FormGroup;
  token = localStorage.getItem('token');
  data: any;
  submitted = false;
  image: string = './.././../assets/images/placeholder.png';
  loading = false;
  type: string = 'OL';
  lul: any;
  pad = "000";
  temp: any;


  constructor(
    private fb: FormBuilder,
    private authAPI: AuthAPIService,
    private pelayanAPI: PelayananAPIService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authAPI.checkAuth(JSON.parse(localStorage.getItem("user")));

    this.addForm = this.fb.group({
      kode: [''],
      nama: ['', Validators.required],
      anggota: ['', Validators.required],
      foto: ['', Validators.required],
      deskripsi: ['', Validators.required],
      jam_mulai: ['', Validators.required],
      jam_selesai: [null],
      token: ['']
    });

    this.temp = (this.pad + localStorage.getItem("OL")).slice(-this.pad.length)

  }

  addUkm() {
    this.submitted = true;
    this.loading = true;
    console.log('ree');
    // console.log(this.addForm.value.jam_selesai);

    if (this.addForm.invalid) {
      this.loading = false;
      return;
    }
    this.data = this.addForm.value;
    this.data.kode = this.type + this.temp;
    this.data.token = this.token;

    this.pelayanAPI.newUKM(this.data).subscribe(
      result => {
        alert("Successfully added new UKM!");
        console.log(result);
        this.router.navigateByUrl("/home");
      },
      error => {
        this.loading = false;
        console.log(this.data);
        console.log(error);
      }
    )
  }


  changeImage() {
    this.image = './.././../assets/images/placeholder.png';
  }

  setImg() {
    this.image = this.addForm.value.foto;
  }

  onReset() {
    this.submitted = false;
    this.loading = false;
    this.addForm.reset();
  }

  get f() {
    return this.addForm.controls;
  }

  setType(str: string) {
    this.type = str;
    if (this.type == "SS") {
      this.temp = (this.pad + localStorage.getItem("SS")).slice(-this.pad.length)
    }
    else if (this.type == "SB") {
      this.temp = (this.pad + localStorage.getItem("SB")).slice(-this.pad.length)
    }
    else if (this.type == "OL") {
      this.temp = (this.pad + localStorage.getItem("OL")).slice(-this.pad.length)
    }
  }
  info() {
    alert("Tipe UKM yang tersedia: \n -OL : Olahraga\n -SB : Seni dan Budaya\n -SS : Science dan Sosial");
  }
}
