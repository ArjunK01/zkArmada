import React, { createContext, useEffect, useState } from "react";
import Peer from "peerjs";
import CryptoJS from "crypto-js";
export const GamesContext = createContext();

const default_board = new Array(49).fill(0);

export const gameStates = {
  waiting_for_join: 0,
  player1_choosing_ships: 1,
  player2_choosing_ships: 2,
  player1_turn: 3,
  player2_turn: 4,
  player1_to_give_keys: 5,
  player2_to_give_keys: 6,
  player1_receiving_key: 7,
  player2_receiving_key: 8,
};

const gameObject = {
  player1_encrypted_board: new Array(49).fill(0),
  player2_encrypted_board: new Array(49).fill(0),
  requestingKeyIndex: 0,
  player_turn: 1,
  player1_revealed_board: new Array(49).fill(0),
  player2_revealed_board: new Array(49).fill(0),
  game_state: gameStates.player1_choosing_ships,
  key: "",
};

const GamesContextProvider = (props) => {
  const [userBoard, setUserBoard] = useState(null);

  const [gameState, setGameState] = useState(gameStates.waiting_for_join);
  // const [gameObject, setGameObject] = useState(gameObject);
  const [player1, setPlayer1] = useState(false);

  const [currentGameData, setCurrentGameData] = useState({
    player1_revealed_board: new Array(49).fill(0),
    player2_revealed_board: new Array(49).fill(0),
  });

  var peer = new Peer();

  const [conn, setconn] = useState(null);

  const connect = (id) => {
    //const socket = new WebSocket(`ws://${ip}:8080`); // Replace the port number if necessary
    var conn = peer.connect(id);
    setconn(conn);
    // on open will be launch when you successfully connect to PeerServer
    conn.on("open", function () {
      // here you have conn.id
      conn.send({ next_game_state: 1 });
      setPlayer1(true);
      setGameState(gameStates.player1_choosing_ships);
    });
    conn.on("data", function (data) {
      //WHERE PLAYER 1 is GETTING DATA
      setGameState(data.next_game_state);
      setCurrentGameData((g) => ({ ...g, player2_encrypted_board: data.arr }));
    });
  };

  useEffect(() => {
    peer.on("open", function (id) {
      console.log("my peer id ", id);
    });

    peer.on("connection", function (conn) {
      setconn(conn);
      conn.on("data", function (data) {
        let tGameObject = data;

        setGameState(tGameObject.next_game_state);

        if (tGameObject.next_game_state === gameStates.player2_choosing_ships) {
          setCurrentGameData((g) => ({
            ...g,
            player1_encrypted_board: data.arr,
          }));
        }

        // setGameState(gameStates.choosing_ships);
        //WHERE PLAYER 2 IS GETTING DATA

        // if (tGameObject.game_state == player2_choosing_ships) {
        //   tGameObject.player2_encrypted_board = myencrypted;
        //   tGameObject.game_state = gameStates.player1_turn;
        //   tGameObject.player_turn = 1;
        // } else if (gameObject.game_state == gameStates.player2_to_give_keys) {
        //   tGameObject.key = hashUserBoard[tGameObject.requestingKeyIndex];
        //   tGameObject.game_state = gameStates.player1_receiving_key;
        //   tempGameObject.player_turn = 1;
        // } else if (gameObject.gameState == gameStates.player2_receiving_key) {
        //   value = decrypt(
        //     tGameObject.player1_encrypted_board[tGameObject.requestingKeyIndex],
        //     tGameObject.key
        //   );
        //   if (value < 0) {
        //     cheating;
        //   } else if (value == 0) {
        //     tGameObject.player1_revealed_board[
        //       tGameObject.requestingKeyIndex
        //     ] = 2;
        //   } else {
        //     tGameObject.player1_revealed_board[
        //       tGameObject.requestingKeyIndex
        //     ] = 1;
        //   }
        //   tGameObject.game_state = gameStates.player1_turn;
        //   tGameObject.player_turn = 1;
        // } else if (gameObject.gameState == gameStates.player2_turn) {
        //   //retrieve guess index from front end
        //   tGameObject.requestingKeyIndex = index;
        //   tGameObject.game_state = gameStates.player1_to_give_keys;
        //   tGameObject.player_turn = 1;
        // }
        // setGameState(tGameObject.game_state);
        // setGameObject(tGameObject);
        console.log("456");
        console.log(data);
      });
    });
  }, [gameState]);

  useEffect(() => {
    console.log("GAMESTATE", gameState);
  }, [gameState]);
  const sendmsg = () => {
    // if (
    //   player1 == true &&
    //   (gameObject.gameState == gameStates.player2_choosing_ships ||
    //     gameObject.gameState == gameStates.player2_receiving_key ||
    //     gameObject.gameState == gameStates.player2_turn ||
    //     gameObject.gameState == gameStates.player2_to_give_keys)
    // ) {
    //   //pass
    // } else if (
    //   player1 == false &&
    //   (gameObject.gameState == gameStates.player1_choosing_ships ||
    //     gameObject.gameState == gameStates.player1_receiving_key ||
    //     gameObject.gameState == gameStates.player1_turn ||
    //     gameObject.gameState == gameStates.player1_to_give_keys)
    // ) {
    //   //pass
    // } else {
    //   conn.send(gameObject);
    // }
    conn.send("message");
  };

  const setBoard = (arr) => {
    setUserBoard(arr);
  };

  //generate random 8 letter key
  function generateKey() {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
      let encrypted = CryptoJS.SHA256(
        userBoard[i] + hashUserBoard[i]
      ).toString();
      if (encrypted !== myencrypted[i]) {
        return false;
      }
    }
    return true;
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
    if (player1) {
      setGameState(gameStates.player2_choosing_ships);
      conn.send({ arr, next_game_state: gameStates.player2_choosing_ships });
    } else {
      setGameState(gameStates.player1_turn);
      conn.send({ arr, next_game_state: gameStates.player1_turn });
    }
  }, [userBoard]);

  return (
    <GamesContext.Provider
      value={{
        userBoard,
        gameState,
        connect,
        sendmsg,
        setBoard,
        player1,
        currentGameData,
      }}
    >
      {props.children}
    </GamesContext.Provider>
  );
};

export default GamesContextProvider;
