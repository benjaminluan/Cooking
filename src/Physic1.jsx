import React, { useEffect, useState } from "react";
import Fridge from "./assets/fridge.png";

const Physic1 = () => {
  const [objectsArray, setObjects] = useState([]);
  const INITIAL = 10.0;
  const GRAVITY = 0.2;
  const REBOUND_RATIO = 0.8;
  const DAMPING_RATIO = 0.995;
  let timer;
  let t = 0;
  let objects = [];
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

    function update() {
      objectsArray.map((objects) => {
        //Apply collisions
        if (objects.px < 0) {
          //Left
          objects.px = 0;
          objects.vx *= -REBOUND_RATIO;
        } else if (objects.px + objects.width > window.innerWidth - 10) {
          //Right
          objects.px = window.innerWidth - objects.width - 10;
          objects.vx *= -REBOUND_RATIO;
        }
        if (objects.py < 0) {
          //Top
          objects.py = 0;
          objects.vy *= -REBOUND_RATIO;
        } else if (objects.py + objects.height > window.innerHeight - 10) {
          //Bottom
          objects.py = window.innerHeight - objects.height - 10;
          objects.vy *= -REBOUND_RATIO;
        }
        //Apply damping
        objects.vx *= DAMPING_RATIO;
        objects.vy *= DAMPING_RATIO;
        //Apply gravity
        objects.vy += GRAVITY;
        //Update position
        objects.px += objects.vx;
        objects.py += objects.vy;
        // objects.element.props.style.left = objects.px + "px";
        //   objects.element.props.style.top = objects.py + "px";
      });
      //Increment time
      t++;
    }
  }, []);

  useEffect(() => {
    console.log(objectsArray);
  }, [objectsArray]);

  function onMouseMove(e) {
    mX = e.pageX;
    mY = e.pageY;
  }
  function onMouseClick() {
    let r = 100;
    addObject(mX - r / 2, mY - r / 2, r, r);
    addForce(
      objects[objects.length - 1],
      Math.random() * INITIAL * 2 - INITIAL,
      Math.random() * INITIAL * 2 - INITIAL
    );
  }
  function onKeyPress() {
    //Clear the array
    objects = [];
    //Clear all active and inactive elements
  }
  function addObject(x, y, w, h) {
    //Create DOM element
    let element = React.createElement(
      "img",
      {
        src: "./donut.png",
        className: "image",
        style: {
          left: x + "px",
          top: y + "px",
          width: w + "px",
          height: h + "px",
          writable: true
        },
      },
      null
    );

    //Create object
    let object = {
      element: element,
      width: w,
      height: h,
      px: x,
      py: y,
      vx: 0,
      vy: 0,
    };
    //Add object to array
    objects.push(object);
    setObjects((arr) => [...arr, object]);
  }
  function addForce(obj, x, y) {
    obj.vx += x;
    obj.vy += y;
  }

  return (
    <>
      <img
        className="landing__image"
        onClick={() => onMouseClick()}
        src={Fridge}
        alt="Fridge"
      />
      {objectsArray.map((object) => (
        <div>{object.element}</div>
      ))}
    </>
  );
};

export default Physic1;
