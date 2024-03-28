import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.developments';
import { User } from '../../types/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private appUrl = environment.appUrl;
  private headers = new HttpHeaders({
    'X-Parse-Application-Id': environment.appId,
    'X-Parse-JavaScript-Key': environment.javascriptKey,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getUserProfile(id: string) {
    const request = this.http.get<User>(`${this.appUrl}/users/${id}`, { headers: this.headers });
    return request;
  }
}