import axios from "axios";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND;
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const nav = useNavigate();
  const { user } = useUser();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [isOwner, sis] = useState(false);
  const [shg, sshg] = useState(false);
  const [sc, ssc] = useState([]);
  const [rm, srm] = useState([]);
  // axios.defaults.withCredentials = true;
  const fr = async () => {
    try {
      const token = getToken();
      console.log(token);

      if (!token) {
        console.log("Token not ready !!");
        return;
      }
      const { data } = await axios.get("/api/room/", {
        headers: `Authorization : Bearer ${token}`,
      });
      if (data.success) {
        srm(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const ft = async () => {
    try {
      const token = getToken();
      console.log(token);

      if (!token) {
        console.log("Token not ready !!");
        return;
      }

      const { data } = await axios.get("/api/user", {
        headers: `Authorization : Bearer ${token}`,
      });

      if (data.success) {
        sis(data.role === "hotelOwner");
        ssc(data.rs);
      } else {
        toast.error(data.message);
        // setTimeout(ft, 2000);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    console.log(isLoaded, isSignedIn);

    ft();
  }, [isLoaded, isSignedIn]);
  useEffect(() => {
    fr();
  }, []);
  console.log(rm);
  const value = {
    currency,
    nav,
    user,
    getToken,
    isOwner,
    sis,
    shg,
    sshg,
    axios,
    sc,
    ssc,
    rm,
    srm,
    toast,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
