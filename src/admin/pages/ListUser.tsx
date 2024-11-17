import React, { useState, useEffect } from "react";
import TUser from "../../Types/TUsers";
import axios from "axios";

type Props = {
  currentUserRole: number; // Role của người dùng hiện tại
};

const ListUser = ({ currentUserRole }: Props) => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<
    "active" | "inactive" | null
  >(null);

  useEffect(() => {
    // Gọi API lấy danh sách người dùng
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/users");
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleLockUnlock = async (userId: number, action: "active" | "inactive") => {
    if (currentUserRole !== 1) {
      // Chỉ Admin mới có quyền
      setMessage("Bạn không có quyền thực hiện hành động này!");
      setTimeout(() => setMessage(null), 4000);
      return;
    }

    setIsLoading(true);
    setCurrentAction(action);

    try {
      const response = await axios.patch(`http://127.0.0.1:8000/users/${userId}`, {
        status: action,
      });

      if (response.status === 200) {
        const updatedUsers = users.map((user) =>
          user.user_id === userId ? { ...user, status: action } : user
        );
        setUsers(updatedUsers);
        setMessage(
          `Tài khoản ${
            action === "inactive" ? "đã bị khóa" : "đã được mở khóa"
          } thành công!`
        );
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage("Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setMessage("Không thể khóa/mở khóa tài khoản. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="conten_admin">
        <div className="header_table">
          <h2>Danh Sách Người Dùng</h2>
        </div>

        {message && (
          <div className={`alert-message ${currentAction === "inactive" ? "bg-red-500" : "bg-green-500"} text-white`}>
            {message}
          </div>
        )}

        <div className="rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead>
              <tr>
                <th className="px-2 py-2">User ID</th>
                <th className="px-2 py-2">Role ID</th>
                <th className="px-2 py-2">First Name</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td className="px-2 py-2">{user.user_id}</td>
                  <td className="px-2 py-2">{user.role_id}</td>
                  <td className="px-2 py-2">{user.firt_name}</td>
                  <td
                    className={`px-2 py-2 ${
                      user.status === "active" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="px-2 py-2">
                    {currentUserRole === 1 ? (
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleLockUnlock(user.user_id, "active")}
                          className="bg-green-500 text-white px-4 py-2 rounded"
                          disabled={isLoading}
                        >
                          Unlock
                        </button>
                        <button
                          onClick={() => handleLockUnlock(user.user_id, "inactive")}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          disabled={isLoading}
                        >
                          Lock
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">Không có quyền</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ListUser;
