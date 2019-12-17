import { AuthAPIService } from './../_shared/services/auth-api.service';
import { serverResponse } from './../_shared/models/serverResponse';
import { Component, OnInit } from '@angular/core';
import { PelayananAPIService } from '../_shared/services/pelayanan-api.service';
import { ActivatedRoute } from '@angular/router';
import { UKM } from '../_shared/models/ukm';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Time } from '@angular/common';


@Component({
  selector: 'app-update-ukm',
  templateUrl: './update-ukm.component.html',
  styleUrls: ['./update-ukm.component.scss']
})
export class UpdateUkmComponent implements OnInit {

  private user?: any = JSON.parse(localStorage.getItem("user"));
  loading = false;
  temp: any;
  favo: any[] = [];

  public ukm: any;
  public cAt: Date;
  public createdAt: string;
  public uAt: Date;
  public updatedAt: string;
  private kode: string;

  private data: any;
  private namaukm: string;
  private anggotaukm: number;
  private jammulaiukm: Time;
  private jamselesaiukm: Time;
  private deskripsiukm: string;
  private fotoukm: string;


  private response: any;
  private token = localStorage.getItem("token");

  constructor(
    private authAPI: AuthAPIService,
    private route: ActivatedRoute,
    private pelayanAPI: PelayananAPIService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authAPI.checkAuth(this.user);
    this.route.params.subscribe(param => {
      this.kode = param.kode;
      this.pelayanAPI.getUKMbykode(param.kode).subscribe(
        result => {
          this.ukm = result;
          localStorage.setItem("localukm", JSON.stringify(this.ukm));
        },
        error => { console.log(error) },
      )
    })

  }
  setDate(param1: string, param2: string) {
    this.cAt = new Date(parseInt(param1, 10));
    this.uAt = new Date(parseInt(param2, 10));
    this.createdAt = new Date(this.cAt.getTime() - (this.cAt.getTimezoneOffset() * 60000))
      .toLocaleDateString()
    this.updatedAt = new Date(this.uAt.getTime() - (this.uAt.getTimezoneOffset() * 60000))
      .toLocaleDateString()
    return;
  }

  saveChange() {
    this.ukm = JSON.parse(localStorage.getItem("localukm"));
    if (this.namaukm == undefined) {
      this.namaukm = this.ukm.result.nama;
    }
    if (this.anggotaukm == undefined) {
      this.anggotaukm = this.ukm.result.anggota;
    }
    if (this.jammulaiukm == undefined) {
      this.jammulaiukm = this.ukm.result.jam_mulai;
    }
    if (this.jamselesaiukm == undefined) {
      this.jamselesaiukm = this.ukm.result.jam_selesai;
    }
    if (this.deskripsiukm == undefined) {
      this.deskripsiukm = this.ukm.result.deskripsi;
    }
    if (this.fotoukm == undefined) {
      this.fotoukm = this.ukm.result.foto;
    }

    this.data = JSON.parse(`{
      "nama": "${this.namaukm}",
      "anggota": "${this.anggotaukm}",
      "jam_mulai": "${this.jammulaiukm}",
      "jam_selesai": "${this.jamselesaiukm}",
      "deskripsi": "${this.deskripsiukm}",
      "foto": "${this.fotoukm}",
      "token": "${this.token}"
    }`);

    this.pelayanAPI.updateUKM(this.data, this.kode).subscribe(
      result => {
        this.ukm = result
        this.updatefave(this.ukm)
        setTimeout(() => this.ngOnInit(), 2000);
        setTimeout(() => this.router.navigateByUrl("/ukmdetail/" + this.kode), 2000);

      }
    );
    this.loading = true;

  }

  updatefave(data: any) {
    this.favo = JSON.parse(localStorage.getItem("favourited" + localStorage.getItem("user_name")));
    if (this.favo != null) {
      this.temp = this.favo.findIndex(result => result.kode == data.result.kode)
      if (this.temp >= 0) {
        this.favo[this.temp].nama = data.result.nama
        this.favo[this.temp].anggota = data.result.anggota
        this.favo[this.temp].deskripsi = data.result.deskripsi
        this.favo[this.temp].foto = data.result.foto
        this.favo[this.temp].created_at = data.result.created_at
        this.favo[this.temp].updated_at = data.result.updated_at
        localStorage.setItem(
          'favourited' + localStorage.getItem('user_name'),
          JSON.stringify(this.favo))
      }
    }
  }
}


