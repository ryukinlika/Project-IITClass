import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { mergeMap, switchMap } from 'rxjs/operators';


import { serverResponse } from "../models/serverResponse";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthAPIService {
  private urlApi = "https://umn-pti2019.herokuapp.com";
  private date: Date;
  private exp: string;
  private usernameSource: BehaviorSubject<any>;
  public username: Observable<any>;
  private fotoSource: BehaviorSubject<any>;
  public foto: Observable<any>;
  private temp;


  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem("expires_at") == null || new Date(localStorage.getItem("expires_at")) < new Date()) {
      this.usernameSource = new BehaviorSubject<any>(null);
      this.fotoSource = new BehaviorSubject<any>(null);
    }
    else {
      this.usernameSource = new BehaviorSubject<any>(localStorage.getItem("user_name"));
      this.fotoSource = new BehaviorSubject<any>(localStorage.getItem("avatar_profile"));
    }
    this.username = this.usernameSource.asObservable();
    this.foto = this.fotoSource.asObservable();
  }

  register(data: any): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/register`, data);
  }

  login(data: any): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/login`, data)
  }

  verify(data: string): Observable<serverResponse> {
    return this.http.post<serverResponse>(`${this.urlApi}/api/verify`, data);
  }

  update(data: string): Observable<serverResponse> {
    this.fotochange();
    return this.http.put<serverResponse>(`${this.urlApi}/api/update`, data);
  }


  setSession(data: any) {
    this.date = new Date(parseInt(data.result.exp));
    this.exp = (this.date.getTime() * 1000).toString();
    this.date = new Date(parseInt(this.exp));
    this.exp = this.date.toString();
    localStorage.setItem("expires_at", this.exp);

    localStorage.setItem("user_name", data.result.user.user_name);
    localStorage.setItem("avatar_profile", data.result.user.foto);

    //console.log(data.result.user.user_name);
    localStorage.setItem("user", JSON.stringify(data));
    //console.log(data);
    this.userchange();
    this.fotochange();
  }

  userchange() {
    this.usernameSource.next(localStorage.getItem("user_name"));
  }

  fotochange() {
    this.fotoSource.next(localStorage.getItem("avatar_profile"));
  }



  checkAuth(data: any) {
    console.log('expire = ' + new Date(localStorage.getItem("expires_at")));
    if (data == null || localStorage.getItem("user_name") == null) {
      if (new Date(localStorage.getItem("expires_at")) < new Date()) {
        alert("Session Expired!");
        this.logout();
      }
      alert("Unauthorized!");
      this.logout();
    }
    else if (new Date(localStorage.getItem("expires_at")) < new Date()) {
      alert("Session Expired!");
      this.logout();
    }
  }


  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user");

    this.usernameSource.next(null);
    this.fotoSource.next(null);
    this.router.navigateByUrl("/home");
  }
}
