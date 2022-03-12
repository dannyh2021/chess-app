import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';

const config = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
};
const options = {
  orientation: 'white'
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['../../../css/chessboard-1.0.0.css', './board.component.css'],
})
export class BoardComponent implements OnInit, AfterViewInit {
  @ViewChild('board', {static: false}) board!: NgxChessBoardView;
  @Output() moveChange = new EventEmitter<any>();
  pgn: string = "";

  constructor(private ngxChessBoardService: NgxChessBoardService) {
    console.log('constructor');
    //console.log(this.board);
  }

  ngOnInit(): void {
    console.log('ngOnInit() of board component.');
    //console.log(this.board);
  }

  ngAfterViewInit(): void {
    console.log('after view init');
  }

  onMoveChange(event: any) {
    this.moveChange.emit(event);
  }

  updateStatus() {

  }
}