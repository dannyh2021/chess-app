import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  signUp() {
    console.log('signing up');
    this.accountService.register(this.username, this.email, this.password)
      .subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.log("error:");
          console.error(error);
        },
        complete: () => {
          console.log('accountService registration completed');
        }
      });
  }
}