import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-favourite",
  templateUrl: "./favourite.component.html",
  styleUrls: ["./favourite.component.scss"]
})
export class FavouriteComponent implements OnInit {
  favo: any;

  constructor() {}

  ngOnInit() {
    this.loadFavo();
  }

  loadFavo() {
    this.favo = JSON.parse(localStorage.getItem("favourited"));
    console.log(this.favo);
  }
}
