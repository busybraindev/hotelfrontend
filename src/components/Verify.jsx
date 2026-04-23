import React, { useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const Verify = () => {
  const [sp, spc] = useSearchParams();
  const { nav, axios, getToken } = useAppContext();
  const reference = sp.get("reference");
  const bookingId = sp.get("bookingId");

  const vp = async () => {
    const token = await getToken();
    if (!token) {
      toast.error("No token");
      return;
    }
    const rs = await axios.post(
      "/api/bookings/verify",
      {
        reference,
        bookingId,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    console.log(rs.data.success);

    if (rs.data.success) {
      nav("/my-bookings");
    } else {
      nav("/");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      vp();
    }, 8000);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
    </div>
  );
};

export default Verify;
