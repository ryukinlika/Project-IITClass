import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { PelayananAPIService } from '../_shared/services/pelayanan-api.service';
import { UKM } from '../_shared/models/ukm';
import { setDefaultService } from 'selenium-webdriver/chrome';


@Component({
  selector: 'app-ukm-detail',
  templateUrl: './ukm-detail.component.html',
  styleUrls: ['./ukm-detail.component.scss']
})
export class UkmDetailComponent implements OnInit {

  public ukm: UKM = null;

  public cAt: Date;
  public createdAt: string;
  public uAt: Date;
  public updatedAt: string;

  constructor(
    private route: ActivatedRoute,
    private pelayanAPI: PelayananAPIService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.pelayanAPI.getUKMbykode(param.kode).subscribe(
        result => {
          this.ukm = result;
          console.log(this.ukm.result)
        },
        error => { console.log(error) },
      )
    })


  }

  setDate(param1: string, param2: string) {
    this.cAt = new Date(parseInt(param1, 10));
    this.uAt = new Date(parseInt(param2, 10));
    this.createdAt = new Date(this.cAt.getTime() - (this.cAt.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    this.updatedAt = new Date(this.uAt.getTime() - (this.uAt.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    return;
  }
}
