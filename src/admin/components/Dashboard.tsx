import React from "react";
import { useUserContext } from "../../pages/AuthClient/UserContext";// Import UserContext để hiển thị thông tin người dùng hoặc logout

const Dashboard: React.FC = () => {
  const { user, logout } = useUserContext(); // Lấy thông tin người dùng và hàm logout

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard</h1>
      {user && (
        <div className="mb-4">
          <p>
            <strong>Name:</strong> {user.last_name || "Admin User"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role ID:</strong> {user.role_id}
          </p>
        </div>
      )}
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
