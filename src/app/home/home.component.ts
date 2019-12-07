import { Component, OnInit, ViewEncapsulation } from "@angular/core";
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
import { SearchPipe } from "src/app/_shared/services/search.pipe";

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
  temp: any[] = [];
  isLoggedIn = false;
  favo?: any[] = [];
  index: any;
  SS: number = 1
  SB: number = 1
  OL: number = 1

  constructor(
    private pelayanApi: PelayananAPIService,
    private authAPI: AuthAPIService
  ) { }

  ngOnInit() {
    // console.log(localStorage.getItem(this.expires_at));
    this.pelayanApi.getAllUKM().subscribe(
      result => {
        this.ukm = result;
        this.Arr = this.ukm.result.ukm;

        for (let i = 0; i < this.Arr.length; i++) {
          if (this.Arr[i].kode.includes("SB") == true) {
            this.SB += 1
          }
          else if (this.Arr[i].kode.includes("SS") == true) {
            this.SS += 1
          }
          else if (this.Arr[i].kode.includes("OL") == true) {
            this.OL += 1
          }
        }
        localStorage.setItem("OL", this.OL.toString())
        localStorage.setItem("SB", this.SB.toString())
        localStorage.setItem("SS", this.SS.toString())
        this.sortBy(this.Arr)
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

  sortBy(field: string) {
    this.ukm.result.ukm.sort((a: any, b: any) => {
      if (a.nama < b.nama) {
        return -1;
      } else if (a.nama > b.nama) {
        return 1;
      } else {
        return 0;
      }
    })
  }

  addFave(data: any) {
    if (!this.isLoggedIn) {
      alert("Silahkan login terlebih dahulu");
      return;
    }
    if (localStorage.getItem("favourited") != null) this.favo = JSON.parse(localStorage.getItem("favourited"));
    console.log(this.favo);

    if (this.favo.findIndex(result => result.kode == data.kode) == -1) {
      this.favo.push(data);
      localStorage.setItem("favourited", JSON.stringify(this.favo));
      alert("Berhasil menambahkan ke favorit!");
      return;
    }

    alert("Tidak dapat menambahkan UKM yang sama!");

    // console.log(data);
    // console.log(this.temp[1]);
    // console.log(JSON.parse(localStorage.getItem("favourited")));
    return;
  }

  //buat apa ni VVVVV
  onKeydown($event: any) { }
}
