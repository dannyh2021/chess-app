import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as ChessJS from 'chess.js';
import { NgxChessBoardComponent } from 'ngx-chess-board';

const Chess = typeof ChessJS === 'function' ? ChessJS : ChessJS.Chess;

@Component({
  selector: 'app-game-visualizer',
  templateUrl: './game-visualizer.component.html',
  styleUrls: ['./game-visualizer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameVisualizerComponent implements OnInit, AfterViewInit {
  @Input() pgn: string = '1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Bb4+ 6. Bd2 Be7 7. Nc3 c6 8. e4 d5 9. e5 Ne4 10. O-O Ba6 11. b3 Nxc3 12. Bxc3 dxc4 13. b4 b5 14. Nd2 O-O 15. Ne4 Bb7 16. Qg4 Nd7 17. Nc5 Nxc5 18. dxc5 a5 19. a3 axb4 20. axb4 Rxa1 21. Rxa1 Qd3 22. Rc1 Ra8 23. h4 Qd8 24. Be4 Qc8 25. Kg2 Qc7 26. Qh5 g6 27. Qg4 Bf8 28. h5 Rd8 29. Qh4 Qe7 30. Qf6 Qe8 31. Rh1 Rd7 32. hxg6 fxg6 33. Qh4 Qe7 34. Qg4 Rd8 35. Bb2 Qf7 36. Bc1 c3 37. Be3 Be7 38. Qe2 Bf8 39. Qc2 Bg7 40. Qxc3 Qd7 41. Rc1 Qc7 42. Bg5 Rf8 43. f4 h6 44. Bf6 Bxf6 45. exf6 Qf7 46. Ra1 Qxf6 47. Qxf6 Rxf6 48. Ra7 Rf7 49. Bxg6 Rd7 50. Kf2 Kf8 51. g4 Bc8 52. Ra8 Rc7 53. Ke3 h5 54. gxh5 Kg7 55. Ra2 Re7 56. Be4 e5 57. Bxc6 exf4+ 58. Kxf4 Rf7+ 59. Ke5 Rf5+ 60. Kd6 Rxh5 61. Rg2+ Kf6 62. Kc7 Bf5 63. Kb6 Rh4 64. Ka5 Bg4 65. Bxb5 Ke7 66. Rg3 Bc8 67. Re3+ Kf7 68. Be2 { 1-0 Black resigns. } 1-0';
  @ViewChild(NgxChessBoardComponent, {static: false}) board!: NgxChessBoardComponent
  @ViewChild('moveHistory') moves!: ElementRef;
  chess: any;
  allMoves: any;

  constructor() {
    this.chess = new Chess();
  }

  ngOnInit(): void {
    const temp = new Chess()
    temp.load_pgn(this.pgn);
    this.allMoves = temp.history();
  }

  ngAfterViewInit(): void {
    this.first();
  }

  first(): void {
    this.chess.reset();
    this.board.reset();

    this.setMoveHistory(this.chess.history());
  }

  prev(): void {
    this.chess.undo();
    this.board.undo();

    this.setMoveHistory(this.chess.history());
  }

  next(): void {
    if (this.chess.history().length < this.allMoves.length) {
      this.chess.move(this.allMoves[this.chess.history().length]);
    }
    this.board.setPGN(this.chess.pgn());

    this.setMoveHistory(this.chess.history());
  }

  last(): void {
    this.chess.load_pgn(this.pgn);
    this.board.setPGN(this.pgn);

    this.setMoveHistory(this.chess.history());
  }

  setMoveHistory(moves: any): void {
    let temp = moves.length % 2 === 0 ? moves.length : moves.length - 1;
    // console.log(temp);

    let text = '<div style="overflow:scroll; height:300px;">';
    for (let i = 0; i < temp; i += 2) {
      text += '<p>' + (i/2 + 1) + '.\t' + '<span class="moved">' + moves[i] + ' ' + (moves[i+1] ? moves[i+1] : '') + '</span>' + '</p>';
    }

    if (moves.length % 2 !== 0) {
      const x = moves.length - 1;
      text += '<p>' + (x/2 + 1) + '.\t' + '<span class="moved">' + moves[x] + '</span>' + ' ' + (this.allMoves[x+1] ? this.allMoves[x+1] : '') + '</p>';
      temp += 2;
    }

    for (let i = temp; i < this.allMoves.length; i += 2) {
      text += '<p>' + (i/2 + 1) + '.\t' + this.allMoves[i] + ' ' + (this.allMoves[i+1] ? this.allMoves[i+1] : '') + '</p>';
    }

    text += '</div>';

    this.moves.nativeElement.innerHTML = text;
  }
}