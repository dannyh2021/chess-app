import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this.message = 'signing up';
    this.accountService.register(this.username, this.email, this.password)
      .subscribe({
        next: (data: any) => {
          this.message = 'Successful registration';
          console.log(data.msg);
          this.router.navigate(['/login']);
        },
        error: data => {
          // console.log("error:");
          // console.error(data);
          this.message = "Unsuccessful registration. Please try again.\nError message:"
          this.message += data.error.message;
          /*console.log('msg:', data.error.msg); */
          console.log(data);
        },
        complete: () => {
        }
      });
  }
}