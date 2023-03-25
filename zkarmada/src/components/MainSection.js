import React, { useContext } from "react";
import Board from "./Board";
import { GamesContext, gameStates } from "../GameContext.js";

import styled from "styled-components";
import ShipPicker from "./ShipPicker";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MainSection = () => {
  const { userBoard, otherBoard, gameState } = useContext(GamesContext);

  return (
    <Container>
      <Board info={userBoard} />
      {gameState === gameStates.choosing_ships ? (
        <ShipPicker />
      ) : (
        <Board info={otherBoard} />
      )}
    </Container>
  );
};

export default MainSection;
