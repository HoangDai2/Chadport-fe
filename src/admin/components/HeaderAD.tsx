import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserContext } from "../../pages/AuthClient/UserContext"; // Import context để lấy thông tin người dùng
type Props = {};

const HeaderAD = (props: Props) => {
  const { user } = useUserContext(); // Lấy thông tin người dùng từ context
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState<string>("");
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  // useEffect(() => {
  //   if (!user) {
  //     // Nếu chưa đăng nhập, điều hướng đến trang login
  //     navigate("/loginadmin");
  //   }
  // }, [user, navigate]);
  return (
    <>
      <div className="dashboard" style={{ padding: "20px" }}>
        <div className="header">
          <Link
            to="/admin/profileadmin"
            onClick={() => handleLinkClick("/admin/profileadmin")}
            className={`text-[13px] ${
              activeLink === "/admin/profileadmin"
                ? "text-blue-500"
                : "text-black"
            }`}
          >
            {user ? (
              <h1>
                Hello,{" "}
                <strong>
                  {user.firt_name} {user.last_name}
                </strong>
                ! 👋
              </h1>
            ) : (
              <p>Hello, Admin! 👋</p>
            )}
          </Link>

          <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        {/* <div className="stats-container">
          <div className="stat-box">
            <div className="icon">
              <img
                src="https://img.icons8.com/ios-filled/50/4caf50/user-male-circle.png"
                alt="User Icon"
              />
            </div>
            <div className="stat-content">
              <h2>5,423</h2>
              <p>Tổng Người Dùng</p>
              <span className="increase">▲ 18% this month</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="icon">
              <img
                src="https://img.icons8.com/ios-filled/50/4caf50/user-male-circle.png"
                alt="User Icon"
              />
            </div>
            <div className="stat-content">
              <h2>1,893</h2>
              <p>Thành Viên</p>
              <span className="decrease">▼ 1% this month</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="icon">
              <img
                src="https://img.icons8.com/ios-filled/50/4caf50/monitor.png"
                alt="Active Icon"
              />
            </div>
            <div className="stat-content">
              <h2>189</h2>
              <p>Đang Hoạt động</p>
              <div className="avatars">
                <img src="https://i.pravatar.cc/30?img=1" alt="User 1" />
                <img src="https://i.pravatar.cc/30?img=2" alt="User 2" />
                <img src="https://i.pravatar.cc/30?img=3" alt="User 3" />
                <img src="https://i.pravatar.cc/30?img=4" alt="User 4" />
                <img src="https://i.pravatar.cc/30?img=5" alt="User 5" />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default HeaderAD;
