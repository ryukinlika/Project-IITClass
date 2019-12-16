import { Component, OnInit } from "@angular/core";
import {
  style,
  transition,
  animate,
  trigger,
  state
} from "@angular/animations";

@Component({
  selector: "app-favourite",
  templateUrl: "./favourite.component.html",
  styleUrls: ["./favourite.component.scss"],
  animations: [
    trigger("fadeInOut", [
      state(
        "void",
        style({
          opacity: 0
        })
      ),
      transition("void <=> *", animate(1000))
    ])
  ]
})
export class FavouriteComponent implements OnInit {
  favo: any;
  temp: any;
  Scope: any[] = [];
  index: any;
  test: any;
  arr = [1, 2, 3, 4];

  constructor() { }

  ngOnInit() {
    this.loadFavo();
  }

  loadFavo() {
    this.favo = JSON.parse(localStorage.getItem("favourited" + localStorage.getItem("user_name")));
    console.log(this.favo)
  }

  removeFavo(data: any) {
    this.temp = data.id;
    this.index = this.favo.findIndex(record => record.id == this.temp);
    this.favo.splice(this.index, 1);
    localStorage.setItem("favourited" + localStorage.getItem("user_name"), JSON.stringify(this.favo));
  }
}
