import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UKM } from '../models/ukm'
import { serverResponse } from '../models/serverResponse';

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

  updateUKM(data: string, kode: string): Observable<serverResponse> {
    return this.http.put<serverResponse>(`${this.urlApi}/api/ukm/${kode}`, data);
  }

  newUKM(data: any): Observable<serverResponse> {
    console.log("je")
    return this.http.post<serverResponse>(`${this.urlApi}/api/ukm`, data);
  }
  newUKM2(data: any): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/ukmDetail`, data);
  }

}