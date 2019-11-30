import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { serverResponse } from '../models/serverResponse';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {

  private urlApi = 'https://umn-pti2019.herokuapp.com';
  private expires_at = '';
  private date: Date;
  private exp: string;

  constructor(
    private http: HttpClient
  ) { }

  register(data: any): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/register`, data);
  }

  login(data: any): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/login`, data)
  }

  verify(data: string): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/verify`, data);
  }

  setSession(data: any) {
    this.date = new Date(parseInt(data.result.exp))
    this.exp = (this.date.getTime() * 1000).toString()
    this.date = new Date(parseInt(this.exp))
    this.exp = this.date.toString()
    localStorage.setItem(this.expires_at, this.exp);
    console.log(localStorage.getItem(this.expires_at));
  }
}
