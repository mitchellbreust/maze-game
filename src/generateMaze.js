
const mazes = [
    // Maze 1
    [
      1, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 0, 1, 1, 1, 0,
      0, 0, 1, 0, 1, 0, 0, 0,
      1, 1, 1, 1, 1, 0, 1, 1,
      0, 0, 0, 0, 1, 0, 1, 0,
      1, 1, 1, 0, 1, 1, 1, 0,
      1, 0, 1, 0, 0, 0, 1, 0,
      1, 0, 1, 1, 1, 1, 1, 1
    ],
    // Maze 2
    [
      1, 0, 1, 1, 1, 0, 0, 0,
      1, 0, 1, 0, 1, 0, 1, 1,
      1, 1, 1, 0, 1, 0, 1, 0,
      0, 0, 0, 0, 1, 1, 1, 0,
      1, 1, 1, 1, 1, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 1, 1,
      1, 1, 0, 1, 0, 0, 0, 1,
      0, 1, 0, 1, 1, 1, 0, 1
    ],
    // Maze 3
    [
      1, 0, 0, 0, 1, 0, 1, 1,
      1, 1, 1, 0, 1, 0, 0, 1,
      0, 0, 1, 0, 1, 1, 1, 1,
      1, 1, 1, 1, 0, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 1, 1,
      1, 1, 0, 0, 0, 1, 0, 1,
      1, 1, 1, 1, 1, 1, 0, 1,
      0, 0, 0, 0, 0, 1, 0, 1
    ]
  ];
  
  const generateMaze = () => {
    // Randomly select one of the predefined mazes
    const randomIndex = Math.floor(Math.random() * mazes.length);
    return mazes[randomIndex];
  };
  
  export default generateMaze;
  