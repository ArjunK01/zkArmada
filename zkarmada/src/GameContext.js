import React, { createContext, useState } from "react";

export const GamesContext = createContext();

const default_board = new Array(49).fill(0);

export const gameStates = {
  waiting_for_join: 0,
  choosing_ships: 1,
  your_turn: 2,
  other_turn: 3,
};

const GamesContextProvider = (props) => {
  const [userBoard, setUserBoard] = useState([...default_board]);
  const [otherBoard, setOtherBoard] = useState([...default_board]);

  const [gameState, setGameState] = useState(gameStates.your_turn);

  const connect = (ip) => {
    const socket = new WebSocket(`ws://${ip}:8080`); // Replace the port number if necessary

    socket.onopen = function (event) {
      console.log("Connected to server");
    };

    socket.onmessage = function (event) {
      console.log("Received message:", event.data);
    };

    socket.onerror = function (error) {
      console.error("WebSocket error:", error);
    };

    socket.onclose = function (event) {
      console.log("WebSocket connection closed:", event);
    };
  };

  return (
    <GamesContext.Provider
      value={{ otherBoard, userBoard, gameState, connect }}
    >
      {props.children}
    </GamesContext.Provider>
  );
};

export default GamesContextProvider;
