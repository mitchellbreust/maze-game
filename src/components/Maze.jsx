import { useState } from "react";
import styled from "styled-components"
import generateMaze from "../generateMaze";
import generatePlayerPos from "../generatePlayerPos";

const MazeCont = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    width: 800px;
    height: 800px;
    border: solid;
    margin: auto;
`;

const PathPiece = styled.div`
`

const WallPiece = styled.div`
`

const Maze = () => {
    const [gameMaze, setGameMaze] = useState(generateMaze())
    const [playerPos, setPlayerPos] = useState(generatePlayerPos());
    return (
        <>
            <MazeCont>
                {

                }
            </MazeCont>        
        </>
    )
}

export default Maze;