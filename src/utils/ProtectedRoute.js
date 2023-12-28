import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoggedinHome } from "../Pages/Loggedinhome";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let location = useLocation();
  if (!user?.access_token || !user) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }
  return <LoggedinHome>{children}</LoggedinHome>;
};

export default ProtectedRoute;
