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
    this.cookieService.delete('username');
    this.cookieService.delete('user_id');
  }

  // get games from database
  getGames(username: string) {
    const requestOptions = {
      headers: new HttpHeaders({ username })
    }

    return this.http.get('http://localhost:3000/games/get', requestOptions);
  }

  createBlogPost(title: string, author: string, date: Date, pgn: string, text: string) {
    return this.http.post('http://localhost:3000/blog/post', {title, author, date, pgn, text});
  }

  getBlog() {
    return this.http.get('http://localhost:3000/blog/get');
  }

  deleteBlog(blog_id: string) {
    return this.http.post('http://localhost:3000/blog/delete', { _id: blog_id });
  }

  getLikes() {
    return this.http.get('http://localhost:3000/blog/likes/get');
  }

  likePost(username: string, post_id: string) {
    return this.http.post('http://localhost:3000/blog/like', {username, post_id});
  }

  unlikePost(like_id: string) {
    return this.http.post('http://localhost:3000/blog/unlike', { _id: like_id });
  }
}