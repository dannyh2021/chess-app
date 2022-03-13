import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnChanges {
  /* @Input() loggedIn = false; */

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // console.log("navbar loggedin: ", this.loggedIn);
  }

  logOut(): void {
    this.accountService.logOut();
    //this.loggedIn = false;
  }

  test() {
    console.log('profile clicked');
  }
}