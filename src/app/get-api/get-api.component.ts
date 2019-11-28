import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-get-api',
  templateUrl: './get-api.component.html',
  styleUrls: ['./get-api.component.scss']
})
export class GetApiComponent implements OnInit {
  dataUkm;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getData().subscribe((data) => {
      console.log(data);
      this.dataUkm = data['dataUkm'];
    });
  }

}
