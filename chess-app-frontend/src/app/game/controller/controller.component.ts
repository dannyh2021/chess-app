import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit {
  @Input() chess: any;
  @Output() onUndo: EventEmitter<null> = new EventEmitter<null>();
  @Output() onRestart: EventEmitter<null> = new EventEmitter<null>();
  moveHistory: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  /* ngOnChanges(): void {
    this.moveHistory += '1';
  }*/

  /*update(): void {
    this.moveHistory = '';
    const moves = this.chess.history();
    console.log(moves.length);
    for (let i = 0; i < moves.length; i += 2) {
      this.moveHistory += ((i/2 + 1) + '.\t' + moves[i] + ' ' + (moves[i+1] ? moves[i+1] : '') + '\n')
    }
  }*/

  setMoveHistory(moves: any): void {
    this.moveHistory = '';
    for (let i = 0; i < moves.length; i+= 2) {
      this.moveHistory += ((i/2 + 1) + '.\t' + moves[i] + ' ' + (moves[i+1] ? moves[i+1] : '') + '\n');
    }
  }
}
