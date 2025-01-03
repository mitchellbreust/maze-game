
import { useEffect, useState } from "react";
import styled from "styled-components";
import findRowAndColumn from "../findRowAndColumn";
import generateMaze from "../generateMaze";
import generatePlayerPos from "../generatePlayerPos";

const MazeCont = styled.div`
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);
  width: 800px;
  height: 800px;
  margin: auto;
  position: relative;
  transform: translateY(${(props) => props.offset}px); /* Move the maze down */
  transition: transform 0.1s linear; /* Smooth transition */
`;

const PathPiece = styled.div`
  width: 80px;
  height: 80px;
  background-color: #78c850;
  background-image: linear-gradient(to right, transparent 50%, rgba(0, 100, 0, 0.2) 50%),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
  background-size: 10px 100%, 100% 100%;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #5a8f3d;
`;

const EndPiece = styled.div`
  background-color: #78c850;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, transparent 50%, rgba(0, 100, 0, 0.2) 50%),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
  background-size: 10px 100%, 100% 100%;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #5a8f3d;

  &::before {
    content: "";
    position: absolute;
    width: 6px;
    height: 60px;
    background-color: #8b4513;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  &::after {
    content: "";
    position: absolute;
    width: 40px;
    height: 30px;
    background-color: #ff0000;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    clip-path: polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 50%);
  }
`;

const WallPiece = styled.div`
  background-color: grey;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  border: 2px solid #8b0000;
  & > div {
    background-color: #b22222;
    border: 2px solid #8b0000;
    position: relative;
  }
`;

const Character = styled.p`
  width: 30px;
  height: 30px;
  background-color: #ffcc00;
  border-radius: 50%;
  position: absolute;
  border: 3px solid #ff6600;
  box-shadow: 0 0 10px rgba(255, 102, 0, 0.5), inset 0 0 5px rgba(0, 0, 0, 0.3);
`;

const GameWon = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  & > h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 30px;
    border-bottom: 3px solid #27ae60;
    padding-bottom: 10px;
  }

  & > button {
    background-color: #27ae60;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #219653;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

const GameLost = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  & > h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 30px;
    border-bottom: 3px solid #e74c3c;
    padding-bottom: 10px;
  }

  & > button {
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #c0392b;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

const Maze = () => {
  const [gameMaze, setGameMaze] = useState(generateMaze());
  const [playerPos, setPlayerPos] = useState(generatePlayerPos(gameMaze));
  const [displayGameWon, setGameWon] = useState(false);
  const [mazeOffset, setMazeOffset] = useState(0); // Track the maze's vertical offset
  const [gameOver, setGameOver] = useState(false); // Track if the game is over

  // Move the maze down every 0.1 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver || displayGameWon) return;
      if (window.innerHeight < document.getElementById("character").getBoundingClientRect().top) {
        setGameOver(true)
      }
      setMazeOffset((prevOffset) => prevOffset + 3); // Move the maze down by 2px
    }, 100); // 0.1 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Check if the player is below the screen
  useEffect(() => {
    if (playerPos.top > 800) {
      setGameOver(true); // Game over if the player is below the screen
    }
  }, [playerPos]);

  const handleKeyDown = (press) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(press.key)) {
          press.preventDefault();
    }
    
    if (gameOver || displayGameWon) return; // Disable movement if the game is over

    const newPos = { ...playerPos };

    // Update position based on key press
    if (press.key === "ArrowRight") {
      newPos.left += 20;
    } else if (press.key === "ArrowLeft") {
      newPos.left -= 20;
    } else if (press.key === "ArrowUp") {
      newPos.top -= 20;
    } else if (press.key === "ArrowDown") {
      newPos.top += 20;
    }

    // Check if the new position is out of bounds
    if (newPos.left < 0 || newPos.left >= 800 || newPos.top < 0 || newPos.top >= 800) {
      return;
    }

    // Find the row and column of the new position
    const rowCol = findRowAndColumn(newPos.left, newPos.top);

    // Calculate the index in the gameMaze array
    const mazeIndex = rowCol.row * 10 + rowCol.col;

    // Check if the new position is a wall (value 0 in gameMaze)
    if (gameMaze[mazeIndex] === 0) {
      return;
    }

    // Check if the new position is the end (value 3 in gameMaze)
    if (gameMaze[mazeIndex] === 3) {
      setGameWon(true);
    }

    // Update the player's position
    setPlayerPos(newPos);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [playerPos]);

  return (
    <>
      <MazeCont offset={mazeOffset}>
        {gameMaze.map((val, idx) => {
          if (val === 0) {
            return (
              <WallPiece key={idx}>
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx}></div>
                ))}
              </WallPiece>
            );
          } else if (val === 1) {
            return <PathPiece key={idx} />;
          } else if (val === 2) {
            return <PathPiece key={idx} />;
          } else {
            return <EndPiece key={idx}></EndPiece>;
          }
        })}
        <Character style={{ top: `${playerPos.top}px`, left: `${playerPos.left}px` }}  id="character"/>
      </MazeCont>
      {
          displayGameWon ? <GameWon>
          <h1>GAME WON!</h1>
          <button
            onClick={() => {
              setGameMaze(generateMaze());
              setPlayerPos(generatePlayerPos(gameMaze));
              setGameWon(false);
              setMazeOffset(0); // Reset maze offset
              setGameOver(false); // Reset game over state
            }}
          >
            Click here to reset game
          </button>
        </GameWon> : null
        }

        {
          gameOver ? <GameLost>
          <h1>GAME LOST!</h1>
          <button
            onClick={() => {
              setGameMaze(generateMaze());
              setPlayerPos(generatePlayerPos(gameMaze));
              setMazeOffset(0); // Reset maze offset
              setGameOver(false); // Reset game over state
              setGameWon(false)
            }}
          >
            Click here to reset game
          </button>
        </GameLost> : null
        }
    </>
  );
};

export default Maze;