import React, { useEffect } from "react";
import Nav from "../../components/Hotelowner/Nav";
import Sb from "../../components/Hotelowner/Sb";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

const Lt = () => {
  const { isOwner, nav } = useAppContext();
  useEffect(() => {
    if (!isOwner) {
      nav("/");
    }
  }, [isOwner]);
  return (
    <div className="flex flex-col h-screen mb-80">
      <Nav></Nav>
      <div className="flex h-full gap-3">
        <Sb></Sb>
        <div className="flex-1 pt-10 md:px-10 h-full">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Lt;
