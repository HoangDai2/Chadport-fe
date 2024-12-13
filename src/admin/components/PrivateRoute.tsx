import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem("jwt_token");

  // Kiểm tra token có tồn tại không
  return token ? <Outlet /> : <Navigate to="/loginadmin" />;
};

export default PrivateRoute;
