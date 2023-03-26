import React, { useContext, useState } from "react";
import styled from "styled-components";
import { GamesContext } from "../GameContext";
import Carrier from "./Carrier";

const Container = styled.div`
  width: 600px;

  padding: 16px;
  border-radius: 10px;
  background: rgba(71, 71, 71, 0.8);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const ShipsContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Ship = styled.div`
  border: 2px solid white;
  padding: 8px 24px;
  border-radius: 5px;
  background-color: ${(props) => (props.highlighted ? "#034f66" : null)};
  width: ${(props) =>
    props.currentShip * 45 + (props.currentShip - 1) * 5 + 48}px;
  height: (45+16) px;
  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

const RotateButton = styled.div`
  padding: 8px 12px;
  background-color: white;
  color: black;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
  margin-top: 24px;
  font-weight: 600;

  &:hover {
    background-color: #0f7e7c;
    color: white;
  }
`;

const SubmitButton = styled.div`
  padding: 8px 12px;
  background-color: #027a21;
  color: white;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;

  &:hover {
    background-color: #025d19;
  }
`;

const ShipPicker = ({
  currentShip,
  setCurrentShip,
  setHorizontal,
  availableShips,
  submitBoard,
}) => {
  const { setBoard } = useContext(GamesContext);
  return (
    <Container>
      <Header>Place your ships</Header>
      <ShipsContainer>
        {[...availableShips].map((i) => (
          <Ship
            highlighted={i === currentShip}
            onClick={() => setCurrentShip(i === 6 ? 3 : i)}
            currentShip={i === 6 ? 3 : i}
          >
            <Carrier size={i === 6 ? 3 : i} />
          </Ship>
        ))}
      </ShipsContainer>
      {availableShips.size ? (
        <RotateButton onClick={() => setHorizontal((h) => !h)}>
          Rotate
        </RotateButton>
      ) : (
        <SubmitButton onClick={() => submitBoard()}>Submit</SubmitButton>
      )}
    </Container>
  );
};

export default ShipPicker;
