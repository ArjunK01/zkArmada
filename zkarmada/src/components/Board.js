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
`;

const Board = ({ info }) => {
  return (
    <Container>
      {info.map((i) => (
        <Square />
      ))}
    </Container>
  );
};

export default Board;
