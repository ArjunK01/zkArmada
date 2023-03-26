import React, { createContext, useEffect, useState } from "react";
import Peer from "peerjs";
import CryptoJS from "crypto-js";
export const GamesContext = createContext();

const default_board = new Array(49).fill(0);

export const gameStates = {
  waiting_for_join: 0,
  player1_choosing_ships:1,
  player2_choosing_ships: 2,
  player1_turn: 3,
  player2_turn: 4,
  player1_to_give_keys:5,
  player2_to_give_keys:6,
  player1_receiving_key:7,
  player2_receiving_key:8
};


const gameObject={
  player1_encrypted_board:new Array(49).fill(0),
  player2_encrypted_board:new Array(49).fill(0),
  requestingKeyIndex:0,
  player_turn:1,
  player1_revealed_board:new Array(49).fill(0),
  player2_revealed_board:new Array(49).fill(0),
  game_state:gameStates.player1_choosing_ships,
  key:""
}

const GamesContextProvider = (props) => {
  const [userBoard, setUserBoard] = useState(null);
  const [otherBoard, setOtherBoard] = useState(null);

  const [gameState, setGameState] = useState(gameStates.your_turn);
  const [gameObject,setGameObject]=useState(gameObject)
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
        tGameObject=JSON.parse(data)
        
        setGameState(tGameObject.game_state)
        if(tGameObject.game_state==player2_choosing_ships){
          tGameObject.player2_encrypted_board=myencrypted
          tGameObject.game_state=gameStates.player1_turn
          tGameObject.player_turn=1
        }else if(gameObject.game_state==gameStates.player2_to_give_keys){
          tGameObject.key=hashUserBoard[tGameObject.requestingKeyIndex]
          tGameObject.game_state=gameStates.player1_receiving_key
          tempGameObject.player_turn=1
        }else if(gameObject.gameState==gameStates.player2_receiving_key){
          value=decrypt(tGameObject.player1_encrypted_board[tGameObject.requestingKeyIndex],tGameObject.key)
          if(value<0){
            cheating
          }else if(value==0){
            tGameObject.player1_revealed_board[tGameObject.requestingKeyIndex]=2
          }else{
            tGameObject.player1_revealed_board[tGameObject.requestingKeyIndex]=1
          }
          tGameObject.game_state=gameStates.player1_turn
          tGameObject.player_turn=1
        }else if(gameObject.gameState==gameStates.player2_turn){
          //retrieve guess index from front end
          tGameObject.requestingKeyIndex=index
          tGameObject.game_state=gameStates.player1_to_give_keys
          tGameObject.player_turn=1
        }

        setGameObject(tGameObject)
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