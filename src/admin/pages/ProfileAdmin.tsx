import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../pages/AuthClient/UserContext";

const ProfileAdmin: React.FC = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/loginadmin");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(null);
      localStorage.removeItem("jwt_token");
      navigate("/loginadmin");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-900">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg mt-10">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Admin Profile</h2>
        {user ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <p className="text-lg font-medium">Name:</p>
              <p className="text-lg text-gray-700">{user.firt_name} {user.last_name}</p>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <p className="text-lg font-medium">Email:</p>
              <p className="text-lg text-gray-700">{user.email}</p>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <p className="text-lg font-medium">Role:</p>
              <p className="text-lg text-gray-700">
                {user.role_id === 1
                  ? "Boss"
                  : user.role_id === 2
                  ? "Staff Pro"
                  : user.role_id === 3
                  ? "Staff"
                  : "Admin"}
              </p>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <p className="text-lg font-medium">Phone Number:</p>
              <p className="text-lg text-gray-700">{user.phone_number || "N/A"}</p>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <p className="text-lg font-medium">Gender:</p>
              <p className="text-lg text-gray-700">{user.gender === "male" ? "Male" : user.gender === "female" ? "Female" : "Other"}</p>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <p className="text-lg font-medium">Birthday:</p>
              <p className="text-lg text-gray-700">{user.birthday || "N/A"}</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300"
            >
              {isLoading ? "Logging out..." : "Logout"}
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
