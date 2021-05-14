import Piece from './Piece.js';
import { isSameRow } from '../Helpers'

export default class Knight extends Piece {
  constructor(player) {
    super(player, (player === 1 ? "https://raw.githubusercontent.com/jsveron23/react-chess/71514ae59ecfc03f1276af84951091c9b0c8e831/src/chess/components/svg/white_knight.svg" : "https://raw.githubusercontent.com/jsveron23/react-chess/71514ae59ecfc03f1276af84951091c9b0c8e831/src/chess/components/svg/black_knight.svg"));
  }

  isMovePossible(src, dest) {
    return ((src - 17 === dest && !isSameRow(src, dest)) ||
      (src - 10 === dest && !isSameRow(src, dest)) ||
      (src + 6 === dest && !isSameRow(src, dest)) ||
      (src + 15 === dest && !isSameRow(src, dest)) ||
      (src - 15 === dest && !isSameRow(src, dest)) ||
      (src - 6 === dest && !isSameRow(src, dest)) ||
      (src + 10 === dest && !isSameRow(src, dest)) ||
      (src + 17 === dest && !isSameRow(src, dest)))
  }

  /**
   * always returns empty array because of jumping
   * @return {[]}
   */
  getSrcToDestPath() {
    return [];
  }
}
