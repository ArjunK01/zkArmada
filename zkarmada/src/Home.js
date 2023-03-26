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

  const Container = styled.div`
    width: 600px;
    height: 400px;
    margin: 0px auto;
    padding: 24px;
    margin-top: 100px;
    background: rgba(71, 71, 71, 0.8);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(10.5px);
    -webkit-backdrop-filter: blur(10.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  `;

  const Header = styled.div`
    color: white;
    font-size: 40px;
    font-weight: 600;
  `;

  return (
    <div>
      {gameState !== gameStates.waiting_for_join ? (
        <MainSection />
      ) : (
        <Container>
          <Header>zk-Armada</Header>

          <input value={id} onChange={(e) => setId(e.target.value)} />
          <Button onClick={() => connect(id)}>Connect</Button>
          <Button onClick={() => sendmsg()}>Sendmsg</Button>
        </Container>
      )}
    </div>
  );
};

export default Home;
