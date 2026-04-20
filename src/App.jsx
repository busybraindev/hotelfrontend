import React from "react";
import Nav from "./components/Nav";
import { Route, useLocation, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Ft from "./components/Ft";
import All from "./pages/All";
import Rd from "./pages/Rd";
import Mybook from "./pages/Mybook";
import Hr from "./components/Hr";
import Lt from "./pages/Hotelowner/Lt";
import Dh from "./pages/Hotelowner/Dh";
import Ar from "./pages/Hotelowner/Ar";
import Lr from "./pages/Hotelowner/Lr";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./Context/AppContext.jsx";
const App = () => {
  const isOwner = useLocation().pathname.includes("owner");
  const { shg } = useAppContext();
  return (
    <div>
      <Toaster />
      {!isOwner && <Nav></Nav>}
      {shg && <Hr></Hr>}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/rooms" element={<All></All>}></Route>
          <Route path="/rooms/:id" element={<Rd></Rd>}></Route>
          <Route path="/my-bookings" element={<Mybook></Mybook>}></Route>
          <Route path="/owner" element={<Lt></Lt>}>
            <Route index element={<Dh></Dh>}></Route>
            <Route path="add-room" element={<Ar></Ar>}></Route>
            <Route path="list-room" element={<Lr></Lr>}></Route>
          </Route>
        </Routes>
      </div>
      <Ft></Ft>
    </div>
  );
};

export default App;
