import React from "react";
import "./Landing.css";
import Image from "./components/Image";
import Fridge from "./assets/fridge.png";
import { useSpring, animated } from "react-spring";
import Physic1 from "./Physic1";

const Landing = () => {
  const props = useSpring({
    to: [{ opacity: 1, transform: "scale(1.2) " }, { transform: "scale(1) " }],
    from: {
      opacity: 0,
      transform: "scale(1)",
    },
    delay: 1000,
  });

  return (
    <div className="landing">
      <h1 className="landing__header">Cook 4 Fun</h1>
      {/* <animated.img
        style={props}
        className="landing__image"
        src={Fridge}
        alt="Fridge"
      /> */}
      <Physic1 />
      <Image />
    </div>
  );
};

export default Landing;
