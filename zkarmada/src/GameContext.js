import React, { createContext, useEffect, useState } from "react";
import Peer from 'peerjs'
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

  var peer= new Peer()

  const connect = (id) => {
    //const socket = new WebSocket(`ws://${ip}:8080`); // Replace the port number if necessary
    var conn = peer.connect(id);
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function(){
      // here you have conn.id
      conn.send('hi!');
    });
  };

  useEffect(()=>{
    peer.on("open",function(id){
      console.log("my peer id ", id) 
    })

    peer.on('connection', function(conn) {
      conn.on('data', function(data){
        console.log(data);
      });
    });

  },[])

  return (
    <GamesContext.Provider
      value={{ otherBoard, userBoard, gameState, connect }}
    >
      {props.children}
    </GamesContext.Provider>
  );
};

export default GamesContextProvider;
