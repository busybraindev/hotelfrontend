import React, { useMemo, useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import St from "../components/St";
import { useAppContext } from "../Context/AppContext";
const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      ></input>
      <span className="font-light select-none">{label}</span>
    </label>
  );
};
const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      ></input>
      <span className="font-light select-none">{label}</span>
    </label>
  );
};
const All = () => {
  const [sp, ssp] = useSearchParams();
  const { rm, nav, currency } = useAppContext();
  console.log(rm);

  const [sf, ssf] = useState({
    roomTypes: [],
    priceRange: [],
  });
  const [ss, sst] = useState("");

  const [ofl, sof] = useState(false);
  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const Prices = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"];
  const Sorts = ["Price Low to High", "Price High to Low", "Newest First"];
  const hf = (checked, value, type) => {
    ssf((pf) => {
      const upf = { ...pf };
      if (checked) {
        upf[type].push(value);
      } else {
        upf[type] = upf[type].filter((item) => item !== value);
      }
      return upf;
    });
  };
  const hs = (sort) => {
    sst(sort);
  };
  const matchesRoomType = (room) => {
    return sf.roomTypes.length === 0 || sf.roomTypes.includes(room.roomType);
  };
  const matchesPrice = (room) => {
    return (
      sf.priceRange.length === 0 ||
      sf.priceRange.some((range) => {
        const [min, max] = range.split(" to ").map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    );
  };
  const sortRooms = (a, b) => {
    if (ss === "Price Low to High") {
      return a.pricePerNight - b.pricePerNight;
    }
    if (ss === "Price High to Low") {
      return b.pricePerNight - a.pricePerNight;
    }
    if (ss === "Newest First") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  };

  const fd = (room) => {
    const destination = sp.get("destination");
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };
  const fR = useMemo(() => {
    return rm
      .filter((room) => matchesRoomType(room) && matchesPrice(room) && fd(room))
      .sort(sortRooms);
  }, [rm, sf, ss, sp]);

  const cf = () => {
    ssf({
      roomTypes: [],
      priceRange: [],
    });
    sst("");
    ssp({});
  };
  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            {" "}
            Take Advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>
        {fR.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
          >
            <img
              src={room.images[0]}
              alt=""
              title="View Room Details"
              className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
              onClick={() => {
                (nav(`/rooms/${room._id}`), scrollTo(0, 0));
              }}
            />
            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500"> {room.hotel.city}</p>
              <p
                onClick={() => {
                  (nav(`/rooms/${room._id}`), scrollTo(0, 0));
                }}
                className="text-gray-800 text-3xl font-playfair cursor-pointer"
              >
                {room.hotel.name}
              </p>
              <div className="flex items-center">
                <St></St>
                <p className="ml-2">200+ reviews</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                <img src={assets.locationIcon} alt="" />
                <span>{room.hotel.address}</span>
              </div>
              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                  >
                    <img src={facilityIcons[item]} className="w-5 h-5"></img>
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-xl font-medium text-gray-700">
                ${room.pricePerNight}/night
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5 lg:border-b border-gray-300 ${ofl && "border-b"}`}
        >
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="text-xs  cursor-pointer">
            <span onClick={() => sof(!ofl)} className="lg:hidden">
              {ofl ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block">CLEAR</span>
          </div>
        </div>
        <div
          className={`${ofl ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}
        >
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular filters</p>
            {roomTypes.map((room, index) => {
              return (
                <CheckBox
                  key={index}
                  label={room}
                  selected={sf.roomTypes.includes(room)}
                  onChange={(checked) => hf(checked, room, "roomTypes")}
                ></CheckBox>
              );
            })}
          </div>
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {Prices.map((range, index) => {
              return (
                <CheckBox
                  key={index}
                  label={`$ ${range}`}
                  selected={sf.priceRange.includes(range)}
                  onChange={(checked) => hf(checked, range, "priceRange")}
                ></CheckBox>
              );
            })}
          </div>
          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800 pb-2">Sort by</p>
            {Sorts.map((option, index) => {
              return (
                <RadioButton
                  key={index}
                  label={option}
                  selected={ss === option}
                  onChange={() => hs(option)}
                ></RadioButton>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default All;
