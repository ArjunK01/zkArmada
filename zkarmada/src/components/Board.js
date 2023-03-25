import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 45px);
  grid-template-rows: repeat(10, 45px);
  gap: 5px;
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

const Board = ({ info, user, setSetupBoard, currentShip, horizontal }) => {
  const onMouseEnter = (index) => {
    if (!user) return;
    if (info[index]) return;
    if (horizontal && currentShip + (index % 10) > 10) return;
    if (!horizontal && index + currentShip * 10 > 99) return;

    setSetupBoard((s) => {
      let temp = [...s];
      if (horizontal) {
        for (let i = index; i < currentShip + index; i++) {
          temp[i] = currentShip;
        }
      } else {
        let k = index;
        for (let i = 0; i < currentShip; i++) {
          temp[k] = currentShip;
          k += 10;
        }
      }
      return temp;
    });
  };

  const onMouseLeave = (index) => {
    if (!user) return;
    setSetupBoard((s) => {
      let temp = [...s];
      if (horizontal) {
        for (let i = index; i < currentShip + index; i++) {
          temp[i] = 0;
        }
      } else {
        let k = index;
        for (let i = 0; i < currentShip; i++) {
          temp[k] = 0;
          k += 10;
        }
      }

      return temp;
    });
  };

  return (
    <Container>
      {info.map((i, index) => (
        <Square
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={() => onMouseLeave(index)}
          currentShip={currentShip}
        >
          {i ? i : null}
        </Square>
      ))}
    </Container>
  );
};

export default Board;
