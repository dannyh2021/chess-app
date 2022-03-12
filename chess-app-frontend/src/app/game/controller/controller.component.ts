import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit {
  @Input() chess: any;
  @Output() onUndo: EventEmitter<null> = new EventEmitter<null>();
  @Output() onRestart: EventEmitter<null> = new EventEmitter<null>();
  @Output() onSave: EventEmitter<null> = new EventEmitter<null>();
  moveHistory: string = '';

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  setMoveHistory(moves: any): void {
    this.moveHistory = '';
    for (let i = 0; i < moves.length; i+= 2) {
      this.moveHistory += ((i/2 + 1) + '.\t' + moves[i] + ' ' + (moves[i+1] ? moves[i+1] : '') + '\n');
    }
  }
}
