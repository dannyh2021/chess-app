import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<string>;
  public user_id: Observable<string>;

  constructor(
    private router: Router,
    private http: HttpClient) {
      console.log('testing account service');
      this.userSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('user_id') || '{}'));
      this.user_id = this.userSubject.asObservable();
  }

  get userValue(): string {
    return this.userSubject.value;
  }

  loggedIn(): boolean {
    return this.userValue != '';
  }
  
  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/users/login', { username, password });
  }

  register(username: string, email: string, password: string) {
    const body = {username, email, password};
    console.log('registering: ', body);
    return this.http.post('http://localhost:3000/users/register', body);
  }
}