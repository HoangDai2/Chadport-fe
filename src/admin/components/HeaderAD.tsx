import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import apisphp from "../../Service/api";
import { useUserContext } from "../../pages/AuthClient/UserContext"; // Import context để lấy thông tin người dùng
import Notification from "./Notification"; // Import Notification component
import styled from "styled-components";
import "../style/HeaderAD.css";
import logo from "../../img/logochadport.png";
type Props = {};

const HeaderContainer = styled.header`
  @import url(https://unpkg.com/@webpixels/css@1.1.5/dist/index.css);
  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
`;

const HeaderAD = (props: Props) => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState<string>("");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");

    if (storedToken) {
      // Nếu có token trong localStorage, kiểm tra xem user đã được xác thực hay chưa
      if (!user) {
        // Nếu chưa có user (đã có token nhưng chưa xác thực thông tin người dùng), gọi API để xác thực
        apisphp
          .get("/user/profile", {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            if (response.data?.data) {
              const userData = response.data.data;
              setUser(userData);

              // Kiểm tra role_id của người dùng
              if ([1, 2, 3].includes(userData.role_id)) {
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
          });
      }
    } else {
      // Nếu không có token, điều hướng về trang login
      navigate("/loginadmin");
    }
  }, [user, navigate, setUser]);

  return (
    <HeaderContainer className="bg-surface-primary border-bottom pt-6">
      <div className="container-fluid">
        <div className="mb-npx">
          <div className="row items-center mb-4">
            <div className="col-sm-6 col-12 mb-4 sm:mb-0">
              <h1 className="text-2xl font-semibold flex items-center">
                Dashboard Chadport
              </h1>
            </div>
            <div className="col-sm-6 col-12 text-right">
              <div className="flex items-center border border-gray-300 rounded-lg  focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="text"
                  className="w-full py-2 px-4 rounded-l-lg focus:outline-none focus:ring-0"
                  placeholder="Search"
                />
                <button className="p-2 rounded-r-lg bg-blue-500 hover:bg-blue-600 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <ul className="nav nav-tabs mt-4 overflow-x border-b border-gray-200 flex space-x-6">
            {[
              { label: "Đơn Hoàn Trả", to: "/admin/cancel_order" },
              { label: "Đơn hàng mới", to: "/admin/new_order" },
              { label: "Mã Giảm giá", to: "/admin/viewvoucher" },
            ].map((tab, index) => (
              <li key={index} className="nav-item">
                <Link
                  to={tab.to}
                  className={`relative pb-2 text-sm font-medium transition-all duration-300 ${location.pathname === tab.to
                    ? "text-black after:content-[''] after:block after:w-full after:h-[3px] after:bg-black after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
                    : "text-gray-600 hover:text-black after:content-[''] after:block after:w-0 after:h-[3px] after:bg-black after:absolute after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
                    }`}
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>



        </div>
      </div>
    </HeaderContainer>
  );
};

export default HeaderAD;
