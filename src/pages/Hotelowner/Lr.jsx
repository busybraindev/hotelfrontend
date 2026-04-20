import React, { useEffect, useState } from "react";
import { roomsDummyData } from "../../assets/assets/assets";
import Tittle from "../../components/Tittle";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const Lr = () => {
  const [rm, srm] = useState([]);
  const { axios, user, currency } = useAppContext();
  const ft = async () => {
    try {
      const { data } = await axios.get("/api/room/owner");
      console.log(data);

      if (data.success) {
        srm(data.rooms);
      } else {
        toast.error(data.message);
        // setTimeout(ft, 2000);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const tg = async (roomId) => {
    const { data } = await axios.post("/api/room/toogle-availability", {
      roomId,
    });
    if (data.success) {
      toast.success(data.message);
      ft();
    } else {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    if (user) {
      ft();
    }
  }, [user]);
  return (
    <div>
      <Tittle
        align={"left"}
        font={"outfit"}
        title={"Room Listings"}
        subtitle={
          "View, edit,or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
        }
      ></Tittle>
      <p className="text-gray-500 mt-8">All Rooms</p>
      <div className="w-full max-w-3xl text-left border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium"> Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Price /night
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rm.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.amenities.join(",")}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {currency} {item.pricePerNight}
                </td>
                <td className="py-3 px-4 border-t border-gray-300 text-sm text-red-500 text-center">
                  <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                    <input
                      onChange={() => tg(item._id)}
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lr;
