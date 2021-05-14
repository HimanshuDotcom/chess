import './App.css';
import GameBoard from './Components/GameBoard';
import React, { useState } from 'react'
import InitialiseBoard from './Helpers/InitialiseBoard.js';
import King from './Pieces/King';
import Empty from './Pieces/Empty';

function App() {

  const [squares, setsquares] = useState(InitialiseBoard());
  const [player, setplayer] = useState(1);
  const [sourceSelection, setsourceSelection] = useState(-1);
  const [turn, setturn] = useState('white');
  const [status, setstatus] = useState('');

  function handleClick(i) {    
    // console.log(squares);

    if (sourceSelection === -1) {
      if (squares[i].value === false || squares[i].player !== player) {
        setstatus("Wrong selection. Choose player " + player + " pieces.");
        if (squares[i] === 1) {
          // Change the background colours of desired squares
          squares[i].style = { ...squares[i].style, backgroundColor: "" };

        }
      }
      else {
        // Change the background colours of desired squares
        squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" }; 
        for (var j=0; j<64; j++){
          if (squares[i].isMovePossible(i, j, squares)) {
            squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" }; 


          }
        }


        setstatus("Choose destination for the selected piece");
        setsourceSelection(i);
      }
      return
    }
    // Change the background colours of desired squares
    squares[sourceSelection].style = { ...squares[sourceSelection].style, backgroundColor: "" };
    // squares[sourceSelection+1].style = { ...squares[sourceSelection+1].style, backgroundColor: "" };


    if ( squares[i].value === true && squares[i].player === player) {
      setstatus("Wrong selection. Choose valid source and destination again.");
      setsourceSelection(-1);
    }
    else {

      const isDestEnemyOccupied = Boolean(squares[i].value);
      const isMovePossible = squares[sourceSelection].isMovePossible(sourceSelection, i, isDestEnemyOccupied);

      if (isMovePossible) {

        console.log(squares[i], squares[sourceSelection]);
        squares[i] = squares[sourceSelection];
        squares[sourceSelection] = new Empty();  // past position is still visible.

        const isCheckMe = isCheckForPlayer(squares, player)

        if (isCheckMe) {
          setstatus("Wrong selection. Choose valid source and destination again. Now you have a check!");
          setsourceSelection(-1);
        } else {
          player === 1 ? setplayer(2) : setplayer(1);
          turn === 'white' ? setturn('black') : setturn('white');
          setsourceSelection(-1);
          setstatus('');
        }
      }
      else {

        setstatus("Wrong selection. Choose valid source and destination again.");
        setsourceSelection(-1);
      }
    }
  }
  function getKingPosition(squares, player) {
    return squares.reduce((acc, curr, i) =>
      acc || //King may be only one, if we had found it, returned his position
      ((curr //current squre mustn't be a null
        && (curr.getPlayer() === player)) //we are looking for aspecial king 
        && (curr instanceof King)
        && i), // returned position if all conditions are completed
      null)
  }

  function isCheckForPlayer(squares, player) {
    const opponent = player === 1 ? 2 : 1
    const playersKingPosition = getKingPosition(squares, player)
    const canPieceKillPlayersKing = (piece, i) => piece.isMovePossible(playersKingPosition, i, squares)
    return squares.reduce((acc, curr, idx) =>
      acc ||
      (curr &&
        (curr.getPlayer() === opponent) &&
        canPieceKillPlayersKing(curr, idx)
        && true),
      false)
  }

  return (
    <div className="App">
      <div className="game">
          <div className="game-board">
            <GameBoard 
              squares={squares}
              onClick={(i) => handleClick(i)}
            />
          </div>
      </div>
      <h3>Turn</h3>
      <div id="player-turn-box" style={{ backgroundColor: turn }}>
      <div className="game-status">{status}</div>
      </div>

    </div>
  );
}

export default App;
