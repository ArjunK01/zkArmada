import React, { useContext, useState } from "react";
import Board from "./Board";
import { GamesContext, gameStates } from "../GameContext.js";

import styled from "styled-components";
import ShipPicker from "./ShipPicker";
import Carrier from "./Carrier";
import OtherBoard from "./OtherBoard";

import img from "../images/bkg.png";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;
  border-radius: 30px;
`;

const MainSection = () => {
  const { userBoard, otherBoard, gameState, setBoard } =
    useContext(GamesContext);

  const [setupBoard, setSetupBoard] = useState(new Array(49).fill(0));
  const [currentShip, setCurrentShip] = useState(null);

  const [horizontal, setHorizontal] = useState(true);

  const [staging, setStaging] = useState([]);

  const [takenIndexes, setTakenIndexes] = useState(new Set());
  const [availableShips, setAvailableShips] = useState(
    new Set([2, 3, 6, 4, 5])
  );

  const placeShip = (index) => {
    setStaging((s) => [...s, { index, currentShip, horizontal }]);
    let k = new Set([...takenIndexes]);
    if (horizontal) {
      for (let i = index; i < currentShip + index; i++) {
        k.add(i);
      }
    } else {
      let p = index;
      for (let i = 0; i < currentShip; i++) {
        k.add(p);
        p += 7;
      }
    }
    setTakenIndexes(k);
    setAvailableShips((s) => {
      let k = new Set([...s]);
      if (currentShip === 3 && !k.has(3)) {
        k.delete(6);
      } else {
        k.delete(currentShip);
      }
      return k;
    });
    setCurrentShip(null);
  };

  const submitBoard = () => {
    let arr = new Array(49).fill(0);
    for (let ship of staging) {
      if (ship.horizontal) {
        for (let i = ship.index; i < ship.index + ship.currentShip; i++) {
          arr[i] = 1;
        }
      } else {
        let p = ship.index;
        for (let i = 0; i < ship.currentShip; i++) {
          arr[p] = 1;
          p += 7;
        }
      }
    }
    setBoard(arr);
  };

  return (
    <Container>
      <Board
        user={true}
        info={setupBoard}
        placeShip={placeShip}
        currentShip={currentShip}
        horizontal={horizontal}
        staging={staging}
        takenIndexes={takenIndexes}
      />
      {gameState === gameStates.choosing_ships ? (
        <ShipPicker
          setSetupBoard={setSetupBoard}
          currentShip={currentShip}
          setCurrentShip={setCurrentShip}
          setHorizontal={setHorizontal}
          availableShips={availableShips}
          submitBoard={submitBoard}
        />
      ) : (
        <OtherBoard info={otherBoard} />
      )}
    </Container>
  );
};

export default MainSection;
