import { Component, OnInit, ViewChild } from "@angular/core";
import {
  style,
  transition,
  animate,
  trigger,
  state
} from "@angular/animations";
import { UKM } from "../_shared/models/ukm";
import { PelayananAPIService } from "../_shared/services/pelayanan-api.service";
import { AuthAPIService } from ".././_shared/services/auth-api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [
    trigger("fadeInOut", [
      state(
        "void",
        style({
          opacity: 0
        })
      ),
      transition("void => *", animate(1000))
    ])
  ]
})
export class HomeComponent implements OnInit {
  private ukm: UKM = null;
  private expires_at = "";
  Arr: any;
  num: number = 5;
  i: number = 0;
  isLoggedIn = false;
  favo?: any[] = [];
  index: any;
  temp: any;
  isFavorited = false;
  SS: number = 1;
  SB: number = 1;
  OL: number = 1;

  constructor(
    private pelayanApi: PelayananAPIService,
    private authAPI: AuthAPIService
  ) {}

  ngOnInit() {
    this.pelayanApi.getAllUKM().subscribe(
      result => {
        this.ukm = result;
        this.Arr = this.ukm.result.ukm;

        for (let i = 0; i < this.Arr.length; i++) {
          if (this.Arr[i].kode.includes("SB")) {
            this.SB += 1;
          } else if (this.Arr[i].kode.includes("SS")) {
            this.SS += 1;
          } else if (this.Arr[i].kode.includes("OL")) {
            this.OL += 1;
          }
        }
        localStorage.setItem("OL", this.OL.toString());
        localStorage.setItem("SB", this.SB.toString());
        localStorage.setItem("SS", this.SS.toString());
      },
      error => {
        console.log(error);
      }
    );
    console.log(localStorage.getItem("expires_at"));

    this.authAPI.username.subscribe(result => {
      if (result == null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
  }

  sortby(str: string) {
    if (str == "kode") {
      this.ukm.result.ukm.sort((a: any, b: any) => {
        if (a.kode < b.kode) {
          return -1;
        } else if (a.kode > b.kode) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (str == "nama") {
      this.ukm.result.ukm.sort((a: any, b: any) => {
        console.log(a.nama, ",", b.nama);
        if (a.nama < b.nama) {
          return -1;
        } else if (a.nama > b.nama) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (str == "anggota") {
      this.ukm.result.ukm.sort((a: any, b: any) => {
        if (a.anggota < b.anggota) {
          return -1;
        } else if (a.anggota > b.anggota) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (str == "updated_at") {
      this.ukm.result.ukm.sort((a: any, b: any) => {
        if (a.updated_at < b.updated_at) {
          return -1;
        } else if (a.updated_at > b.updated_at) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  addFave(data: any) {
    if (!this.isLoggedIn) {
      alert("Silahkan login terlebih dahulu");
      return;
    }
    if (
      localStorage.getItem("favourited" + localStorage.getItem("user_name")) !=
      null
    )
      this.favo = JSON.parse(
        localStorage.getItem("favourited" + localStorage.getItem("user_name"))
      );
    console.log(this.favo);

    if (this.favo.findIndex(result => result.kode == data.kode) == -1) {
      this.favo.push(data);
      localStorage.setItem(
        "favourited" + localStorage.getItem("user_name"),
        JSON.stringify(this.favo)
      );
      this.isFavorited = true;
      alert("Berhasil menambahkan ke favorit!");
      return;
    }

    alert("Tidak dapat menambahkan UKM yang sama!");
    return;
  }
}
