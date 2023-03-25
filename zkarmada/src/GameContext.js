import React, { createContext, useState } from "react";

export const GamesContext = createContext();

const default_board = new Array(100).fill(0);

export const gameStates = {
  waiting_for_join: 0,
  choosing_ships: 1,
  your_turn: 2,
  other_turn: 3,
};

const GamesContextProvider = (props) => {
  const [userBoard, setUserBoard] = useState([...default_board]);
  const [otherBoard, setOtherBoard] = useState([...default_board]);

  const [gameState, setGameState] = useState(gameStates.choosing_ships);

  return (
    <GamesContext.Provider value={{ otherBoard, userBoard, gameState }}>
      {props.children}
    </GamesContext.Provider>
  );
};

export default GamesContextProvider;
