import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { serverResponse } from '../models/serverResponse';
import { Time } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {

  private urlApi = 'https://umn-pti2019.herokuapp.com';
  private date: Date;
  private exp: string;
  private usernameSource: BehaviorSubject<any>;
  public username: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    if (localStorage.getItem("expires_at") == null) this.usernameSource = new BehaviorSubject<any>(null);
    else if (new Date(localStorage.getItem("expires_at")) < new Date()) this.usernameSource = new BehaviorSubject<any>(null);
    else this.usernameSource = new BehaviorSubject<any>(localStorage.getItem("user_name"));
    this.username = this.usernameSource.asObservable();
  }

  register(data: any): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/register`, data);
  }

  login(data: any): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/login`, data);
  }

  verify(data: string): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/verify`, data);
  }

  setSession(data: any) {
    this.date = new Date(parseInt(data.result.exp))
    this.exp = (this.date.getTime() * 1000).toString()
    this.date = new Date(parseInt(this.exp))
    this.exp = this.date.toString()
    localStorage.setItem("expires_at", this.exp);
    // console.log(localStorage.getItem("expires_at"));

    localStorage.setItem("user_name", data.result.user.user_name);
    //console.log(data.result.user.user_name);
    localStorage.setItem("user", JSON.stringify(data));
    //console.log(data);
    this.userchange();
  }

  userchange() {
    this.usernameSource.next(localStorage.getItem("user_name"));
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user");

    this.usernameSource.next(null);
    this.router.navigateByUrl('/home');
  }

  checkAuth(data: any) {
    if (data == null || localStorage.getItem("user_name") == null) {
      alert("Unauthorized!");
      this.logout();
    }
    else if (new Date(localStorage.getItem("expires_at")) < new Date()) {
      alert("Session Expired!");
      this.logout();
    }
  }

}
