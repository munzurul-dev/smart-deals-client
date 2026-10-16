import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";
import { use } from "react";
import Loading from "../Components/Loader/loading";

const PrivetRoute = ({ children }) => {
  const { users, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>
  }
  if (users) {
    return children;
  }
  return (
    <Navigate to="/auth/login" state={location.pathname} replace></Navigate>
  );
};

export default PrivetRoute;
