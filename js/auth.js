/**
 * Authentication module for managing player sessions
 */
export function initializeAuth(ui) {
  let players = {
    x: null,
    o: null
  };
  
  /**
   * Handle the login action
   */
  function login() {
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    
    const player1Name = player1Input.value.trim();
    const player2Name = player2Input.value.trim();
    
    if (!player1Name || !player2Name) {
      return;
    }
    
    // Store player information
    players.x = player1Name;
    players.o = player2Name;
    
    // Update player names in the UI
    document.getElementById('player-x-name').textContent = player1Name;
    document.getElementById('player-o-name').textContent = player2Name;
    
    // Show game screen
    ui.showScreen('game-screen');
    
    // Reset scores for new login
    document.getElementById('player-x-score').textContent = '0';
    document.getElementById('player-o-score').textContent = '0';
    
    // Save players to localStorage for persistence
    savePlayersToStorage();
  }
  
  /**
   * Handle the logout action
   */
  function logout() {
    // Clear player information
    players.x = null;
    players.o = null;
    
    // Reset form inputs
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    
    // Show login screen
    ui.showScreen('login-screen');
    
    // Remove players from localStorage
    localStorage.removeItem('ticTacToePlayers');
  }
  
  /**
   * Save players to localStorage
   */
  function savePlayersToStorage() {
    localStorage.setItem('ticTacToePlayers', JSON.stringify(players));
  }
  
  /**
   * Load players from localStorage
   */
  function loadPlayersFromStorage() {
    const storedPlayers = localStorage.getItem('ticTacToePlayers');
    if (storedPlayers) {
      players = JSON.parse(storedPlayers);
      
      // Auto-fill the login form if players exist
      document.getElementById('player1').value = players.x || '';
      document.getElementById('player2').value = players.o || '';
      
      return true;
    }
    
    return false;
  }
  
  /**
   * Get current players
   */
  function getPlayers() {
    return { ...players };
  }
  
  // Check if we have stored players and auto-login if needed
  const hasStoredPlayers = loadPlayersFromStorage();
  
  // Return public API
  return {
    login,
    logout,
    getPlayers,
    hasStoredPlayers
  };
}