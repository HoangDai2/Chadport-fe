import React, { useState } from "react";
import "../style/Notification.css"; // Đảm bảo có tệp CSS để chứa các style

const Notification = () => {
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    { id: 1, icon: "fas fa-exclamation-circle", text: "Đơn hàng cần xác nhận", time: "5 phút trước" },
    { id: 2, icon: "fas fa-box", text: "Đơn hàng của bạn đã được xác nhận", time: "10 phút trước" },
    { id: 3, icon: "fas fa-shipping-fast", text: "Đơn hàng của bạn đang được vận chuyển", time: "1 giờ trước" },
    { id: 4, icon: "fas fa-check-circle", text: "Đơn hàng của bạn đã được giao", time: "2 giờ trước" },
  ];

  const handleNotificationClick = () => {
    setIsPanelActive(!isPanelActive);
    setUnreadCount(0); // Ẩn số lượng thông báo khi nhấp vào nút thông báo
  };

  return (
    <div className="notification-container">
      <button className="notification-btn" onClick={handleNotificationClick}>
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>} {/* Số lượng thông báo chưa đọc */}
      </button>
      <div className={`notification-panel ${isPanelActive ? "active" : ""}`}>
        <div className="notification-header">Thông báo</div>
        <div className="notification-content">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="notification-item"
              onClick={() => window.location.href = 'order-confirmation.html'}
            >
              <div className="notification-icon">
                <i className={notification.icon}></i>
              </div>
              <div className="notification-text">
                <div>{notification.text}</div>
                <div className="notification-time">{notification.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
