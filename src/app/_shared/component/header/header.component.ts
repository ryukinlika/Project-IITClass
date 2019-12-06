import { PelayananAPIService } from './../../services/pelayanan-api.service';
import { Component, OnInit } from '@angular/core';
import { AuthAPIService } from '../../services/auth-api.service';
import { Url } from 'url';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private user?: any = JSON.parse(localStorage.getItem("user"));
  loggedIn = false;
  username: string = "";
  foto: string = "";

  constructor(
    private authAPI: AuthAPIService,
    private pelayanAPI: PelayananAPIService
  ) { }

  ngOnInit() {

    this.authAPI.username.subscribe(
      result => {
        if (result == null) {
          this.loggedIn = false;
          this.username = "";
        }
        else {
          this.loggedIn = true;
          this.username = result;
        }
      }
    )

    this.authAPI.foto.subscribe(
      result => {
        if (result == null) {
          this.loggedIn = false;
          this.foto = "";
        }
        else {
          this.loggedIn = true;
          this.foto = result;
        }
      }
    )
  }

  logOut() {
    this.loggedIn = false;
    this.authAPI.logout();
  }

}
