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

  loggedIn = false;
  username: string = "";

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
  }

  logOut() {
    this.loggedIn = false;
    this.authAPI.logout();
  }

}
