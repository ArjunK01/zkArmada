import React, { createContext, useEffect, useState } from "react";
import Peer from "peerjs";
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

  const [currentGameData, setCurrentGameData] = useState({});

  var peer = new Peer();

  const [conn, setconn] = useState(null);

  const connect = (id) => {
    //const socket = new WebSocket(`ws://${ip}:8080`); // Replace the port number if necessary
    var conn = peer.connect(id);
    setconn(conn);
    // on open will be launch when you successfully connect to PeerServer
    conn.on("open", function () {
      // here you have conn.id
      conn.send("hi!");
      // setGameState(gameStates.choosing_ships);
    });
    conn.on("data", function (data) {
      //WHERE PLAYER 1 is GETTING DATA
      console.log("123");
      console.log(data);
    });
  };

  useEffect(() => {
    peer.on("open", function (id) {
      console.log("my peer id ", id);
    });

    peer.on("connection", function (conn) {
      setconn(conn);
      conn.on("data", function (data) {
        // setGameState(gameStates.choosing_ships);
        //WHERE PLAYER 2 IS GETTING DATA
        console.log("456");

        console.log(data);
      });
    });
  }, []);

  const sendmsg = () => {
    conn.send("NEWMSH");
  };

  useEffect(() => {
    console.log("NEWCONN", conn);
  }, [conn]);
  return (
    <GamesContext.Provider
      value={{ otherBoard, userBoard, gameState, connect, sendmsg }}
    >
      {props.children}
    </GamesContext.Provider>
  );
};

export default GamesContextProvider;
