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
  border: 1px solid #034f66;
  padding: 8px 24px;
  border-radius: 5px;
  &:hover {
    background-color: #034f66;
    cursor: pointer;
  }
`;
const ShipPicker = () => {
  const [ships, setShips] = useState(new Set([2, 3, 3, 4, 5]));
  const [positions, setPositions] = useState({});
  const [currentShip, setCurrentShip] = useState(null);

  return (
    <Container>
      <Header>Pick your ships</Header>
      <ShipsContainer>
        {[...ships].map((i) => (
          <Ship>{i}</Ship>
        ))}
      </ShipsContainer>
    </Container>
  );
};

export default ShipPicker;
