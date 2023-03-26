import React, { useContext, useState } from "react";
import styled from "styled-components";
import MainSection from "./components/MainSection";
import { GamesContext, gameStates } from "./GameContext";

const Button = styled.div`
  border-radius: 2px;
  padding: 8px 12px;
  background-color: white;
  color: black;
  display: inline-block;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    opacity: 0.5;
  }
`;
const Home = () => {
  const [ids, setIds] = useState("");

  const { connect, gameState } = useContext(GamesContext);

  const Container = styled.div`
    width: 600px;
    height: 250px;
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
    text-align: center;
  `;

  const InnerCont = styled.div`
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
    width: 350px;
    margin-top: 24px;
    border-radius: 10px 0px 0px 10px;
  `;

  const In = styled.input`
    width: 250px;
    padding: 0px 6px;
  `;

  const Small = styled.div`
    font-size: 14px;
    margin-top: 24px;
    text-align: center;
  `;
  const { id } = useContext(GamesContext);
  return (
    <div>
      {gameState !== gameStates.waiting_for_join ? (
        <div style={{ marginTop: 128 }}>
          <MainSection />
        </div>
      ) : (
        <Container>
          <Header>
            <em>zk-</em>Armada
          </Header>

          <InnerCont>
            <In
              placeholder="Enter opponent's ID"
              value={ids}
              onChange={(e) => setIds(e.target.value)}
            />
            <Button onClick={() => connect(ids)}>Connect</Button>
          </InnerCont>
          <Small>
            Your ID: <strong>{id}</strong>
          </Small>
        </Container>
      )}
    </div>
  );
};

export default Home;
