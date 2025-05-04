import { initializeAuth } from './js/auth.js';
import { initializeGame } from './js/game.js';
import { initializeUI } from './js/ui.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const ui = initializeUI();
  const auth = initializeAuth(ui);
  const game = initializeGame(ui);
  
  // Event listeners
  document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    auth.login();
  });
  
  document.getElementById('board').addEventListener('click', (event) => {
    if (event.target.classList.contains('cell') && !game.isGameOver()) {
      const index = event.target.dataset.index;
      game.makeMove(index);
    }
  });
  
  document.getElementById('reset-game').addEventListener('click', () => {
    game.resetBoard();
  });
  
  document.getElementById('new-game').addEventListener('click', () => {
    game.newGame();
  });
  
  document.getElementById('logout').addEventListener('click', () => {
    auth.logout();
  });
});