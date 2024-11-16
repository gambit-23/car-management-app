import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("authToken");

  // If no token is found, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the token exists, render the child routes (Outlet)
  return <Outlet />;
};

export default PrivateRoute;
