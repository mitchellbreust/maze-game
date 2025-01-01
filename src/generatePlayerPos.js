
const generatePlayerPos = (gameMaze) => {
    // Find the index of the starting position (value 2)
    const startingIndex = gameMaze.indexOf(2);
    
    // Calculate row and column based on the index
    const row = Math.floor(startingIndex / 10);
    const col = startingIndex % 10;
    
    // Calculate left and top positions in pixels
    const cellSize = 80; // Each cell is 80px
    const left = col * cellSize;
    const top = row * cellSize;
    
    // Return the player's position
    return { left, top };
  };

  export default generatePlayerPos