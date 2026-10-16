import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loader/loading";
import { use } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const AuthRoot = () => {
    const {loading} = use(AuthContext);
  if(loading){
    return <Loading></Loading>
  }
    return (
        <div>
            <Navbar></Navbar>
           <Outlet></Outlet> 
        </div>
    );
};

export default AuthRoot;