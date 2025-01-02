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
  border: solid;
  margin: auto;
  position: relative;
`;

const PathPiece = styled.div``;

const StartingPiece = styled.div`
  background-color: blue;
`;

const EndPiece = styled.div`
  background-color: green;
`;

const WallPiece = styled.div`
  background-color: grey;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  border: 5px solid #8b0000;
  & > div {
    background-color: #b22222;
    border: 5px solid #8b0000;
    position: relative;
  }
`;

const Character = styled.p`
  width: 20px;
  height: 20px;
  background-color: black;
  border-radius: 180px;
  position: absolute;
`

const Maze = () => {
  const [gameMaze, setGameMaze] = useState(generateMaze());
  const [playerPos, setPlayerPos] = useState(generatePlayerPos(gameMaze))

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
  
    // Update the player's position
    setPlayerPos(newPos);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [playerPos])


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
          }
          else if (val === 1) {
            return <PathPiece key={idx} />;
          }
          else if (val === 2) {
            return (
            <StartingPiece key={idx}>
            </StartingPiece>
            )
          }
          else {
            return <EndPiece key={idx}/>
          }
        })}
        <Character style={{ top: `${playerPos.top}px`, left: `${playerPos.left}px` }} />
      </MazeCont>
    </>
  );
};

export default Maze;
