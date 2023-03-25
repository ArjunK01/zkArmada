import React, { useContext, useState } from "react";
import Board from "./Board";
import { GamesContext, gameStates } from "../GameContext.js";

import styled from "styled-components";
import ShipPicker from "./ShipPicker";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;
`;

const MainSection = () => {
  const { userBoard, otherBoard, gameState } = useContext(GamesContext);

  const [setupBoard, setSetupBoard] = useState([...userBoard]);
  const [currentShip, setCurrentShip] = useState(null);

  const [horizontal, setHorizonal] = useState(true);

  return (
    <Container>
      <Board
        user={true}
        info={setupBoard}
        setSetupBoard={setSetupBoard}
        currentShip={currentShip}
        horizontal={true}
      />
      {gameState === gameStates.choosing_ships ? (
        <ShipPicker
          setSetupBoard={setSetupBoard}
          currentShip={currentShip}
          setCurrentShip={setCurrentShip}
        />
      ) : (
        <Board info={otherBoard} />
      )}
    </Container>
  );
};

export default MainSection;
