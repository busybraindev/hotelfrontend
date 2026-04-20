import React, { useEffect, useState } from "react";
// import { roomsDummyData } from "../assets/assets/assets";
import Hc from "./Hc";
import Tittle from "./Tittle";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

const Rc = () => {
  const { rm, sc } = useAppContext();
  const [rc, src] = useState([]);
  console.log(sc);

  const fh = () => {
    const fr = rm.slice().filter((room) => sc.includes(room.hotel.city));
    console.log(fr);

    src(fr);
  };
  useEffect(() => {
    fh();
  }, [rm, sc]);

  return (
    rc.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Tittle
          title={"Recommended Hotels"}
          subtitle={
            "Discover our handpicked selectiom of exceptional properties around the world, offering unapralled luxury and unforgettable experiences. "
          }
        ></Tittle>
        <div className="flex  items-center justify-center gap-6 mt-20 max-md:flex-col">
          {rc.slice(0, 4).map((room, index) => (
            <Hc key={room._id} room={room} i={index}></Hc>
          ))}
        </div>
      </div>
    )
  );
};

export default Rc;
