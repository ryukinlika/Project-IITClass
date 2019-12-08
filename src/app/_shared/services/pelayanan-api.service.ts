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

  getUKMbykode(kode: number): Observable<UKM> {
    return this.http.get<UKM>(`${this.urlApi}/api/ukm/${kode}`);
  }

  updateUKM(data: string, kode: string): Observable<serverResponse> {
    return this.http.put<serverResponse>(`${this.urlApi}/api/ukm/${kode}`, data);
  }

  getUKMbykodae(kode: number): Observable<UKM> {
    return this.http.get<UKM>(`${this.urlApi}/api/ukm/${kode}`);
  }

  newUKM(data: any): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/ukm`, data);
  }

}