import { Component, OnInit } from '@angular/core';
import { PelayananAPIService } from '../_shared/services/pelayanan-api.service';
import { ActivatedRoute } from '@angular/router';
import { UKM } from '../_shared/models/ukm';

@Component({
  selector: 'app-ukm-detail',
  templateUrl: './ukm-detail.component.html',
  styleUrls: ['./ukm-detail.component.scss']
})
export class UkmDetailComponent implements OnInit {

  public ukm: UKM = null;

  constructor(
    private pelayananAPI: PelayananAPIService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.pelayananAPI.getUKMbykode(params.kode).subscribe(
        result => { this.ukm = result; console.log(this.ukm) }
      );
    })
  }

}
