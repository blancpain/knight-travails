/* eslint-disable max-classes-per-file */
class Square {
  constructor(value) {
    this.value = value;
    this.connections = [];
  }
}

class Board {
  constructor() {
    this.squares = this.buildBoard();
  }

  buildBoard() {
    const squares = [];
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        const newSquare = new Square([i, j]);
        squares.push(newSquare);
      }
    }
    return squares;
  }
}

const board = new Board();
console.log(board.squares[27]);
