import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // private userSubject: BehaviorSubject<string>;
  // private username: string = 'Guest';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService) {
      console.log('constructor account service');
      // this.userSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('user_id') || '{}'));
      // this.username = this.userSubject.asObservable();
  }

  /* get userValue(): string {
    return this.userSubject.value;
  } */

  saveGame(username: string, pgn: string) {
    return this.http.post('http://localhost:3000/games/save', { username, pgn, date: new Date() });
  }
  
  getUsername(): string {
    if (this.cookieService.check('username')) {
      return this.cookieService.get('username');
    } else {
      return 'Guest';
    }
  }

  loggedIn() {
    return this.cookieService.check('user_id');
  }
  
  login(username_email: string, password: string) {
    return this.http.post('http://localhost:3000/users/login', { username_email, password });
  }

  register(username: string, email: string, password: string) {
    const body = {username, email, password};
    console.log('registering: ', body);
    return this.http.post('http://localhost:3000/users/register', body);
  }

  setUsername(username: string) {
    this.cookieService.set('username', username);
  }

  logOut() {
    this.setUsername('Guest');
    this.cookieService.delete('user_id');
  }
}