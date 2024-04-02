import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.developments';
import { User } from '../../types/User';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();
  private sessionToken: string | null = null;

  user: User | undefined = undefined;
  USER_KEY = '[user]';

  get isLogged(): boolean {
    return !!this.user;
  }

  subscription: Subscription;

  private appUrl = environment.appUrl;
  private headers = new HttpHeaders({
    'X-Parse-Application-Id': environment.appId,
    'X-Parse-JavaScript-Key': environment.javascriptKey,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  getUserProfile(id: string | undefined) {
    return this.http
      .get<User>(`${this.appUrl}/users/${id}`, {
        headers: this.headers,
      })
  }

  updateUser(id: string | undefined, data: { posts: string[] | undefined }, sessionToken: string | undefined) {
    this.headers = this.headers.set('X-Parse-Session-Token', this.getSessionToken() || '');

    return this.http
      .put<User>(`${this.appUrl}/users/${id}`, data, {
        headers: this.headers,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(username: string, email: string, image: string, password: string) {
    const data = {
      username,
      email,
      imageUrl: image,
      password,
      posts: [],
    };

    return this.http
      .post<User>(`${this.appUrl}/users`, data, {
        headers: this.headers,
      })
      .pipe(tap((user) => {
        this.user$$.next(user);
        this.setSessionToken(user.sessionToken);
      }));
  }

  login(username: string, password: string) {
    const url = `${this.appUrl}/login?username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`;

    return this.http
      .get<User>(url, {
        headers: this.headers,
      })
      .pipe(
        tap((user) => {
          this.user$$.next(user);
          this.setSessionToken(user.sessionToken);
        })
      );

  }

  logout() {
    this.headers = this.headers.set('X-Parse-Session-Token', this.sessionToken || '');
    return this.http
      .post(
        `${this.appUrl}/logout`,
        JSON.stringify({}),
        {
          headers: this.headers,
        }
      )
      .pipe(tap(() => {
        this.user$$.next(undefined);
        this.setSessionToken(null);
      }));
  }

  setSessionToken(token: string | null) {
    this.sessionToken = token;
  }

  getSessionToken(): string {
    return this.sessionToken || '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}