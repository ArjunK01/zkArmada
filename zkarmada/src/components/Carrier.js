import React from "react";
import Img2 from "../images/vector-of-aircraft-carriers (2).png";
import Img3 from "../images/vector-of-aircraft-carriers (3).png";
import Img4 from "../images/vector-of-aircraft-carriers (4).png";
import Img5 from "../images/vector-of-aircraft-carriers (5).png";

const Carrier = (props) => {
  const size = props.size;
  const shipStyles = {
    width: `${size * 60 + (size - 1) * 5}px`,
    height: `60px`,
  };
  let image = Img2;
  if (size == 3) {
    image = Img3;
  } else if (size == 4) {
    image = Img4;
  } else {
    image = Img5;
  }
  return <img src={image} style={shipStyles} />;
};
export default Carrier;
