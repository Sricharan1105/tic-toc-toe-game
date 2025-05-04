/**
 * UI module for managing the game interface
 */
export function initializeUI() {
  const cells = Array.from(document.querySelectorAll('.cell'));
  
  /**
   * Show a specific screen
   */
  function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    
    // Show the requested screen
    document.getElementById(screenId).classList.add('active');
  }
  
  /**
   * Update a cell with player's mark
   */
  function updateCell(index, player) {
    const cell = cells[index];
    cell.textContent = player.toUpperCase();
    cell.classList.add(player.toLowerCase());
    
    // Add animation
    cell.animate(
      [
        { transform: 'scale(0.8)', opacity: 0.5 },
        { transform: 'scale(1)', opacity: 1 }
      ],
      {
        duration: 200,
        easing: 'ease-out'
      }
    );
  }
  
  /**
   * Clear the game board
   */
  function clearBoard() {
    cells.forEach(cell => {
      cell.textContent = '';
      cell.className = 'cell';
    });
  }
  
  /**
   * Update the active player in the UI
   */
  function updateActivePlayer(player) {
    // Remove active class from both players
    document.getElementById('player-x').classList.remove('active');
    document.getElementById('player-o').classList.remove('active');
    
    // Add active class to current player
    document.getElementById(`player-${player}`).classList.add('active');
  }
  
  /**
   * Update the game status message
   */
  function updateGameStatus(message) {
    const statusElement = document.querySelector('.game-status');
    statusElement.textContent = message;
    
    // Add animation
    statusElement.animate(
      [
        { transform: 'translateY(-5px)', opacity: 0.5 },
        { transform: 'translateY(0)', opacity: 1 }
      ],
      {
        duration: 300,
        easing: 'ease-out'
      }
    );
  }
  
  /**
   * Update the score for a player
   */
  function updateScore(player, score) {
    document.getElementById(`player-${player}-score`).textContent = score;
  }
  
  /**
   * Highlight the winning combination
   */
  function showWinningCombination(combination) {
    combination.forEach(index => {
      const cell = cells[index];
      cell.classList.add('winning');
    });
  }
  
  /**
   * Creates a toast notification
   */
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
  
  // Return public API
  return {
    showScreen,
    updateCell,
    clearBoard,
    updateActivePlayer,
    updateGameStatus,
    updateScore,
    showWinningCombination,
    showToast
  };
}