import React from "react";

type Props = {};

const HeaderAD = (props: Props) => {
  return (
    <>
      <div className="dashboard" style={{ padding: "20px" }}>
        <div className="header">
          <h1>
            Hello Admin <span>👋</span>
          </h1>
          <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="stats-container">
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
        </div>
      </div>
    </>
  );
};

export default HeaderAD;
