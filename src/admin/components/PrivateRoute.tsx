// PrivateRoute.tsx
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUserContext } from "../../pages/AuthClient/UserContext"; // Nếu bạn dùng context để quản lý người dùng

interface PrivateRouteProps {
  element: React.ReactNode;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const { user } = useUserContext(); // Lấy thông tin người dùng từ context (nếu có)

  // Kiểm tra nếu người dùng đã đăng nhập, nếu chưa, chuyển hướng đến trang login
  return (
    <Route
      path={path}
      element={user ? element : <Navigate to="/loginadmin" replace />}
    />
  );
};

export default PrivateRoute;
