import Bishop from '../Pieces/Bishop.js';
import King from '../Pieces/King.js';
import Knight from '../Pieces/Knight.js';
import Pawn from '../Pieces/Pawn.js';
import Queen from '../Pieces/Queen.js';
import Rook from '../Pieces/Rook.js';
import Empty from '../Pieces/Empty.js';

function InitialiseBoard() {
    // const squares = Array(64).fill(null);
    const squares = Array(64).fill(new Empty());


    for (let i = 8; i < 16; i++) {
        squares[i] = new Pawn(2);
        squares[i + 40] = new Pawn(1);
    }
    squares[0] = new Rook(2);
    squares[7] = new Rook(2);
    squares[56] = new Rook(1);
    squares[63] = new Rook(1);

    squares[1] = new Knight(2);
    squares[6] = new Knight(2);
    squares[57] = new Knight(1);
    squares[62] = new Knight(1);

    squares[2] = new Bishop(2);
    squares[5] = new Bishop(2);
    squares[58] = new Bishop(1);
    squares[61] = new Bishop(1);

    squares[3] = new Queen(2);
    squares[4] = new King(2);

    squares[59] = new Queen(1);
    squares[60] = new King(1);

    return squares;

}

export default InitialiseBoard
