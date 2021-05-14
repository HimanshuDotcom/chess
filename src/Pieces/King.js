import Piece from './Piece.js';
import { isSameDiagonal, isSameRow } from '../Helpers'

export default class King extends Piece {
  constructor(player) {
    super(player, (player === 1 ? "https://raw.githubusercontent.com/jsveron23/react-chess/71514ae59ecfc03f1276af84951091c9b0c8e831/src/chess/components/svg/white_king.svg" : "https://raw.githubusercontent.com/jsveron23/react-chess/71514ae59ecfc03f1276af84951091c9b0c8e831/src/chess/components/svg/black_king.svg"));
  }

  isMovePossible(src, dest) {
    return ((src - 9 === dest && isSameDiagonal(src, dest)) ||
      src - 8 === dest ||
      (src - 7 === dest && isSameDiagonal(src, dest)) ||
      (src + 1 === dest && isSameRow(src, dest)) ||
      (src + 9 === dest && isSameDiagonal(src, dest)) ||
      src + 8 === dest ||
      (src + 7 === dest && isSameDiagonal(src, dest)) ||
      (src - 1 === dest && isSameRow(src, dest)))
  }

  /**
   * always returns empty array because of one step
   * @return {[]}
   */
  getSrcToDestPath(src, dest) {
    return [];
  }
}
