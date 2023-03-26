import React, { useContext, useState } from "react";
import styled from "styled-components";
import MainSection from "./components/MainSection";
import { GamesContext, gameStates } from "./GameContext";

const Button = styled.div`
  border-radius: 5px;
  padding: 8px 12px;
  background-color: white;
  color: black;
  display: inline-block;
  cursor: pointer;
`;
const Home = () => {
  const [id, setId] = useState("");

  const { connect, sendmsg, gameState } = useContext(GamesContext);

  return (
    <div>
      {gameState === gameStates.choosing_ships ? (
        <MainSection />
      ) : (
        <div>
          {" "}
          <input value={id} onChange={(e) => setId(e.target.value)} />
          <Button onClick={() => connect(id)}>Connect</Button>
          {id}
          <Button onClick={() => sendmsg()}>Sendmsg</Button>
        </div>
      )}
    </div>
  );
};

export default Home;
