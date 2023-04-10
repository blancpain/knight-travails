/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
class Square {
  constructor(value) {
    this.value = value;
    this.connections = [];
  }

  connect(node) {
    this.connections.push(node);
    node.connections.push(this);
  }
}

class Board {
  constructor() {
    this.squares = this.buildBoard();
  }

  buildBoard() {
    // build all the squares(verticies) in the board
    const squares = [];
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        const newSquare = new Square([i, j]);
        squares.push(newSquare);
      }
    }

    // iterate over all squares and for each square
    // iterate over all possible moves generated by the
    // helper function and add them as edges/connections
    squares.forEach((square) => {
      for (const [moveRow, moveCol] of this.determineLegalMoves(square)) {
        // lookup the square with matching coordinates from all squares
        squares.forEach((node) => {
          if (
            node.value.toString() === [moveRow, moveCol].toString() &&
            !square.connections.includes(node) &&
            node.value.toString() !== square.value.toString()
          ) {
            square.connect(node);
          }
        });
      }
    });
    return squares;
  }

  // generator helper function to loop over offsets and return
  // coordinates for a legal target square the knight can jump to
  *determineLegalMoves(square) {
    const MOVE_OFFSETS = [
      [-1, -2],
      [1, -2],
      [-2, -1],
      [2, -1],
      [-2, 1],
      [2, 1],
      [-1, 2],
      [1, 2],
    ];

    for (const [rowOffset, colOffset] of MOVE_OFFSETS) {
      let [moveRow, moveCol] = square.value;
      moveRow += rowOffset;
      moveCol += colOffset;
      if (moveRow >= 0 && moveRow < 8 && moveCol >= 0 && moveCol < 8) {
        yield [moveRow, moveCol];
      }
    }
  }

  knightTravails(start, destination) {
    if (start === destination) {
      console.log("You are on the same square!");
      return;
    }

    const visited = new Set();
    let queue = [[start, []]];

    while (queue.length) {
      let [curSq, [...path]] = queue.shift();
      path.push(curSq);

      if (curSq === destination) {
        console.log(
          `You made it in ${path.length - 1} moves! Here is your path:`
        );
        for (const step of path) {
          console.log(step.value);
        }
        return path;
      }

      if (!visited.has(curSq)) {
        queue.push(...curSq.connections.map((v) => [v, path]));
      }

      visited.add(curSq);
    }
  }
}

const board = new Board();

const startingSq = board.squares[0];
const destinationSq = board.squares[54];

board.knightTravails(startingSq, destinationSq);
