/**
 * Game logic module for Tic Tac Toe
 */
export function initializeGame(ui) {
  // Game state
  let board = Array(9).fill('');
  let currentPlayer = 'x';
  let gameOver = false;
  let scores = { x: 0, o: 0 };
  
  // Winning combinations (row, column, diagonal)
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  
  /**
   * Make a move on the board
   */
  function makeMove(index) {
    index = parseInt(index);
    
    // Check if the cell is already taken or game is over
    if (board[index] !== '' || gameOver) {
      return false;
    }
    
    // Update the board and UI
    board[index] = currentPlayer;
    ui.updateCell(index, currentPlayer);
    
    // Check for win or draw
    const winningCombo = checkWinner();
    
    if (winningCombo) {
      gameOver = true;
      scores[currentPlayer]++;
      ui.updateScore(currentPlayer, scores[currentPlayer]);
      ui.showWinningCombination(winningCombo);
      ui.updateGameStatus(`${currentPlayer.toUpperCase()} wins!`);
    } else if (isBoardFull()) {
      gameOver = true;
      ui.updateGameStatus("It's a draw!");
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
      ui.updateActivePlayer(currentPlayer);
      ui.updateGameStatus(`${currentPlayer.toUpperCase()}'s turn`);
    }
    
    return true;
  }
  
  /**
   * Reset the game board without changing scores
   */
  function resetBoard() {
    board = Array(9).fill('');
    gameOver = false;
    currentPlayer = 'x';
    
    ui.clearBoard();
    ui.updateActivePlayer(currentPlayer);
    ui.updateGameStatus(`${currentPlayer.toUpperCase()}'s turn`);
  }
  
  /**
   * Start a new game with reset scores
   */
  function newGame() {
    resetBoard();
    scores = { x: 0, o: 0 };
    ui.updateScore('x', 0);
    ui.updateScore('o', 0);
  }
  
  /**
   * Check if there is a winner
   * @returns {Array|null} The winning combination or null
   */
  function checkWinner() {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return combo;
      }
    }
    return null;
  }
  
  /**
   * Check if the board is full (draw)
   */
  function isBoardFull() {
    return board.every(cell => cell !== '');
  }
  
  /**
   * Get the current game state
   */
  function getGameState() {
    return {
      board: [...board],
      currentPlayer,
      gameOver,
      scores: { ...scores }
    };
  }
  
  /**
   * Check if the game is over
   */
  function isGameOver() {
    return gameOver;
  }
  
  // Initialize the game
  resetBoard();
  
  // Return public API
  return {
    makeMove,
    resetBoard,
    newGame,
    getGameState,
    isGameOver
  };
}