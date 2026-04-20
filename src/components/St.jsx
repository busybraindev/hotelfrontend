import React from "react";
import { assets } from "../assets/assets/assets";

const St = ({ rating = 4 }) => {
  return (
    <>
      {Array(5)
        .fill("")
        .map((_, index) => (
          <img
            src={
              rating > index ? assets.starIconFilled : assets.starIconOutlined
            }
            className="w-4.5 h-4.5"
          ></img>
        ))}
    </>
  );
};

export default St;
