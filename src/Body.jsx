import Footer from "./components/Footer/Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> 
      <Footer/>
    </div>
  );
};

export default Body;
