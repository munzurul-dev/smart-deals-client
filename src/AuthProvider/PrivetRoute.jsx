import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";
import { use } from "react";

const PrivetRoute = ({ children }) => {
  const { users, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (users) {
    return children;
  }
  return (
    <Navigate to="/auth/login" state={location.pathname} replace></Navigate>
  );
};

export default PrivetRoute;
