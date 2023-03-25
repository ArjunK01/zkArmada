import "./App.css";
import MainSection from "./components/MainSection";
import GamesContextProvider from "./GameContext";

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
  return (
    <Container>
      <GamesContextProvider>
        <Header>zkArmada</Header>

        <MainSection />
      </GamesContextProvider>
    </Container>
  );
}

export default App;
