import React from "react";
import Tittle from "./Tittle";
import { testimonials } from "../assets/assets/assets";
import St from "./St";
const Tt = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
      <Tittle
        title={"What Our Guests say"}
        subtitle={
          "Discover why discerning travelers consistently choose Quickstay for their exclusive and luxurious accomodations around the world."
        }
      ></Tittle>
      <div className="flex  items-center gap-6 mt-20 max-md:flex-col">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-xl shadow 
            "
          >
            <div className="flex items-center gap-3">
              <img
                src={testimonial.image}
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <div>
                <p className="font-playfair text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <St></St>
            </div>
            <p className="text-gray-500 max-w-90 mt-4">{testimonial.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tt;
