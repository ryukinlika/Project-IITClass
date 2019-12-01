import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { style, transition, animate, trigger, state } from '@angular/animations';
import { UKM } from '../_shared/models/ukm';
import { PelayananAPIService } from '../_shared/services/pelayanan-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class HomeComponent implements OnInit {

  private ukm: UKM = null;
  private expires_at = '';
  Arr = Array;
  num: number = 5;

  constructor(
    private pelayanApi: PelayananAPIService) { }

  ngOnInit() {
    console.log(localStorage.getItem(this.expires_at))
    this.pelayanApi.getAllUKM().subscribe(
      result => { this.ukm = result; console.log(this.ukm); },
      error => { console.log(error); },
    );
  }
}
