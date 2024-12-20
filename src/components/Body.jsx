import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);

  // Fetch User Profile
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data)); // Add user data to Redux store
    } catch (err) {
      if (err.response?.status === 401) {
        // Handle Unauthorized Access
        navigate("/signup-login");
      } else {
        console.error("Error fetching user data:", err.message);
      }
    }
  };

  // Call fetchUser on component mount
  useEffect(() => {
    if(!userData){
      fetchUser();
    }
  }, []); // Dependency array remains empty

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
