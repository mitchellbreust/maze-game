
const findRowAndColumn = (left, top) => {
    const cellSize = 80; // Each cell is 80px wide and tall
  
    // Calculate row and column
    const row = Math.floor(top / cellSize);
    const col = Math.floor(left / cellSize);
  
    // Ensure row and column are within the grid bounds (0 to 9)
    const clampedRow = Math.min(Math.max(row, 0), 9);
    const clampedCol = Math.min(Math.max(col, 0), 9);
  
    return { row: clampedRow, col: clampedCol };
  };
  
  export default findRowAndColumn;