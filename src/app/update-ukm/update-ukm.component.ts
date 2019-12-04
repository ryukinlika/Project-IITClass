import { AuthAPIService } from './../_shared/services/auth-api.service';
import { serverResponse } from './../_shared/models/serverResponse';
import { Component, OnInit } from '@angular/core';
import { PelayananAPIService } from '../_shared/services/pelayanan-api.service';
import { ActivatedRoute } from '@angular/router';
import { UKM } from '../_shared/models/ukm';




@Component({
  selector: 'app-update-ukm',
  templateUrl: './update-ukm.component.html',
  styleUrls: ['./update-ukm.component.scss']
})
export class UpdateUkmComponent implements OnInit {

  private user?: serverResponse = JSON.parse(localStorage.getItem("user"));
  edit = false;

  public ukm: UKM = null;
  public cAt: Date;
  public createdAt: string;
  public uAt: Date;
  public updatedAt: string;

  constructor(
    private authAPI: AuthAPIService,
    private route: ActivatedRoute,
    private pelayanAPI: PelayananAPIService
  ) { }

  ngOnInit() {
    this.authAPI.checkAuth(this.user);
    this.route.params.subscribe(param => {
      this.pelayanAPI.getUKMbykode(param.kode).subscribe(
        result => {
          this.ukm = result;
        },
        error => { console.log(error) },
      )
    })

  }
}
