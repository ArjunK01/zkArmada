import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { GamesContext } from "../GameContext";

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
    !props.i ? "#eaeaea" : props.i === 1 ? "green" : "yellow"};
  opacity: 0.95;
  display: grid;
  place-content: center;
  color: white;

  cursor: ${(props) => (props.disabled ? null : "pointer")};

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? !props.i
          ? "#eaeaea"
          : props.i === 1
          ? "green"
          : "yellow"
        : "#69848A"};
  }
`;

const OtherBoard = ({ info, disabled, attack, winner }) => {
  useEffect(() => {
    let k = info.filter((i) => i == 1);

    if (k.length == 17) {
      winner();
    }
  }, [info]);
  return (
    <Container>
      {info.map((i, index) => (
        <Square
          disabled={disabled || i !== 0}
          onClick={() => {
            if (disabled || i !== 0) return;
            attack(index);
          }}
          i={i}
        ></Square>
      ))}
    </Container>
  );
};

export default OtherBoard;
