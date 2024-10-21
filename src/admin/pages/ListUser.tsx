import React, { useState } from "react";
import TUser from "../../Types/TUsers";
import axios from "axios";
import { Link } from "react-router-dom";
type Props = {
  listuser: TUser[];
};

const ListUser = ({ listuser }: Props) => {
  const [users, setUsers] = useState(listuser); // Đảm bảo state 'users' là state được dùng để hiển thị danh sách
  const [isLoading, setIsLoading] = useState(false); // Trạng thái chờ khi gọi API
  const [message, setMessage] = useState<string | null>(null); // Trạng thái hiển thị thông báo
  const [currentAction, setCurrentAction] = useState<
    "active" | "inactive" | null
  >(null); // Trạng thái hành động hiện tại

  const handleLockUnlock = async (
    userId: number,
    action: "active" | "inactive"
  ) => {
    setIsLoading(true); // Hiển thị trạng thái chờ
    setCurrentAction(action); // Lưu hành động hiện tại (mở khóa hoặc khóa)
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${userId}`,
        {
          status: action, // Cập nhật status mới
        }
      );

      if (response.status === 200) {
        // Cập nhật trạng thái người dùng ngay lập tức mà không cần reload
        const updatedUsers = users.map((user) =>
          user.user_id === userId ? { ...user, status: action } : user
        );
        setUsers(updatedUsers); // Cập nhật danh sách người dùng

        // Hiển thị thông báo ngay lập tức
        setMessage(
          `Tài khoản ${
            action === "inactive" ? "đã bị khóa" : "đã được mở khóa"
          } thành công!`
        );

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      } else {
        setMessage("Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setMessage("Không thể khóa/mở khóa tài khoản. Vui lòng thử lại!");
    } finally {
      setIsLoading(false); // Dừng trạng thái chờ
    }
  };

  return (
    <>
      <section className="conten_admin">
        <div className="header_table">
          <h2>Danh Sách Người Dùng</h2>
        </div>

        {/* Hiển thị thông báo */}
        {message && (
          <div
            className={`alert-message p-4 mb-4 rounded text-white fixed top-4 right-4 transition-all duration-500 transform ${
              currentAction === "inactive" ? "bg-red-500" : "bg-green-500"
            } fade-in`}
            style={{ zIndex: 1000 }} // Đảm bảo thông báo xuất hiện trên các thành phần khác
          >
            {message}
          </div>
        )}

        <div className="rounded-lg border border-gray-200">
          <div className="overflow-x-auto max-w-full rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="px-2 py-2 font-medium text-gray-900">
                    User ID
                  </th>
                  <th className="px-2 py-2 font-medium text-gray-900">
                    Role ID
                  </th>
                  <th className="px-2 py-2 font-medium text-gray-900">
                    First Name
                  </th>
                  <th className="px-2 py-2 font-medium text-gray-900">Image</th>
                  <th className="px-2 py-2 font-medium text-gray-900">Email</th>
                  <th className="px-2 py-2 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="px-2 py-2 font-medium text-gray-900">
                    Date Created
                  </th>
                  <th className="px-2 py-2 font-medium text-gray-900">
                    Date Updated
                  </th>
                  <th className="px-2 py-2 font-medium text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {listuser.map((user) => (
                  <tr key={user.id}>
                    <td className="px-2 py-2 text-gray-900">
                      <Link to={`detailuser/${user.id}`}>{user.id}</Link>
                    </td>
                    <td className="px-2 py-2 text-gray-700">{user.role_id}</td>
                    <td className="px-2 py-2 text-gray-700">
                      {user.first_name}
                    </td>
                    <td className="px-2 py-2 text-gray-700">{user.img_user}</td>
                    <td className="px-2 py-2 text-gray-700">{user.email}</td>
                    {/* Hiển thị trạng thái từ state 'users' */}
                    <td className="px-2 py-2 text-gray-700">{user.status}</td>
                    <td className="px-2 py-2 text-gray-700">
                      {user.date_create}
                    </td>
                    <td className="px-2 py-2 text-gray-700">
                      {user.date_update}
                    </td>
                    <td className="px-2 py-2 text-gray-700">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleLockUnlock(user.id, "active")}
                          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                          disabled={isLoading} // Disable nút khi đang xử lý
                        >
                          Unlock
                        </button>
                        <button
                          onClick={() => handleLockUnlock(user.id, "inactive")}
                          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                          disabled={isLoading} // Disable nút khi đang xử lý
                        >
                          Lock
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListUser;
