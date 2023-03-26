import "./App.css";
import MainSection from "./components/MainSection";
import GamesContextProvider from "./GameContext";
import { useMetaMask } from "metamask-react";

import styled from "styled-components";

import img from "./images/battleship-background.png";
import Home from "./Home";

const Outer = styled.div`
  background-image: url(${img});
  min-height: 100vh;
`;

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
  return (
    <Outer>
      <Container>
        <GamesContextProvider>
          {/* <div>
              Connected account {account} on chain ID {chainId}
            </div> */}
          {/* <MainSection /> */}
          <Home />
        </GamesContextProvider>
      </Container>
    </Outer>
  );
}

export default App;
