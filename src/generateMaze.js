const mazes = [
    // Maze 1
    [
        1, 0, 0, 3, 1, 1, 0, 0, 0, 1,
        1, 1, 0, 0, 0, 1, 0, 0, 0, 1,
        0, 1, 0, 1, 0, 1, 1, 1, 0, 1,
        0, 1, 0, 1, 0, 0, 0, 1, 0, 1,
        0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
        0, 0, 0, 0, 0, 1, 0, 1, 0, 1,
        1, 1, 1, 1, 0, 1, 1, 1, 0, 1,
        1, 0, 0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1,
        2, 0, 0, 0, 0, 1, 0, 0, 0, 1
    ],
    [
        1, 1, 1, 1, 3, 1, 1, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 1, 1, 1, 0, 1, 1, 1, 1,
        1, 0, 1, 0, 1, 0, 0, 0, 0, 1,
        1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 1, 0, 0, 0, 1,
        1, 1, 1, 1, 0, 1, 0, 1, 1, 1,
        0, 0, 0, 1, 0, 0, 0, 2, 0, 1
    ],
    [
        1, 1, 1, 1, 1, 1, 3, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 1, 1, 1, 0, 1, 1, 1, 1,
        1, 0, 1, 0, 1, 0, 0, 0, 0, 1,
        1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 1, 0, 0, 0, 1,
        1, 1, 1, 1, 0, 1, 0, 1, 1, 1,
        0, 0, 0, 1, 0, 0, 0, 2, 0, 1
    ],
    [
        1, 0, 1, 3, 1, 0, 1, 0, 1, 1,
        1, 0, 0, 0, 1, 0, 0, 0, 0, 1,
        1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 2
    ],
    [
        1, 1, 0, 1, 0, 1, 0, 1, 3, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 0, 1, 0, 1,
        1, 0, 0, 0, 0, 1, 0, 1, 1, 1,
        1, 1, 1, 1, 0, 1, 0, 0, 0, 1,
        0, 1, 0, 1, 0, 1, 1, 1, 0, 1,
        1, 1, 0, 1, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 2
    ]        
]


const generateMaze = () => {
    // Randomly select one of the predefined mazes
    const randomIndex = Math.floor(Math.random() * mazes.length);
    return mazes[randomIndex];
};

export default generateMaze;
