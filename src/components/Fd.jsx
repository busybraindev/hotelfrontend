import React from "react";
// import { roomsDummyData } from "../assets/assets/assets";
import Hc from "./Hc";
import Tittle from "./Tittle";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

const Fd = () => {
  const { rm, nav } = useAppContext();

  return (
    rm.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Tittle
          title={"Featured Destination"}
          subtitle={
            "Discover our handpicked selectiom of exceptional properties around the world, offering unapralled luxury and unforgettable experiences. "
          }
        ></Tittle>
        <div className="flex  items-center justify-center gap-6 mt-20 max-md:flex-col">
          {rm.slice(0, 4).map((room, index) => (
            <Hc key={room._id} room={room} i={index}></Hc>
          ))}
        </div>
        <button
          onClick={() => {
            nav("/rooms");
            scrollTo(0, 0);
          }}
          className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
        >
          View All Destinations
        </button>
      </div>
    )
  );
};

export default Fd;
