import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carrier from "./Carrier";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 60px);
  grid-template-rows: repeat(7, 60px);
  gap: 5px;
  position: relative;
`;
const Square = styled.div`
  height: 60px;
  width: 60px;
  background-color: ${(props) =>
    props.status === 0 ? "#eaeaea" : props.status === 1 ? "red" : "yellow"};
  opacity: 0.95;
  display: grid;
  place-content: center;
  color: white;
  cursor: ${(props) => (props.currentShip ? "pointer" : null)};
`;

const CarrierContainer = styled.div`
  position: absolute;
  top: ${(props) => props.top + "px"};
  left: ${(props) => props.left + (!props.horizontal ? 60 : 0) + "px"};
  transform: ${(props) => (!props.horizontal ? " rotate(90deg)" : null)};
  transform-origin: top left;
  width: ${(props) => props.currentShip * 60 + (props.currentShip - 1) * 5}px;
  height: 60px;
`;

const Board = ({
  info,
  user,
  placeShip,
  currentShip,
  horizontal,
  staging,
  takenIndexes,
  revealed,
}) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const onMouseEnter = (index) => {
    if (!user) return;
    if (!currentShip) return;
    if (info[index]) return;
    if (horizontal && currentShip + (index % 7) > 7) return;
    if (!horizontal && index + (currentShip - 1) * 7 > 48) return;
    if (!takenIndexes) return;

    if (horizontal) {
      for (let i = index; i < index + currentShip; i++) {
        if (takenIndexes.has(i)) return;
      }
    } else {
      let p = index;
      for (let i = 0; i < currentShip; i++) {
        if (takenIndexes.has(p)) return;
        p += 7;
      }
    }

    setHoverIndex(index);
  };

  const onMouseLeave = (index) => {
    if (!user) return;
  };

  const [placedShips, setPlacedShips] = useState([]);
  useEffect(() => {
    let temp = [];
    for (let ship of staging) {
      temp.push(
        <CarrierContainer
          top={Math.floor(ship.index / 7) * 65}
          left={(ship.index % 7) * 65}
          horizontal={ship.horizontal}
          currentShip={ship.currentShip}
          onClick={() => placeShip(hoverIndex)}
        >
          <Carrier size={ship.currentShip} />
        </CarrierContainer>
      );
    }
    setPlacedShips(temp);
  }, [staging]);

  return (
    <Container>
      {info.map((i, index) => (
        <Square
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={() => onMouseLeave(index)}
          currentShip={currentShip}
          status={revealed ? revealed[index] : 0}
        >
          {i ? i : null}
        </Square>
      ))}
      {placedShips}

      {hoverIndex !== null && (
        <CarrierContainer
          top={Math.floor(hoverIndex / 7) * 65}
          left={(hoverIndex % 7) * 65}
          horizontal={horizontal}
          currentShip={currentShip}
          onClick={() => {
            placeShip(hoverIndex);
            setHoverIndex(null);
          }}
        >
          <Carrier size={currentShip} />
        </CarrierContainer>
      )}
    </Container>
  );
};

export default Board;
