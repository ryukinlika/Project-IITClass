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
import { SearchPipe } from 'src/app/_shared/services/search.pipe'

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

  constructor(private pelayanApi: PelayananAPIService) { }

  ngOnInit() {
    // console.log(localStorage.getItem(this.expires_at));
    this.pelayanApi.getAllUKM().subscribe(
      result => {
        this.ukm = result;
        this.Arr = this.ukm.result.ukm;
        localStorage.setItem("array", JSON.stringify(this.Arr))
      },
      error => {
        console.log(error);
      }
    );
    console.log(localStorage.getItem("expires_at"));
  }

  addFave(data: any) {
    console.log(data);
    localStorage.setItem("favourited", JSON.stringify(data));
    console.log(JSON.parse(localStorage.getItem("favourited")));
    return;
  }

  onKeydown($event: any) {

  }
}
