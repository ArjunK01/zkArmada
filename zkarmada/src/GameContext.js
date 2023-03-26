import React, { createContext, useEffect, useState } from "react";
import Peer from "peerjs";
import CryptoJS from "crypto-js";
export const GamesContext = createContext();

const default_board = new Array(49).fill(0);

export const gameStates = {
  waiting_for_join: 0,
  choosing_ships: 1,
  your_turn: 2,
  other_turn: 3,
};

const GamesContextProvider = (props) => {
  const [userBoard, setUserBoard] = useState(null);
  const [otherBoard, setOtherBoard] = useState(null);

  const [gameState, setGameState] = useState(gameStates.your_turn);

  const [player1, setPlayer1] = useState(false);

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
      setGameState(gameStates.choosing_ships);
      setPlayer1(true);
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
        setGameState(gameStates.choosing_ships);
        //WHERE PLAYER 2 IS GETTING DATA

        console.log("456");
        console.log(data);
      });
    });
  }, []);

  const sendmsg = () => {
    conn.send("NEWMSH");
  };

  const setBoard = (arr) => {
    setUserBoard(arr);
  };

  //generate random 8 letter key
  function generateKey() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 8) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  //check if the userBoard is the same as the encrypted board
  function validateFinalBoardState(userBoard, myencrypted, hashUserBoard) {
    //check if the userBoard is the same as the encrypted board
    for (let i = 0; i < 49; i++) {
      let encrypted = CryptoJS.SHA256(userBoard[i] + hashUserBoard[i]).toString();
      if (encrypted !== myencrypted[i]) {
        return false;
      }
    }
    return true;
  }

}

const [hashUserBoard, setHashUserBoard] = useState(null);
const [myencrypted, setmyencrypted] = useState([]);

useEffect(() => {
  if (!userBoard) return;
  let arr = [];
  let arrKeys = [];
  console.log(userBoard);
  //ENCRYPTION STUFF
  for (let i = 0; i < 49; i++) {
    arrKeys.push(generateKey());
  }

  for (let i = 0; i < 49; i++) {
    //encrypt each value in the array
    let encrypted = CryptoJS.SHA256(userBoard[i] + arrKeys[i]).toString();
    arr.push(encrypted);
  }
  //take a 7x7 array of random keys, encrypt the values at each index in the array, and then store the encyrpted values in their own array
  setmyencrypted(arr);
  setHashUserBoard(arrKeys);

  console.log(arr);
}, [userBoard]);

return (
  <GamesContext.Provider
    value={{ otherBoard, userBoard, gameState, connect, sendmsg, setBoard }}
  >
    {props.children}
  </GamesContext.Provider>
);
};

export default GamesContextProvider;
