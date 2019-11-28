import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getData() {
    return this.httpClient.get(`https://umn-pti2019.herokuapp.com/api/ukm`);
  }
}
