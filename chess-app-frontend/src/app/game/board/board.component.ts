import { Component, OnInit } from '@angular/core';
import { Chess } from 'chess.js';
// import Chessboard from '../../../js/chessboard-1.0.0';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['../../../css/chessboard-1.0.0.css', './board.component.css'],
})
export class BoardComponent implements OnInit {
  // let board = Chessboard('board', 'start');

  constructor() { }

  ngOnInit(): void {
  }

}