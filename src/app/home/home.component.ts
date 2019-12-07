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
        localStorage.setItem("array", JSON.stringify(this.Arr));
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

  addFave(data: any) {
    if (this.isLoggedIn == false) {
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
