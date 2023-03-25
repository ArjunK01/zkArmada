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
const ShipPicker = ({ setSetupBoard, currentShip, setCurrentShip }) => {
  const [ships, setShips] = useState(new Set([2, 3, 3, 4, 5]));
  const [positions, setPositions] = useState({});

  return (
    <Container>
      <Header>Pick your ships</Header>
      <ShipsContainer>
        {[...ships].map((i) => (
          <Ship
            highlighted={i === currentShip}
            onClick={() => setCurrentShip(i)}
          >
            {i}
          </Ship>
        ))}
      </ShipsContainer>
    </Container>
  );
};

export default ShipPicker;
