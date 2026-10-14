import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Hero from "../HeroSection/Hero";

const RootLayout = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <Hero></Hero>
      <div className="max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
