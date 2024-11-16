import React, { useEffect, useState } from "react";
import TUser from "../../Types/TUsers";
import axios from "axios";
import apisphp from "../../Service/api";
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
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  useEffect(() => {
    setUsers(listuser);
  }, [listuser]);

  const handleLockUnlock = async (
    userId: number,
    action: "active" | "inactive"
  ) => {
    setIsLoading(true); // Hiển thị trạng thái chờ
    setCurrentAction(action); // Lưu hành động hiện tại (mở khóa hoặc khóa)
    try {
      const response = await apisphp.patch(`/user/status/${userId}`, {
        status: action, // Cập nhật status mới
      });
      console.log(response);

      if (response.status === 200) {
        // Lấy lại dữ liệu người dùng từ server sau khi thay đổi trạng thái
        const updatedUsersResponse = await apisphp.get("/user/getall");
        setUsers(updatedUsersResponse.data); // Cập nhật danh sách người dùng từ server

        // Hiển thị thông báo ngay lập tức
        setMessage(
          `Tài khoản ${
            action === "inactive" ? "đã bị khóa" : "đã được mở khóa"
          } thành công!`
        );

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
          setMessage(null);
          window.location.reload();
        }, 2000);
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

  // menu con nút unlock và lock
  const toggleDropdown = (userId: any) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
  };

  // mở modal chi tiểt người dùng
  const openModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  // đóng modal chi tiểt người dùng
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
            className={`alert-message p-4 mb-4 rounded text-white fixed top-4 right-4 transition-all duration-500 transform ${
              currentAction === "inactive" ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ zIndex: 1000 }}
          >
            {message}
          </div>
        )}

        {/* Hiển thị loading khi đang thực hiện hành động */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="pulse-spinner"></div>
          </div>
        )}

        <div className="rounded-lg border border-gray-200">
          <div className="overflow-x-auto max-w-full rounded-t-lg">
            <div className="p-4">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="w-12 text-center"></th>
                    <th className="py-2 text-center">User Name</th>
                    <th className="py-2 text-center">Status</th>
                    <th className="py-2 text-center">Created_at</th>
                    <th className="py-2 text-center">Updated_at</th>
                    <th className="py-2 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {listuser.map((user, index) => (
                    <tr key={index} className="bg-white">
                      {/* Checkbox */}
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </td>

                      {/* User Info */}
                      <td
                        className="px-4 py-3 text-left"
                        onClick={() => openModal(user)}
                      >
                        <div className="flex items-center justify-center space-x-3">
                          {user.image_user ? (
                            <img
                              src={`http://127.0.0.1:8000${user.image_user}`}
                              alt={user.firt_name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6.28 17.29C7.62 15.53 9.7 14.5 12 14.5s4.38 1.03 5.72 2.79M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6.28 17.29C7.62 15.53 9.7 14.5 12 14.5s4.38 1.03 5.72 2.79M12 20h.01"
                                />
                              </svg>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-semibold">
                              {user && `${user.firt_name} ${user.last_name}`}
                            </div>
                            <div className="text-xs text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-left">
                        <span
                          className={`font-semibold text-sm px-2 py-0.5 rounded-full ${
                            user.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Created_at */}
                      <td className="px-4 py-3 text-center text-sm text-gray-700">
                        {user.created_at}
                      </td>

                      {/* Updated_at */}
                      <td className="px-4 py-3 text-center text-sm text-gray-700">
                        {user.updated_at}
                      </td>

                      {/* Options  */}
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
          </div>
        </div>

        {/*  hiển thị thông tin người dùng chi tiết */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-75 transition-opacity duration-300"></div>

            <div className="bg-white p-10 rounded-2xl shadow-2xl relative z-10 max-w-[60rem] w-full">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 text-left">
                  Chi tiết người dùng
                </h2>
              </div>

              <div className="flex space-x-8">
                {/* User Image */}
                <div className="w-1/3 flex justify-center items-center">
                  {selectedUser.image_user ? (
                    <img
                      src={`http://127.0.0.1:8000${selectedUser.image_user}`}
                      alt={`${selectedUser.firt_name} ${selectedUser.last_name}`}
                      className="w-24 h-24 rounded-full border-4 border-gray-600 shadow-lg object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full border-4 border-gray-600 shadow-lg bg-gray-300 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* User Details */}
                <div className="w-2/3">
                  <div className="grid grid-cols-2 gap-6 ">
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-700">
                        Thông tin cá nhân
                      </h3>
                      <p className="text-gray-600 mt-2">
                        <strong>Họ tên:</strong> {selectedUser.firt_name}{" "}
                        {selectedUser.last_name}
                      </p>
                      <p className="text-gray-600">
                        <strong>Email:</strong> {selectedUser.email}
                      </p>
                      <p className="text-gray-600">
                        <strong>Số điện thoại:</strong>{" "}
                        {selectedUser.phone_number}
                      </p>
                      <p className="text-gray-600">
                        <strong>Giới tính:</strong>{" "}
                        {selectedUser.gender === "male"
                          ? "Nam"
                          : selectedUser.gender === "female"
                          ? "Nữ"
                          : "Khác"}
                      </p>
                      <p className="text-gray-600">
                        <strong>Ngày sinh:</strong> {selectedUser.birthday}
                      </p>
                    </div>

                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-700">
                        Thông tin tài khoản
                      </h3>
                      <p className="text-gray-600 mt-2">
                        <strong>Trạng thái:</strong>
                        <span
                          className={`${
                            selectedUser.status === "active"
                              ? "text-green-600"
                              : selectedUser.status === "inactive"
                              ? "text-red-600"
                              : "text-yellow-600"
                          } font-semibold`}
                        >
                          {selectedUser.status === "active"
                            ? "Hoạt động"
                            : selectedUser.status === "inactive"
                            ? "Không hoạt động"
                            : "Đình chỉ"}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        <strong>Role ID:</strong> {selectedUser.role_id}
                      </p>
                      <p className="text-gray-600">
                        <strong>Ngày tạo:</strong> {selectedUser.created_at}
                      </p>
                      <p className="text-gray-600">
                        <strong>Cập nhật lần cuối:</strong>{" "}
                        {selectedUser.updated_at}
                      </p>
                      <p className="text-gray-600">
                        <strong>Địa chỉ:</strong> {selectedUser.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold shadow-lg hover:bg-red-600 transition duration-300 focus:outline-none"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ListUser;
