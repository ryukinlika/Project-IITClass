import { Component, OnInit } from '@angular/core';
import { AuthAPIService } from '../_shared/services/auth-api.service';
import { serverResponse } from '../_shared/models/serverResponse';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private user?: serverResponse = JSON.parse(localStorage.getItem("user"));
  edit = false;

  constructor(
    private authAPI: AuthAPIService
  ) {
  }

  ngOnInit() {
    this.authAPI.checkAuth(this.user);

  }

  Update_Profile() {
    this.edit = true;
    return;
  }

}
