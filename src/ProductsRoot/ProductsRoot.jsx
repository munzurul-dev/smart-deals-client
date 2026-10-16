import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Loading from "../Components/Loader/loading";
import { use } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const ProductsRoot = () => {
      const {loading} = use(AuthContext);
  if(loading){
    return <Loading></Loading>
  }
    return (
        <div>
            <Navbar></Navbar>
          <Outlet></Outlet> 
          <Footer></Footer> 
        </div>
    );
};

export default ProductsRoot;