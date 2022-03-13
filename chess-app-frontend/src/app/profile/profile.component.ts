import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string = 'loading username...';
  games: any = {};

  constructor(public accountService: AccountService) {
    this.username = this.accountService.getUsername();

    // fetch games
  }

  ngOnInit(): void {

  }

  updateGames(): void {
    this.accountService.getGames(this.username).subscribe({
      next: (data: any) => {
        console.log('wow it worked');
        console.log(data);
        this.games = data.games;
      }, error: data => {
        console.log('error:', data.error);
        // console.error(error);
      }, complete: () => {
        // when does this complete run?
        console.log('accountService login completed');
      }
    });
  }
}