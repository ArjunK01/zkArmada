import React from "react";
import styled from "styled-components";

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
    !props.i ? "#91b5bd" : props.i === 1 ? "green" : "yellow"};
  opacity: 0.95;
  display: grid;
  place-content: center;
  color: white;

  cursor: ${(props) => (props.disabled ? null : "pointer")};

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? !props.i
          ? "#91b5bd"
          : props.i === 1
          ? "green"
          : "yellow"
        : "#69848A"};
  }
`;

const OtherBoard = ({ info, disabled, attack }) => {
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
