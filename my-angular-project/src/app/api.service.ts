import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.developments';
import { giveAway } from './types/GiveAway';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private appUrl = environment.appUrl;
  private headers = new HttpHeaders({
    'X-Parse-Application-Id': environment.appId,
    'X-Parse-JavaScript-Key': environment.javascriptKey,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }
  getCatalog() {
    const request = this.http.get<giveAway[]>(`${this.appUrl}/giveAway`, { headers: this.headers })
    return request;
  }
  createGiveAway(data: giveAway) {
    const request = this.http.post(`${this.appUrl}/giveAway`, data, { headers: this.headers });
    return request;
  }

  getSpecificItem(id: string) {
    const request = this.http.get<giveAway>(`${this.appUrl}/giveAway/${id}`, { headers: this.headers });
    return request;
  }
  
  updateBidItem(id: string, data: giveAway) {
    const request = this.http.put<giveAway>(`${this.appUrl}/giveAway/${id}`, data, { headers: this.headers });
    return request;
  }
}