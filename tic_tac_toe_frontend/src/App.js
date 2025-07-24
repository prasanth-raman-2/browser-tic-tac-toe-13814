import React, { useState } from 'react';
import './App.css';

/**
 * Color palette customizations (pulled from work item)
 * primary: #1976d2, secondary: #eeeeee, accent: #f44336
 */

// PUBLIC_INTERFACE
function App() {
  // BOARD STATE: 0..8, null initially, 'X'/'O' as filled.
  const [board, setBoard] = useState(Array(9).fill(null));
  // X always starts first
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);
  const isBoardFull = board.every(cell => cell !== null);
  const draw = !winner && isBoardFull;

  // PUBLIC_INTERFACE
  function handleSquareClick(i) {
    if (board[i] || winner) return; // don't allow move if filled or game over
    const boardCopy = board.slice();
    boardCopy[i] = isXNext ? 'X' : 'O';
    setBoard(boardCopy);
    setIsXNext(x => !x);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  // PUBLIC_INTERFACE
  function renderSquare(i) {
    return (
      <button
        className="ttt-square"
        onClick={() => handleSquareClick(i)}
        aria-label={`Cell ${i + 1} ${board[i] ? board[i] : ''}`}
      >
        {board[i]}
      </button>
    );
  }

  // Status message logic
  let statusMessage;
  if (winner) {
    statusMessage = `Winner: ${winner}`;
  } else if (draw) {
    statusMessage = 'Draw! No winner.';
  } else {
    statusMessage = `Next move: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="ttt-app-root">
      <h1 className="ttt-title">Tic Tac Toe</h1>
      <div className="ttt-status-container">
        <div className={`ttt-status${winner ? ' winner' : draw ? ' draw' : ''}`}>
          {statusMessage}
        </div>
        <button className="ttt-reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="ttt-board-container">
        <div className="ttt-board-grid">
          {[0, 1, 2].map(row =>
            <div key={row} className="ttt-board-row">
              {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
            </div>
          )}
        </div>
      </div>
      <footer className="ttt-footer">
        <span className="ttt-madeby">Made with React</span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(cells) {
  /**
   * This function checks for all win conditions (rows, cols, diags)
   * Returns 'X' or 'O' if found, null for no winner.
   */
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diags
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

export default App;
