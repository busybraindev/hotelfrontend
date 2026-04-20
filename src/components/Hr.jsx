import React, { useState } from "react";
import { assets, cities } from "../assets/assets/assets";
import { useAppContext } from "../Context/AppContext.jsx";
import toast from "react-hot-toast";

const Hr = () => {
  const { sshg, axios, getToken, sis } = useAppContext();
  const [name, snm] = useState("");
  const [address, sad] = useState("");
  const [contact, sct] = useState("");
  const [city, scy] = useState("");

  // console.log(axios);

  const hs = async (event) => {
    try {
      event.preventDefault();

      const token = await getToken();
      console.log(token);

      if (!token) {
        toast.error("Not authenticated");
        return;
      }

      const { data } = await axios.post(
        "/api/hotels/",
        { name, address, city, contact },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        sis(true);
        sshg(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div
      onClick={() => sshg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70"
    >
      <form
        className="flex bg-white rounded-xl max-md:mx-2 mt-30"
        onSubmit={hs}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={assets.regImage}
          alt=""
          className="w-1/2 rounded-xl hidden md:block"
        />
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            src={assets.closeIcon}
            onClick={() => sshg(false)}
            alt=""
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
          />
          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>

          <div className="w-full mt-4">
            <label htmlFor="name" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => snm(e.target.value)}
              type="text"
              placeholder="Type here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => sct(e.target.value)}
              id="contact"
              placeholder="Type here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => sad(e.target.value)}
              placeholder="Type here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4 max-w-60 mr-auto">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => scy(e.target.value)}
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => {
                return (
                  <option key={city} value={city}>
                    {city}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Hr;
