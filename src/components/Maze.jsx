import { useEffect, useState } from "react";
import styled from "styled-components";
import findRowAndColumn from "../findRowAndColumn";
import generateMaze from "../generateMaze";
import generatePlayerPos from "../generatePlayerPos";

const MazeCont = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    width: 800px;
    height: 800px;
    margin: auto;
    position: relative;
`;

const PathPiece = styled.div`
    width: 80px; /* Set the size of the path piece */
    height: 80px;
    background-color: #78c850; /* Light green base color (Pokémon grass color) */
    background-image: linear-gradient(to right, transparent 50%, rgba(0, 100, 0, 0.2) 50% /* Vertical darker lines */),
        linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1),
            /* Subtle highlight at the top */ transparent /* Fade to base color */
        );
    background-size: 10px 100%, 100% 100%; /* Size of the gradients */
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2); /* Inner shadow for depth */
    border: 1px solid #5a8f3d; /* Darker green border for definition */
`;

const StartingPiece = styled.div`
    background-color: blue;
`;

const EndPiece = styled.div`
    background-color: #78c850;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    background-image: linear-gradient(to right, transparent 50%, rgba(0, 100, 0, 0.2) 50% /* Vertical darker lines */),
        linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1),
            /* Subtle highlight at the top */ transparent /* Fade to base color */
        );
    background-size: 10px 100%, 100% 100%; /* Size of the gradients */
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2); /* Inner shadow for depth */
    border: 1px solid #5a8f3d; /* Darker green border for definition */

    /* Flag Pole */
    &::before {
        content: "";
        position: absolute;
        width: 6px; /* Thickness of the pole */
        height: 60px; /* Height of the pole */
        background-color: #8b4513; /* Brown color for the pole */
        top: 10px; /* Position the pole */
        left: 50%;
        transform: translateX(-50%);
    }

    /* Flag */
    &::after {
        content: "";
        position: absolute;
        width: 40px; /* Width of the flag */
        height: 30px; /* Height of the flag */
        background-color: #ff0000; /* Red color for the flag */
        top: 10px; /* Position the flag */
        left: 50%;
        transform: translateX(-50%);
        clip-path: polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 50%); /* Triangle shape for the flag */
    }
`;

const WallPiece = styled.div`
    background-color: grey;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
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
  background-color: #ffcc00; /* Bright yellow */
  border-radius: 50%;
  position: absolute;
  border: 3px solid #ff6600; /* Orange border */
  box-shadow: 0 0 10px rgba(255, 102, 0, 0.5), /* Outer glow */
              inset 0 0 5px rgba(0, 0, 0, 0.3); /* Inner shadow */
  transform-origin: center 10px; /* Set the origin point */
  animation: orbit 2s infinite linear; /* Orbiting animation */

  /* Orbiting Animation */
  @keyframes orbit {
    0% {
      transform: rotate(0deg) translateX(10px) rotate(0deg); /* Start position */
    }
    100% {
      transform: rotate(360deg) translateX(10px) rotate(-360deg); /* Full orbit */
    }
  }
`;

const GameWon = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center the modal */
  z-index: 500;
  background-color: rgba(255, 255, 255, 0.95); /* Semi-transparent white background */
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); /* Soft shadow for depth */
  text-align: center;
  animation: fadeIn 0.5s ease-in-out; /* Fade-in animation */

  /* Fade-in Animation */
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
    color: #2c3e50; /* Dark blue color */
    margin-bottom: 30px;
    border-bottom: 3px solid #27ae60; /* Green underline */
    padding-bottom: 10px;
  }

  & > button {
    background-color: #27ae60; /* Green background */
    color: white;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #219653; /* Darker green on hover */
      transform: scale(1.05); /* Slight zoom effect */
    }

    &:active {
      transform: scale(0.95); /* Slight shrink effect on click */
    }
  }
`;

const Maze = () => {
    const [gameMaze, setGameMaze] = useState(generateMaze());
    const [playerPos, setPlayerPos] = useState(generatePlayerPos(gameMaze));
    const [displayGameWon, setGameWon] = useState(false);

    const handleKeyDown = (press) => {
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

        if (gameMaze[mazeIndex] === 3) {
          if (displayGameWon) {
            return;
          }

          setGameWon(true)
          setPlayerPos(newPos)
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
            <MazeCont>
                {gameMaze.map((val, idx) => {
                    if (val === 0) {
                        return (
                            <WallPiece key={idx}>
                                {Array.from({ length: 4 }).map((_, idx) => {
                                    return <div key={idx}></div>;
                                })}
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
                <Character style={{ top: `${playerPos.top}px`, left: `${playerPos.left}px` }}>
                </Character>
                {
                  displayGameWon ? <GameWon>
                    <h1>GAME WON !</h1>
                    <button onClick={() => {
                      setGameMaze(generateMaze())
                      setPlayerPos(generatePlayerPos(gameMaze))
                      setGameWon(false)
                    }}>Click here to reset game</button>
                  </GameWon> : null
                }
            </MazeCont>
        </>
    );
};

export default Maze;
