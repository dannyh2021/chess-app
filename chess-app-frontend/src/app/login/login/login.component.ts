import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  @Output() loginEvent: EventEmitter<string> = new EventEmitter<string>();
  message: string = '';

  constructor(
    private accountService: AccountService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.username, this.password).subscribe({
      next: (data: any) => {
        //console.log(data.user_id);
        // localStorage.setItem('user_id', JSON.stringify(data));
        this.cookieService.set('user_id', JSON.stringify(data.user_id));
        this.accountService.setUsername(data.username);
        //console.log(this.cookieService.getAll());
        this.router.navigate(['/']);
      }, error: data => {
        this.message = "Login unsuccessful: " + data.error.msg;
        console.log(data.error);
        // console.error(error);
      }, complete: () => {
        // when does this complete run?
        // console.log('accountService login completed');
      }
    });
  }
}