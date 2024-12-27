import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import apisphp from "../../Service/api";
import { useUserContext } from "../../pages/AuthClient/UserContext";
import { useNavigate } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");

    if (storedToken) {
      if (!user) {
        apisphp
          .get("/user/profile", { headers: { Authorization: `Bearer ${storedToken}` } })
          .then((response) => {
            if (response.data?.data) {
              const userData = response.data.data;
              setUser(userData);
              
              if ([1, 2].includes(userData.role_id)) {
                localStorage.setItem("user", JSON.stringify(userData));
                navigate(location.pathname);
              } else {
                localStorage.removeItem("jwt_token");
                localStorage.removeItem("user");
                navigate("/loginadmin");
              }
            } else {
              navigate("/loginadmin");
            }
          })
          .catch(() => {
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("user");
            navigate("/loginadmin");
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    } else {
      navigate("/loginadmin");
      setIsLoading(false);
    }
  }, [user, navigate, setUser]);

  const token = localStorage.getItem("jwt_token");

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full max-w-md">
            {/* <!-- Thanh loading --> */}
            <div className="h-1 w-full bg-gray-700 rounded overflow-hidden">
              <div className="h-full bg-white animate-[loading-bar_1.5s_infinite_linear]"></div>
            </div>
          </div>
        </div>
    );
  }

  return token ? <Outlet /> : <Navigate to="/loginadmin" />;
};

export default PrivateRoute;