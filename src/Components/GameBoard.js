import React from 'react'
import Square from './Square.js';
import '../App.css';

function GameBoard(props) {

    function isEven(num) {
        return num % 2 === 0
    }

    function renderSquare(i, squareShade) {
        return <Square
          key={i}
          keyVal={i}
          style = {squares[i].style}

          // style = {squares[i] ? squares[i].style : {width: '10%', height: '10vh'}} // change this bt  min(width , height) to make Responsive
          shade={squareShade}
          onClick={() => props.onClick(i)}
        />
    }
    const squares = props.squares;
    const board = [];
    for (let i = 0; i < 8; i++) {
      const squareRows = [];
      for (let j = 0; j < 8; j++) {
        const squareShade = (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? "light-square" : "dark-square";
        squareRows.push(renderSquare((i * 8) + j, squareShade));
      }
      board.push(<div className="board-row" key={i}>{squareRows}</div>)
    }  
    return (
        <div>
            {board}
        </div>
    )
} 

export default GameBoard
