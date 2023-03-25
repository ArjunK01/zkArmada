import "./App.css";
import MainSection from "./components/MainSection";
import GamesContextProvider from "./GameContext";
import { useMetaMask } from "metamask-react";

import styled from "styled-components";

const Container = styled.div`
  max-width: 1100px;
  margin: 0px auto;
  padding: 24px;
`;

const Header = styled.div`
  font-size: 32px;
  margin-top: 24px;
  margin-bottom: 64px;
  color: white;
  font-weight: 600;
  text-align: center;
`;
function App() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  if (status === "initializing")
    return <div>Synchronisation with MetaMask ongoing...</div>;

  if (status === "unavailable") return <div>MetaMask not available :(</div>;

  if (status === "notConnected")
    return <button onClick={connect}>Connect to MetaMask</button>;

  if (status === "connecting") return <div>Connecting...</div>;

  if (status === "connected")
    return (
      <Container>
        <GamesContextProvider>
          <Header>zkArmada</Header>
          <div>
            Connected account {account} on chain ID {chainId}
          </div>
          <MainSection />
        </GamesContextProvider>
      </Container>
    );
}

export default App;
