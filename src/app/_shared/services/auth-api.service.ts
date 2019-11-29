import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { serverResponse } from '../models/serverResponse'

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {

  private urlApi = 'https://umn-pti2019.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  register(data: any): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/register`, data);
  }

  login(data: any): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/login`, data);
  }
}
