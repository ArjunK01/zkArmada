import React, { useContext, useState } from "react";
import styled from "styled-components";
import { GamesContext } from "./GameContext";

const Button = styled.div`
  border-radius: 5px;
  padding: 8px 12px;
  background-color: white;
  color: black;
  display: inline-block;
  cursor: pointer;
`;
const Home = () => {
  const [ip, setIp] = useState("");

  const { connect } = useContext(GamesContext);

  return (
    <div>
      <input value={ip} onChange={(e) => setIp(e.target.value)} />
      <Button onClick={() => connect(ip)}>Connect</Button>
      {ip}
    </div>
  );
};

export default Home;
