import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    console.log('login button pressed.');
    this.accountService.login(this.username, this.password).subscribe({
      next: data => {
        console.log(data);
        localStorage.setItem('user_id', JSON.stringify(data));
      }, error: error => {
        console.error(error);
      }, complete: () => {
        console.log('accountService login completed');
      }
    });
  }
}