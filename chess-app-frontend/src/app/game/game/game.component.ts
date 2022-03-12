import { Component, OnInit, ViewChild } from '@angular/core';
import * as ChessJS from 'chess.js';
import { NgxChessBoardComponent } from 'ngx-chess-board';
import { AccountService } from 'src/app/account.service';
import { moveMessagePortToContext } from 'worker_threads';
import { BoardComponent } from '../board/board.component';
import { ControllerComponent } from '../controller/controller.component';
import * as weights from '../../../js/evaluation_weights.js';
import { ENGINE_METHOD_CIPHERS } from 'constants';
import { MatchInfoComponent } from '../match-info/match-info.component';
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

  undo(): void {
    this.chess.undo();
    this.chess.undo();

    console.log(this.chess.pgn());
    this.updateMoveHistory();
    this.updateBoard();
    console.log('board: ', this.board.getPGN());
  }

  resetGame(): void {
    this.chess.reset();
    this.board.reset();
    this.updateMoveHistory();
  }

  saveGame(): void {
    if (this.chess.game_over) {

      alert('Game saved');
    } else {
      alert('Please complete the game to save.');
    }
  }

  onMoveChange(event: any): void {
    if (this.boardUpdated) {
      this.chess.load_pgn(this.board.getPGN());

      this.updateMoveHistory();

      if (this.chess.turn() === 'b') {
        if (this.mode === 'random') {
          this.makeRandomMove();
        } else if (this.mode === 'AI') {
          this.makeBestMove();
        } else {
          console.log('mode not found');
        }
      }
    }
  }

  onModeChange(mode: string): void {
    this.mode = mode;
    this.resetGame();
  }

  updateBoard(): void {
    this.boardUpdated = false;
    if (this.chess.pgn().length > 0) {
      this.board.setPGN(this.chess.pgn());
    } else {
      this.board.reset();
    }
    this.boardUpdated = true;
  }

  updateMoveHistory(): void {
    this.controller.setMoveHistory(this.chess.history());
  }

  makeRandomMove(): void {
    if (this.chess.game_over()) {
      alert('Game over')
    }

    const moves = this.chess.moves();
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    this.chess.move(randomMove);
    
    this.updateMoveHistory();
    this.updateBoard();
  }

  // Minimax AI
  makeBestMove(): void {
    let bestMove = this.getBestMove();
    this.chess.move(bestMove);

    this.updateMoveHistory();
    this.updateBoard();
  }

  getBestMove(): any {
    if (this.chess.game_over()) {
      alert('Game over')
    }

    let bestMove = this.minimaxRoot(3, this.chess, true);

    return this.chess.moves()[Math.floor(Math.random() * this.chess.moves().length)];
  }

  minimaxRoot(depth: number, game: any, isMaximizingPlayer: boolean): any {
    let newGameMoves = game.moves();
    let movesConsidered = [];
    let bestMove = isMaximizingPlayer ? -9999 : 9999;
    let bestMoveFound;

    for (let i = 0; i < newGameMoves.length; i++) {
        let newGameMove = newGameMoves[i];
        game.move(newGameMove);
        var value = this.minimax(depth - 1, game, -9999, 9999, !isMaximizingPlayer)
        movesConsidered.push({'move': newGameMove, 'value': value});
        // console.log("move: " + JSON.stringify(movesConsidered[i].move) + " " + "value: " + movesConsidered[i].value);
        game.undo();
        if ((value >= bestMove && isMaximizingPlayer) ||
            (value <= bestMove && !isMaximizingPlayer)) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    console.log("value of move returned: " + bestMove)
    return bestMoveFound
  }

  minimax(depth: number, game: any, alpha: number, beta: number, isMaximizingPlayer: boolean): any {
    // positionCount++;
    // console.log("depth: " + depth + " alpha: " + alpha + " beta: " + beta);

    if(game.game_over()) {
        if (game.in_draw()) {
            return 0;
        } else if (game.in_checkmate){
            return game.turn() === 'b' ? 9000 : -9000;
        }
        throw "Error: unknown game state";
    }

    if (depth === 0) {
        return this.evaluateBoard(game.board());
    }

    let newGameMoves = game.moves();

    if (isMaximizingPlayer) {
        let bestMove = -9999;
        for (let i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, this.minimax(depth - 1, game, alpha, beta, !isMaximizingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, this.minimax(depth - 1, game, alpha, beta, !isMaximizingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
  }

  evaluateBoard(board: any): number {
    let totalEvaluation = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + this.getPieceValue(board[i][j], i, j);
        }
    }
    return totalEvaluation;
  }

  getPieceValue(piece: any, x: number, y: number): number {
    if (piece === null) {
        return 0;
    }
    let getAbsoluteValue = function(piece: any, isWhite: boolean, x: number, y: number) {
        if (piece.type === 'p') {
            return 10 + (isWhite ? weights.pawnEvalWhite[x][y] : weights.pawnEvalBlack[x][y]);
        } else if (piece.type === 'r') {
            return 50 + (isWhite ? weights.rookEvalWhite[x][y] : weights.rookEvalBlack[x][y]);
        } else if (piece.type === 'n') {
            return 30 + weights.knightEval[x][y];
        } else if (piece.type === 'b') {
            return 30 + (isWhite ? weights.bishopEvalWhite[x][y] : weights.bishopEvalBlack[x][y]);
        } else if (piece.type === 'q') {
            return 90 + weights.evalQueen[x][y];
        } else if (piece.type === 'k') {
            return 900 + (isWhite ? weights.kingEvalWhite[x][y] : weights.kingEvalBlack[x][y]);
        }
        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x, y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
  }
}