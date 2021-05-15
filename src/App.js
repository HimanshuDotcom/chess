import './App.css';
import GameBoard from './Components/GameBoard';
import React, { useState } from 'react'
import InitialiseBoard from './Helpers/InitialiseBoard.js';
import King from './Pieces/King';
import Empty from './Pieces/Empty';

function App() {

  const [squares] = useState(InitialiseBoard());
  const [player, setplayer] = useState(1);
  const [sourceSelection, setsourceSelection] = useState(-1);
  const [turn, setturn] = useState('white');
  const [status, setstatus] = useState('');
  const [kingLife, setkingLife] = useState('');

  // Change the size of the board by change in viewport to make dynamic.
  var r = document.querySelector(':root');
  (function() {
    window.onresize = displayWindowSize;
    window.onload = displayWindowSize;
  
    function displayWindowSize() {
      let myWidth = window.innerWidth;
      let myHeight = window.innerHeight;
      var size = Math.min(myWidth, myHeight)/10;
      r.style.setProperty('--sizeBoard', size + 'vh');
    };
  
  })();

  function handleClick(i) {    

    if (sourceSelection === -1) {
      if (squares[i].value === false || squares[i].player !== player) {
        setstatus("Wrong selection. Choose player " + player + " pieces.");
        if (squares[i].value === true) {
          // Change the background colours of desired squares
          squares[i].style = { ...squares[i].style, backgroundColor: "" };
        }
      }
      else {
        // Change the background colours of desired squares
        squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" }; 

        console.log("Character:" ,squares[i].__proto__.constructor.name);
        console.log("Player:", squares[i].player);






        // for(var j=0; j < 64; j++) {
        //   if (squares[i].__proto__.constructor.name === 'Pawn') {
        //     if (squares[i].isMovePossible(i, j, true)) {
        //       console.log(`Piece could kill ${j} `);
        //       // squares[j].style = { ...squares[j].style, backgroundColor: "RGB(111,143,114)" }; 
        //     }
        //     if (squares[i].isMovePossible(i, j, false)) {
        //       console.log(`Piece can move to ${j} `);
        //       // squares[j].style = { ...squares[j].style, backgroundColor: "RGB(111,143,114)" }; 
        //     }
        //   } 
        //   else if(squares[i].__proto__.constructor.name === 'Bishop' || squares[i].__proto__.constructor.name === 'Queen' || squares[i].__proto__.constructor.name === 'Rook'){
        //     if (squares[i].isMovePossible(i, j, squares)) {
        //       console.log(`Piece can move to ${j} `);
        //       squares[j].style = { ...squares[j].style, backgroundColor: "RGB(111,143,114)" }; 
        //     }
        //   }
        //   else {
        //     if (squares[i].isMovePossible(i, j)) {
        //       console.log(`Piece can move to ${j} `);
        //       squares[j].style = { ...squares[j].style, backgroundColor: "RGB(111,143,114)" }; 
        //     }
        //   }

        // }






        setstatus("Choose destination for the selected piece");
        setsourceSelection(i);
      }
      return
    }



    // Change the background colours of desired squares
    squares[sourceSelection].style = { ...squares[sourceSelection].style, backgroundColor: "" };
    // for(var k=0; k < 64; k++) {
    //   squares[k].style = { ...squares[k].style, backgroundColor: "" }; 
    // }



    if ( squares[i].value === true && squares[i].player === player) {
      setstatus("Wrong selection. Choose valid source and destination again.");
      setsourceSelection(-1);
    }
    else {

      const isDestEnemyOccupied = Boolean(squares[i].value);
      const isMovePossible = squares[sourceSelection].isMovePossible(sourceSelection, i, isDestEnemyOccupied);
      if (isMovePossible) {
        console.log(squares[sourceSelection].__proto__.constructor.name, 'Steps on', squares[i].__proto__.constructor.name);
        if (squares[i].__proto__.constructor.name === 'King') {
          var killed = squares[sourceSelection].player === 1 ? 'BLACK' : 'WHITE';
          console.log(`%c ${killed} KING KILLED !!`, "color:red; font-weight:bold");
          // alert(`${killed} KING KILLED !!`); // Not working on deployed site.
          setkingLife(`${killed} KING KILLED !!`);
        }
        squares[i] = squares[sourceSelection];
        squares[sourceSelection] = new Empty();  

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
      ((curr //current square must not be of value null
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

      <div style={{ display:'flex'}}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center'}} >
          <p style={{fontSize:'large', fontWeight:'600'}}>Turn</p>
          <div id="player-turn-box" style={{ backgroundColor: turn }}/>
        </div>
        <div style={{backgroundColor:'black', width:'calc(var(--sizeBoard) /80)', marginLeft:'1%', marginRight:'1%'}}/>
        <div style={{ display:'flex', alignItems:'center',width:'30%'}}>
          {status}
        </div>
        <div style={{ display:'flex', alignItems:'center',width:'30%'}}>
          {kingLife}
        </div>
      </div>


    </div>
  );
}

export default App;
