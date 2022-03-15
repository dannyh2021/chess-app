import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.accountService.logOut();
  }
}