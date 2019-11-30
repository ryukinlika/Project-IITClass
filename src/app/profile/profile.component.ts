import { Component, OnInit } from '@angular/core';
import { AuthAPIService } from '../_shared/services/auth-api.service';
import { serverResponse } from '../_shared/models/serverResponse';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private profile: serverResponse;

  constructor(
    private authAPI: AuthAPIService
  ) {
    this.authAPI.verify(localStorage.getItem("token"));
  }

  ngOnInit() {

  }

}
