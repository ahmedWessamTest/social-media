import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuth = !!localStorage.getItem("userToken");

  if (!isAuth) return <Outlet />;
  <Navigate to={"home"} />;
};

export default AuthLayout;
