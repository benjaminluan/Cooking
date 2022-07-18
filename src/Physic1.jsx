import React, { useEffect, useState } from "react";
import Fridge from "./assets/fridge.png";

const Physic1 = () => {
  const [object, setObject] = useState([]);
  const [style, setStyle] = useState([]);
  const INITIAL = 10.0;
  const GRAVITY = 0.2;
  const REBOUND_RATIO = 0.8;
  const DAMPING_RATIO = 0.995;
  let timer;
  let t = 0;
  let mX = window.innerWidth / 2;
  let mY = window.innerHeight / 2;

  useEffect(() => {
    //Set up event callbacks
    let timer;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keypress", onKeyPress);
    //Start the timer
    timer = setInterval(() => {
      update();
    }, 10);
  }, []);

  useEffect(() => {
    if (object.length !== 0) {
      addForce(
        object[object.length - 1],
        Math.random() * INITIAL * 2 - INITIAL,
        Math.random() * INITIAL * 2 - INITIAL
      );
    }
  }, [object]);

  function onMouseMove(e) {
    mX = e.pageX;
    mY = e.pageY;
  }

  function onMouseClick() {
    let r = 100;
    addObject(mX - r / 2, mY - r / 2, r, r);
  }
  function onKeyPress() {
    //Clear the array
    setObject([]);
    //Clear all active and inactive elements
  }

  function addObject(x, y, w, h) {
    //Create DOM element
    setStyle((arr) => [
      ...arr,
      {
        left: x + "px",
        top: y + "px",
        width: w + "px",
        height: h + "px",
      },
    ]);

    let styles = style[style.length - 1];

    let element = React.createElement(
      "img",
      {
        src: "./donut.png",
        className: "image",
        style: styles,
      },
      null
    );

    //Create object
    //Add object to array
    setObject((arr) => [
      ...arr,
      {
        element: element,
        width: w,
        height: h,
        px: x,
        py: y,
        vx: 0,
        vy: 0,
      },
    ]);
  }

  function addForce(obj, x, y) {
    obj.vx += x;
    obj.vy += y;
  }

  function update() {
    object.map((object) => {
      //Apply collisions
      console.log('test')
      if (object.px < 0) {
        //Left
        object.px = 0;
        object.vx *= -REBOUND_RATIO;
      } else if (object.px + object.width > window.innerWidth - 10) {
        //Right
        object.px = window.innerWidth - object.width - 10;
        object.vx *= -REBOUND_RATIO;
      }
      if (object.py < 0) {
        //Top
        object.py = 0;
        object.vy *= -REBOUND_RATIO;
      } else if (object.py + object.height > window.innerHeight - 10) {
        //Bottom
        object.py = window.innerHeight - object.height - 10;
        object.vy *= -REBOUND_RATIO;
      }
      //Apply damping
      object.vx *= DAMPING_RATIO;
      object.vy *= DAMPING_RATIO;
      //Apply gravity
      object.vy += GRAVITY;
      //Update position
      object.px += object.vx;
      object.py += object.vy;
      console.log(object.px);
      setStyle({ left: `${object.vy}px` });
      // object.element.props.style.top = object.py + "px";
    });
    //Increment time
    t++;
  }

  return (
    <>
      <img
        className="landing__image"
        onClick={() => onMouseClick()}
        src={Fridge}
        alt="Fridge"
      />
      {object.map((object) => (
        <div>{object.element}</div>
      ))}
    </>
  );
};

export default Physic1;
