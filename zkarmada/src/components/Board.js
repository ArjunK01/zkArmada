import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carrier from "./Carrier";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 45px);
  grid-template-rows: repeat(10, 45px);
  gap: 5px;
  position: relative;
`;
const Square = styled.div`
  height: 45px;
  width: 45px;
  background-color: #8fa0a8;
  display: grid;
  place-content: center;
  color: white;
  cursor: ${(props) => (props.currentShip ? "pointer" : null)};
`;

const CarrierContainer = styled.div`
  position: absolute;
  top: ${(props) => props.top + "px"};
  left: ${(props) => props.left + (!props.horizontal ? 45 : 0) + "px"};
  transform: ${(props) => (!props.horizontal ? " rotate(90deg)" : null)};
  transform-origin: top left;
  width: ${(props) => props.currentShip * 45 + (props.currentShip - 1) * 5}px;
  height: 45px;
`;

const Board = ({
  info,
  user,
  placeShip,
  currentShip,
  horizontal,
  staging,
  takenIndexes,
}) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const onMouseEnter = (index) => {
    if (!user) return;
    if (!currentShip) return;
    if (info[index]) return;
    if (horizontal && currentShip + (index % 10) > 10) return;
    if (!horizontal && index + (currentShip - 1) * 10 > 99) return;
    if (!takenIndexes) return;

    if (horizontal) {
      for (let i = index; i < index + currentShip; i++) {
        if (takenIndexes.has(i)) return;
      }
    } else {
      let p = index;
      for (let i = 0; i < currentShip; i++) {
        if (takenIndexes.has(p)) return;
        p += 10;
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
          top={Math.floor(ship.index / 10) * 50}
          left={(ship.index % 10) * 50}
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
          onClick={() => console.log("CLICK")}
        >
          {i ? i : null}
        </Square>
      ))}
      {placedShips}

      {hoverIndex !== null && (
        <CarrierContainer
          top={Math.floor(hoverIndex / 10) * 50}
          left={(hoverIndex % 10) * 50}
          horizontal={horizontal}
          currentShip={currentShip}
          onClick={() => placeShip(hoverIndex)}
        >
          <Carrier size={currentShip} />
        </CarrierContainer>
      )}
    </Container>
  );
};

export default Board;

// setSetupBoard((s) => {
//   let temp = [...s];
//   if (horizontal) {
//     for (let i = index; i < currentShip + index; i++) {
//       temp[i] = currentShip;
//     }
//   } else {
//     let k = index;
//     for (let i = 0; i < currentShip; i++) {
//       temp[k] = currentShip;
//       k += 10;
//     }
//   }
//   return temp;
// });
