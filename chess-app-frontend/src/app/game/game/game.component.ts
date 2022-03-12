import { Component, OnInit, ViewChild } from '@angular/core';
import * as ChessJS from 'chess.js';
import { NgxChessBoardComponent } from 'ngx-chess-board';
import { AccountService } from 'src/app/account.service';
import { moveMessagePortToContext } from 'worker_threads';
import { BoardComponent } from '../board/board.component';
import { ControllerComponent } from '../controller/controller.component';
const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @ViewChild(ControllerComponent) controller!: ControllerComponent;
  @ViewChild(NgxChessBoardComponent, {static: false}) board!: NgxChessBoardComponent;
  chess: any;
  private mode: string = 'AI';
  blackDisabled: boolean = true;
  boardUpdated: boolean = true;

  constructor(public accountService: AccountService) {
    this.chess = new Chess();
  }

  ngOnInit(): void {
  }

  resetGame(): void {
    this.chess.reset();
    this.board.reset();
    this.updateMoveHistory();
  }

  onMoveChange(event: any): void {
    // console.log(event);

    if (this.boardUpdated) {
      this.chess.load_pgn(this.board.getPGN());
      console.log('chess: ', this.chess.pgn());
      console.log('board: ', this.board.getPGN());

      this.updateMoveHistory();

      if (this.chess.turn() === 'b') {
        this.makeRandomMove();
      }
    }
  }

  onModeChange(mode: string): void {
    this.mode = mode;
    this.resetGame();
  }

  makeRandomMove(): void {
    const moves = this.chess.moves();
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    this.chess.move(randomMove);
    
    this.updateMoveHistory();
    this.updateBoard();
  }

  updateBoard(): void {
    this.boardUpdated = false;
    this.board.setPGN(this.chess.pgn());
    this.boardUpdated = true;
  }

  updateMoveHistory(): void {
    this.controller.setMoveHistory(this.chess.history());
  }
}