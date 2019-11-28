import { Component, OnInit } from '@angular/core';
import { style, transition, animate, trigger } from '@angular/animations';
import { UKM } from '../_shared/models/ukm';
import { PelayanApiService } from '../_shared/services/pelayanan-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade', [
      transition('void=>*', [
        style({ opacity: 0 }),
        animate(2000)
      ])
    ])

  ]
})
export class HomeComponent implements OnInit {

  private ukm: UKM = null;

  constructor(
    private pelayanApi: PelayanApiService
  ) { }

  ngOnInit() {
    this.pelayanApi.getAllUKM().subscribe(
      result => { this.ukm = result; console.log(this.ukm) },
      error => { console.log(error); }
    )
  }


}
