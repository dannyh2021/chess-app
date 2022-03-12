import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from './account.service';
import { PasswordResetComponent } from './login/password-reset/password-reset.component';
import { ChangeDetectorRef } from '@angular/core';
import { LoginComponent } from './login/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {

  title = 'chess-app-frontend';
  username: string = '';
  email: string = '';
  cookieData: string = '';
  attr: string = '';
  loggedIn: boolean = false;

  constructor(
    private accountService: AccountService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    console.log('cookie data: ', this.cookieService.getAll());
    if (this.cookieService.check('user_id')) {
      this.loggedIn = true;
      console.log('user_id', this.cookieService.get('user_id'));
    }
  }

  ngOnChanges(): void {
    console.log('app component onChanges');
  }

  /* updateLoginStatus(event: Event): void {
    console.log('event: ', event);
    if (this.cookieService.check('user_id')) {
      this.loggedIn = true;
      // this.changeDetectorRef.detectChanges();
    } else {
      this.loggedIn = false;
    }
  } */

  test(): void {
    console.log('test');
  }

  click(): void {
    this.username="username1";
    this.email="test@gmail.com";

    this.cookieService.set('user', 'username1');

    this.cookieData = JSON.stringify(this.cookieService.getAll());

    this.attr = this.cookieService.get('email');
  }
}