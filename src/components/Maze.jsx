import { useState } from "react";
import styled from "styled-components";
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
`;

const PathPiece = styled.div``;

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



const Maze = () => {
  const [gameMaze, setGameMaze] = useState(generateMaze());
  const [playerPos, setPlayerPos] = useState(generatePlayerPos());

  console.log(gameMaze[0]);
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
          return <PathPiece key={idx} />;
        })}
      </MazeCont>
    </>
  );
};

export default Maze;
