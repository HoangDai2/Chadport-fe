import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../pages/AuthClient/UserContext"; // Import context để lấy thông tin người dùng

const ProfileAdmin: React.FC = () => {
  const { user, setUser } = useUserContext(); // Lấy thông tin người dùng từ context
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

  useEffect(() => {
    if (!user) {
      // Nếu chưa đăng nhập, điều hướng đến trang login
      navigate("/loginadmin");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setIsLoading(true);
    // Xử lý logout
    setTimeout(() => {
      setUser(null); // Xóa thông tin người dùng trong context
      localStorage.removeItem("jwt_token"); // Xóa token
      navigate("/loginadmin"); // Điều hướng đến trang login
    }, 1000);
  };

 
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Profile</h2>
        {user ? (
          <div>
            <p>
              <strong>Name:</strong> {user.firt_name} {user.last_name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
            <strong>Role:</strong> 
            {user.role_id === 1 ? "Boss" : user.role_id === 2 ? "Staff Pro" : user.role_id === 3 ? "Staff" : "Admin"}
            </p>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-6 rounded-lg focus:outline-none"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-red-500">No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileAdmin;