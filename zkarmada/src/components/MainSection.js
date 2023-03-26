import React, { useContext, useState } from "react";
import Board from "./Board";
import { GamesContext, gameStates } from "../GameContext.js";

import styled from "styled-components";
import ShipPicker from "./ShipPicker";
import Carrier from "./Carrier";
import OtherBoard from "./OtherBoard";

const Outer = styled.div``;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 50px;
  border-radius: 30px;
`;

const MainSection = () => {
  const { gameState, setBoard, player1, currentGameData, attack, winner } =
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

  const Big = styled.div`
    font-size: 32px;
    font-weight: 500;
  `;

  const BlackCont = styled.div`
    padding: 24px;
    border-radius: 8px;
    background: rgba(71, 71, 71, 0.8);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(10.5px);
    -webkit-backdrop-filter: blur(10.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  `;
  const BlackCont2 = styled.div`
    margin-top: 32px;
    padding: 12px;
    border-radius: 8px;
    background: rgba(71, 71, 71, 0.8);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(10.5px);
    -webkit-backdrop-filter: blur(10.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  `;
  if (gameState === gameStates.game_over_p1win && !player1) {
    return (
      <BlackCont>
        <Big>Game over you lose!</Big>
      </BlackCont>
    );
  }
  if (gameState === gameStates.game_over_p2win && !player1) {
    return (
      <BlackCont>
        <Big>Game over you win!</Big>
      </BlackCont>
    );
  }
  if (gameState === gameStates.game_over_p2win && player1) {
    return (
      <BlackCont>
        <Big>Game over you lose!</Big>
      </BlackCont>
    );
  }
  if (gameState === gameStates.game_over_p1win && !player1) {
    return (
      <BlackCont>
        <Big>Game over you win!</Big>
      </BlackCont>
    );
  }

  if (gameState === gameStates.player1_choosing_ships && !player1)
    return (
      <BlackCont>
        <Big>Waiting for opponent to choose ships...</Big>
      </BlackCont>
    );
  if (gameState === gameStates.player2_choosing_ships && player1)
    return (
      <BlackCont>
        <Big>Waiting for opponent to choose ships...</Big>
      </BlackCont>
    );
  return (
    <Outer>
      <Container>
        <Board
          user={true}
          info={setupBoard}
          placeShip={placeShip}
          currentShip={currentShip}
          horizontal={horizontal}
          staging={staging}
          takenIndexes={takenIndexes}
          revealed={
            player1
              ? currentGameData.player1_revealed_board
              : currentGameData.player2_revealed_board
          }
        />
        {(gameState === gameStates.player1_choosing_ships && player1) ||
        (gameState === gameStates.player2_choosing_ships && !player1) ? (
          <ShipPicker
            setSetupBoard={setSetupBoard}
            currentShip={currentShip}
            setCurrentShip={setCurrentShip}
            setHorizontal={setHorizontal}
            availableShips={availableShips}
            submitBoard={submitBoard}
          />
        ) : (
          <OtherBoard
            disabled={
              (gameState === gameStates.player1_turn && !player1) ||
              (gameState === gameStates.player2_turn && player1)
            }
            info={
              player1
                ? currentGameData.player2_revealed_board
                : currentGameData.player1_revealed_board
            }
            attack={attack}
            winner={winner}
          />
        )}
      </Container>
      {gameState === gameStates.player1_turn ||
      gameState === gameStates.player2_turn ? (
        <BlackCont2>
          <div style={{ fontSize: 18 }}>
            {(gameState === 3 && player1) || (gameState === 4 && !player1)
              ? "It's Your Turn - Choose Coordinates to Attack"
              : "Waiting for Opponent..."}
          </div>
        </BlackCont2>
      ) : (
        "NO"
      )}
    </Outer>
  );
};

export default MainSection;
