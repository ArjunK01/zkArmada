import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 600px;
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const ShipsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const Ship = styled.div`
  border: 2px solid #034f66;
  padding: 8px 24px;
  border-radius: 5px;
  background-color: ${(props) => (props.highlighted ? "#034f66" : null)};
  &:hover {
    background-color: #034f66;
    cursor: pointer;
  }
`;

const RotateButton = styled.div`
  padding: 8px 12px;
  background-color: #025066;
  color: white;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
  margin-top: 24px;

  &:hover {
    background-color: #014255;
  }
`;

const SubmitButton = styled.div`
  padding: 8px 12px;
  background-color: #027a21;
  color: white;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
  margin-top: 24px;

  &:hover {
    background-color: #025d19;
  }
`;

const ShipPicker = ({
  currentShip,
  setCurrentShip,
  setHorizontal,
  availableShips,
}) => {
  return (
    <Container>
      <Header>Pick your ships</Header>
      <ShipsContainer>
        {[...availableShips].map((i) => (
          <Ship
            highlighted={i === currentShip}
            onClick={() => setCurrentShip(i === 6 ? 3 : i)}
          >
            {i === 6 ? 3 : i}
          </Ship>
        ))}
      </ShipsContainer>
      {availableShips.size ? (
        <RotateButton onClick={() => setHorizontal((h) => !h)}>
          Rotate
        </RotateButton>
      ) : (
        <SubmitButton>Submit</SubmitButton>
      )}
    </Container>
  );
};

export default ShipPicker;
