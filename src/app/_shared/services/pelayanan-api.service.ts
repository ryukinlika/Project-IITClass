import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UKM } from '../models/ukm'

@Injectable({
  providedIn: 'root'
})
export class PelayananAPIService {

  private urlApi = 'https://umn-pti2019.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  getAllUKM(): Observable<UKM> {
    return this.http.get<UKM>(`${this.urlApi}/api/ukm`);
  }

  getUKMbykode(kode: string): Observable<UKM> {
    return this.http.get<UKM>(`${this.urlApi}/api/ukm/${kode}`);
  }
}