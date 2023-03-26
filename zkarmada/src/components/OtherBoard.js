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
  background-color: #91b5bd;
  opacity: 0.95;
  display: grid;
  place-content: center;
  color: white;
`;

const OtherBoard = ({ info }) => {
  return (
    <Container>
      {info.map((i, index) => (
        <Square />
      ))}
    </Container>
  );
};

export default OtherBoard;
