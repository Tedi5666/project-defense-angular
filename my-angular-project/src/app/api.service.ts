import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.developments';
import { giveAway } from './types/GiveAway';
import { UserService } from './user/user/user.service';
import { switchMap, tap } from 'rxjs/operators';
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

  constructor(private http: HttpClient, private userService: UserService) { }
  getCatalog() {
    const request = this.http.get<giveAway[]>(`${this.appUrl}/classes/giveAway`, { headers: this.headers })
    return request;
  }
  
  createGiveAway(data: giveAway) {
    const request = this.http.post(`${this.appUrl}/classes/giveAway`, data, { headers: this.headers });
    return request;
  }

  getSpecificItem(id: string | undefined) {
    const request = this.http.get<giveAway>(`${this.appUrl}/classes/giveAway/${id}`, { headers: this.headers });
    return request;
  }
  
  updateGiveItem(id: string, data: giveAway) {
    const request = this.http.put<giveAway>(`${this.appUrl}/classes/giveAway/${id}`, data, { headers: this.headers });
    return request;
  }

  deleteGiveaway(id: string | undefined){
    let userId: string | undefined; // Store the user ID
    let objectId: string; // Store the object ID

    // Fetch the giveaway item and store its details
    return this.getSpecificItem(id).pipe(
      tap((item) => {
        userId = item.author.objectId;
        objectId = item.objectId;
      }),
      // Fetch the user details
      switchMap(() => this.userService.getUserProfile(userId)),
      // Remove the giveaway item ID from the user's posts array
      tap((user) => {
        if (user && user.posts) {
          const index = user.posts.indexOf(objectId);
          if (index !== -1) {
            user.posts.splice(index, 1);
            console.log(user)
          }
        }
      }),
      // Update the user
      switchMap((user) => this.userService.updateUser(user.objectId, { posts: user.posts }, user?.sessionToken)),
      // Delete the giveaway item
      switchMap(() => this.http.delete(`${this.appUrl}/classes/giveAway/${id}`, {
        headers: this.headers,
      }))
    );
  }
}