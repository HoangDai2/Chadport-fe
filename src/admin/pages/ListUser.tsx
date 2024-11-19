import React, { useEffect, useState } from "react";
import TUser from "../../Types/TUsers";
import apisphp from "../../Service/api";

type Props = {
  listuser: TUser[];
};

const ListUser = ({ listuser }: Props) => {
  const [users, setUsers] = useState<TUser[]>(listuser); // Quản lý danh sách người dùng
  const [isLoading, setIsLoading] = useState(false); // Trạng thái chờ
  const [message, setMessage] = useState<string | null>(null); // Thông báo
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null); // Người dùng được chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // Người dùng đang hiển thị menu

  const roleOptions = {
    1: "Boss",
    2: "Staff Pro",
    3: "Staff",
    4: "Client",
  };

  useEffect(() => {
    setUsers(listuser);
  }, [listuser]);

  // Thay đổi trạng thái khóa/mở khóa
  const handleLockUnlock = async (userId: number, action: "active" | "inactive") => {
    setIsLoading(true);
    try {
      const response = await apisphp.patch(`/user/status/${userId}`, { status: action });
      if (response.status === 200) {
        // Cập nhật danh sách người dùng
        const updatedUsers = users.map((user) =>
          user.id === userId ? { ...user, status: action } : user
        );
        setUsers(updatedUsers);

        setMessage(
          `Tài khoản ${
            action === "inactive" ? "đã bị khóa" : "đã được mở khóa"
          } thành công!`
        );
      } else {
        throw new Error("Không thể cập nhật trạng thái.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setMessage("Không thể cập nhật trạng thái. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 2000);
    }
  };

  // Cập nhật vai trò người dùng
  const handleRoleChange = async (userId: number, newRoleId: number) => {
    setIsLoading(true);
    try {
      const response = await apisphp.patch(`/user/role/${userId}`, { role_id: newRoleId });
      if (response.status === 200) {
        const updatedUsers = users.map((user) =>
          user.id === userId ? { ...user, role_id: newRoleId } : user
        );
        setUsers(updatedUsers);

        setMessage("Cập nhật chức vụ thành công!");
      } else {
        throw new Error("Không thể cập nhật vai trò.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setMessage("Không thể cập nhật chức vụ. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 2000);
    }
  };

  // Hiển thị menu dropdown
  const toggleDropdown = (userId: number) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
  };

  // Mở modal chi tiết người dùng
  const openModal = (user: TUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Đóng modal chi tiết người dùng
  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
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
            className={`alert-message p-4 mb-4 rounded text-white fixed top-4 right-4 ${
              message.includes("khóa") ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ zIndex: 1000 }}
          >
            {message}
          </div>
        )}

        {/* Hiển thị loading */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="pulse-spinner"></div>
          </div>
        )}

        <div className="rounded-lg border border-gray-200">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100">
              <th className="py-2 text-center">STT</th>
              <th className="py-2 text-center">User Name</th>
                <th className="py-2 text-center">Status</th>
                <th className="py-2 text-center">Role</th>
                <th className="py-2 text-center">Created At</th>
                <th className="py-2 text-center">Updated At</th>
                <th className="py-2 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="bg-white">
                  <td className="px-4 py-3 text-center">{index + 1}</td>
                  <td className="px-4 py-3 text-left">
                    <div
                      className="cursor-pointer"
                      onClick={() => openModal(user)}
                    >
                      {user.firt_name} {user.last_name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <select
                      value={user.role_id}
                      onChange={(e) =>
                        handleRoleChange(user.id, parseInt(e.target.value))
                      }
                      className="rounded border-gray-300 text-sm"
                    >
                      {Object.entries(roleOptions).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {new Date(user.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center relative">
                        <button
                          onClick={() => toggleDropdown(user.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          •••
                        </button>

                        {selectedUserId === user.id && (
                          <div className="absolute right-0 mt-2 w-16 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <div className="flex flex-col p-2 space-y-2">
                              {/* Unlock Icon Button */}
                              <button
                                onClick={() =>
                                  handleLockUnlock(user.id, "active")
                                }
                                className="flex items-center justify-center text-gray-500 hover:text-green-500 transition duration-150 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
                                disabled={isLoading}
                              >
<svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                  className="w-5 h-5"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144l0 48-16 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-240 0 0-48z"
                                  />
                                </svg>
                              </button>

                              {/* Lock Icon Button */}
                              <button
                                onClick={() =>
                                  handleLockUnlock(user.id, "inactive")
                                }
                                className="flex items-center justify-center text-gray-500 hover:text-red-500 transition duration-150 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md"
                                disabled={isLoading}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                  className="w-5 h-5"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal chi tiết người dùng */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-75"></div>
            <div className="bg-white p-10 rounded-2xl shadow-2xl relative z-10 max-w-3xl">
              <h2 className="text-2xl font-bold mb-6">Chi tiết người dùng</h2>
              <div>
                <p>Họ tên: {selectedUser.firt_name} {selectedUser.last_name}</p>
                <p>Email: {selectedUser.email}</p>
                <p>Trạng thái: {selectedUser.status}</p>
              </div>
              <button
                onClick={closeModal}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ListUser;
