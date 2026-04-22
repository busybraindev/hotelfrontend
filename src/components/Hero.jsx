import React, { useState } from "react";
import { assets, cities } from "../assets/assets/assets";
import { useAppContext } from "../Context/AppContext";

const Hero = () => {
  const [dt, std] = useState("");
  const { nav, axios, ssc, getToken } = useAppContext();
  const onSearch = async (e) => {
    e.preventDefault();
    const token = await getToken();
    console.log(token);

    if (!token) {
      console.log("Token not ready !!");
      return;
    }
    nav(`/rooms?destination=${dt}`);
    await axios.post(
      "/api/user/store",
      { recentSearchedCities: dt },
      { headers: `Authorization : Bearer ${token}` },
    );
    ssc((pv) => {
      const nw = [...pv, dt];
      if (nw.length > 3) {
        nw.shift();
      }
      return nw;
    });
  };
  return (
    <div
      className='flex flex-col items-start justify-center px-6  md:px-16 lg:px-24 xl:px-32 text-white bg-[url("src/../assets/assets/heroImage.png")] bg-no-repeat bg-cover bg-center
     h-screen'
    >
      <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-40">
        The Ultimate Hotel Experience
      </p>
      <h1 className="font-playfair text-2xl  md:text-[56px] md:leading-[64px] font-bold md:font-extrabold max-w-xl mt-4">
        Discover Your Perfect Gateway Destination
      </h1>
      <p className="max-w-130 mt-2 text-sm md:text-base">
        Unparalleled luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today.{" "}
      </p>
      <form
        onSubmit={onSearch}
        className="bg-white text-gray-500 mt-8 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto max-md:mb-10"
      >
        <div className="w-full">
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} className="h-4" alt="" />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            onChange={(e) => std(e.target.value)}
            value={dt}
            type="text"
            list="destinations"
            id="destinationInput"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-md:w-full"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => {
              console.log(city);

              return <option value={city} key={index}></option>;
            })}
          </datalist>
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} className="h-4" alt="" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            type="date"
            id="checkIn"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-md:w-full"
          />
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} className="h-4" alt="" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            type="date"
            id="checkOut"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-md:w-full"
          />
        </div>
        <div className="flex md:flex-col max-md:gap-2 max-md:items-center w-full">
          <label htmlFor="guests">Guests</label>
          <input
            type="number"
            min={1}
            max={4}
            id="guests"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-20"
            placeholder="0"
          />
        </div>
        <button
          className="flex items-center justify-center gap-1 rounded-md bg-black  text-white my-auto cursor-pointer
         max-md:py-1 p-6"
        >
          <img src={assets.searchIcon} alt="" className="h-7" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
//  1rem is equal to 16px,
//  1 in tailswind is 1/4 in rem

// fontSize: {
//   sm: ['0.875rem', { lineHeight: '1.25rem' }],
//   base: ['1rem', { lineHeight: '1.5rem' }],
//   lg: ['1.125rem', { lineHeight: '1.75rem' }],
//   xl: ['1.25rem', { lineHeight: '1.75rem' }],
//   '2xl': ['1.5rem', { lineHeight: '2rem' }],  // ← here
//   '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
//   '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
//   '5xl': ['3rem', { lineHeight: '1' }],
// }
// react + clerk for backend
