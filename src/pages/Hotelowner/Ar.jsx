import React, { useState } from "react";
import Tittle from "../../components/Tittle";
import { assets } from "../../assets/assets/assets";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const Ar = () => {
  const { axios, getToken } = useAppContext();
  const [im, sim] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [ip, sip] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });
  const [ld, sld] = useState(false);
  const hs = async (e) => {
    e.preventDefault();
    if (
      !ip.roomType ||
      !ip.pricePerNight ||
      !ip.amenities ||
      !Object.values(im).some((sg) => sg)
    ) {
      toast.error("Please Fill in all the details");
      return;
    }
    sld(true);
    try {
      const token = await getToken();

      if (!token) {
        console.log("Token not ready !!");
        return;
      }
      const formData = new FormData();
      formData.append("roomType", ip.roomType);
      formData.append("pricePerNight", ip.pricePerNight);
      const amenities = Object.keys(ip.amenities).filter(
        (key) => ip.amenities[key],
      );
      formData.append("amenities", JSON.stringify(amenities));
      Object.keys(im).forEach((key) => {
        im[key] && formData.append("images", im[key]);
      });

      const { data } = await axios.post("/api/room/", formData, {
        headers: `Authorization : Bearer ${token}`,
      });
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        sip({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free Wifi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });
        sim({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      sld(false);
    }
  };
  return (
    <form onSubmit={hs}>
      <Tittle
        align={"left"}
        font={"outfit"}
        title={"Add Room"}
        subtitle={
          "Fill in the details carefully and accurate room details, Pricing and amenities, to enhance the user booking experience"
        }
      ></Tittle>
      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(im).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              className="max-h-133 cursor-pointer opacity-80 w-[80px]"
              src={im[key] ? URL.createObjectURL(im[key]) : assets.uploadArea}
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              onChange={(e) => sim({ ...im, [key]: e.target.files[0] })}
              hidden
            />
          </label>
        ))}
      </div>
      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            value={ip.roomType}
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
            onChange={(e) => sip({ ...ip, roomType: e.target.value })}
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        <div className="mt-4 text-gray-800">
          <p>
            Price <span className="text-xs">/night</span>
          </p>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            value={ip.pricePerNight}
            onChange={(e) => sip({ ...ip, pricePerNight: e.target.value })}
          />
        </div>
      </div>
      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {Object.keys(ip.amenities).map((amenity, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={ip.amenities[amenity]}
              onChange={() =>
                sip({
                  ...ip,
                  amenities: {
                    ...ip.amenities,
                    [amenity]: !ip.amenities[amenity],
                  },
                })
              }
            />
            <label htmlFor={`amenities${index + 1}`}> {amenity}</label>
          </div>
        ))}
      </div>
      <button
        className="bg-primary text-white px-8 py-2 rounded mt-8"
        disabled={ld}
      >
        {ld ? "Adding" : "Add Room"}
      </button>
    </form>
  );
};

export default Ar;
