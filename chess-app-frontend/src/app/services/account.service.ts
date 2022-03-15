import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      // this.userSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('user_id') || '{}'));
      // this.username = this.userSubject.asObservable();
  }

  /* get userValue(): string {
    return this.userSubject.value;
  } */

  saveGame(username: string, pgn: string) {
    return this.http.post('/games/save', { username, pgn, date: new Date() });
  }
  
  // returns 'Guest' if not logged in
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
    return this.http.post('/users/login', { username_email, password });
  }

  register(username: string, email: string, password: string) {
    const body = {username, email, password};
    console.log('registering: ', body);
    return this.http.post('/users/register', body);
  }

  setUsername(username: string) {
    this.cookieService.set('username', username);
  }

  logOut() {
    this.cookieService.delete('username');
    this.cookieService.delete('user_id');
  }

  // get games from database
  getGames(username: string) {
    const requestOptions = {
      headers: new HttpHeaders({ username })
    }

    return this.http.get('/games/get', requestOptions);
  }

  // blogging service
  createBlogPost(title: string, author: string, date: Date, pgn: string, text: string) {
    return this.http.post('/blog/post', {title, author, date, pgn, text});
  }

  getBlog() {
    return this.http.get('/blog/get');
  }

  deleteBlog(blog_id: string) {
    return this.http.post('/blog/delete', { _id: blog_id });
  }

  getLikes() {
    return this.http.get('/blog/likes/get');
  }

  likePost(username: string, post_id: string) {
    return this.http.post('/blog/like', {username, post_id});
  }

  unlikePost(like_id: string) {
    return this.http.post('/blog/unlike', { _id: like_id });
  }
}