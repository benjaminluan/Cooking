import React from "react";
import Donut from "../assets/donut.png";
import './Image.css'
const Image = () => {
  return (
    <div >
      <img className="image" src={Donut} alt="" />
    </div>
  );
};

export default Image;
