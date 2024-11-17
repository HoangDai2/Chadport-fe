import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apisphp from "../../Service/api"; // Import API
import { useUserContext } from "../../pages/AuthClient/UserContext"; // Import context để lưu thông tin người dùng

const LoginAdmin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(""); // Lỗi khi đăng nhập
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUserContext(); // Set thông tin người dùng vào context

  // Xử lý khi đăng nhập
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");

    try {
      const response = await apisphp.post("/user/login", {
        email,
        password,
      });

      if (response.data.message === "Successfully logged in") {
        const userData = response.data.data; // Dữ liệu người dùng trả về
        const token = response.data.token;

        // Kiểm tra role_id, chỉ cho phép role_id = 4
        if (userData.role_id === 4) {
          setUser(userData); // Lưu thông tin người dùng vào context
          localStorage.setItem("jwt_token", token); // Lưu token vào localStorage
          navigate("/admin"); // Điều hướng đến trang admin
        } else {
          setFormError("Bạn không có quyền truy cập trang admin.");
        }
      } else {
        setFormError(response.data.error || "Đăng nhập không thành công.");
      }
    } catch (error) {
      setFormError("Thông tin đăng nhập không chính xác.");
    }

    setLoading(false);
  };

  return (
    <div className="login-admin-container">
      <h2 className="text-center">Đăng nhập Admin</h2>
      <form onSubmit={handleLoginSubmit} className="login-form">
        {formError && (
          <div className="error-message text-red-500">{formError}</div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            required
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default LoginAdmin;
