import Piece from './Piece.js';
import { isSameDiagonal, isPathClean } from '../Helpers'
import '../App.css';

export default class Bishop extends Piece {
  constructor(player) {
    // super(player, (player === 1 ? "https://upload.wikimeia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"));
    super(player, (player === 1 
      ? 
      "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png" 
      : 
      "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"
      ));

  }

  isMovePossible(src, dest, squares) {
    return isPathClean(this.getSrcToDestPath(src, dest), squares) && isSameDiagonal(src, dest)
  }

  getSrcToDestPath(src, dest) {
    let path = [], pathStart, pathEnd, incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    }
    else {
      pathStart = src;
      pathEnd = dest;
    }
    if (Math.abs(src - dest) % 9 === 0) {
      incrementBy = 9;
      pathStart += 9;
    }
    else {
      incrementBy = 7;
      pathStart += 7;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}