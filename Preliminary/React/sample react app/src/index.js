import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';



function Square(props){
  return(
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  )
}
  


class Board extends React.Component {

  constructor(props){
    super(props);
    /*state is an object. Objects in javascript are like dictionaries in python. In this case, state is an object that belongs to the board
    class*/
    this.state = {  
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i){
    const squares = this.state.squares.slice(); //slice is used to copy that array. Why didn't we just modify the existing array? Below this func
    
    if(calculateWinner(squares) || squares[i]){ //return early by ignoring a click if someone has won the game or if a Square was already clicked
      return;
    }
    
    squares[i] = (this.state.xIsNext ? 'X' : 'O');
    
    this.setState({
      squares: squares, //update the squares array in the board
      xIsNext: !this.state.xIsNext,
    })

  }
  /*
  2 ways to change data:
    - mutate the data by directly changing its values
    - replace the data with a new copy which has the desired changes

  This is something to think about because:
    - Immutability makes complex features much easier to implement. Later in this tutorial, we will implement a “time travel” feature 
      that allows us to review the tic-tac-toe game’s history and “jump back” to previous moves. This functionality isn’t specific to 
      games — an ability to undo and redo certain actions is a common requirement in applications. Avoiding direct data mutation lets 
      us keep previous versions of the game’s history intact, and reuse them later.
    - Detecting changes in mutable objects is difficult because they are modified directly. This detection requires the mutable object 
      to be compared to previous copies of itself and the entire object tree to be traversed. Detecting changes in immutable objects is 
      considerably easier. If the immutable object that is being referenced is different than the previous one, then the object has changed.
    - The main benefit of immutability is that it helps you build pure components in React. Immutable data can easily determine if changes 
      have been made, which helps to determine when a component requires re-rendering. You can learn more about shouldComponentUpdate() and 
      how you can build pure components by reading react's article on Optimizing Performance.
  */

  renderSquare(i) {
    return (
      <Square 
        //The square being rendered is the ith square in the squares array in the board object
        //By default, the value of the square is null, as defined in the board's constructor
        /*In summary, the line below makes the value of the ith square equal to its corresponding value in the squares array, which 
        gets updated as the squares are clicked using the handleClick function*/
        value={this.state.squares[i]} 
        onClick = {() => this.handleClick(i)} //using () => helps us avoid stuff like onClick={function() {do something}}
      />
    );
  }

  render() {

    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner: ' + winner;
    }
    else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');  //This is basically a simplified if else statement
    }

    return (
      <div>
        <div className="status">{status}</div>
        
        {/*these numbers below are being passed to the renderSquare function, and assign a square an index when they're rendered*/}  
        <div className="board-row">
          {this.renderSquare(0)}  
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }

  }

  return null;
}



class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}



// ==================================================================================================================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  