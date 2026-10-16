import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Hero from "../HeroSection/Hero";
import { use } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loading from "../Loader/loading";

const RootLayout = () => {
    const {loading} = use(AuthContext);
  if(loading){
    return <Loading></Loading>
  }
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
