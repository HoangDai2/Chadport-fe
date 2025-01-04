import React from "react";
import { useNavigate } from "react-router-dom";

const RefundNotification = () => {
  const navigate = useNavigate();

  const handleBackToProfile = () => {
    navigate("/profile"); // Chuyển về trang profile hoặc trang khác theo nhu cầu
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Yêu cầu hoàn tiền của bạn đã được gửi!</h1>
      <p>Chúng tôi sẽ xử lý yêu cầu của bạn trong vòng 3-5 ngày làm việc.</p>
      <button
        onClick={handleBackToProfile}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Quay lại trang cá nhân
      </button>
    </div>
  );
};

export default RefundNotification;
