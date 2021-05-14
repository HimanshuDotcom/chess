import Piece from './Piece.js';
// import { isSameRow, isSameColumn, isSameDiagonal, isPathClean } from '../Helpers'
import { isSameRow, isSameColumn, isPathClean } from '../Helpers'

export default class Rook extends Piece {
  constructor(player) {
    super(player, (player === 1 ? "https://raw.githubusercontent.com/jsveron23/react-chess/71514ae59ecfc03f1276af84951091c9b0c8e831/src/chess/components/svg/white_rook.svg" : "https://raw.githubusercontent.com/jsveron23/react-chess/71514ae59ecfc03f1276af84951091c9b0c8e831/src/chess/components/svg/black_rook.svg"));
  }

  isMovePossible(src, dest, squares) {
    return isPathClean(this.getSrcToDestPath(src, dest), squares) && (isSameColumn(src, dest) || isSameRow(src, dest));
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src  
   * @param  {num} dest 
   * @return {[array]}      
   */
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
    if (Math.abs(src - dest) % 8 === 0) {
      incrementBy = 8;
      pathStart += 8;
    }
    else {
      incrementBy = 1;
      pathStart += 1;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}