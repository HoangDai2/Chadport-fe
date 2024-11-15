import React, { useState } from "react";
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
  const handleLockUnlock = async (
    userId: number,
    action: "active" | "inactive"
  ) => {
    setIsLoading(true); // Hiển thị trạng thái chờ
    setCurrentAction(action); // Lưu hành động hiện tại (mở khóa hoặc khóa)
    try {
      const response = await apisphp.patch(`/user/getall/user/${userId}`, {
        status: action, // Cập nhật status mới
      });

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
  const openModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

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
                  <th className="px-2 py-2 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="px-2 py-2 font-medium text-gray-900">Email</th>
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
                      <button
                        onClick={() => openModal(user)} // Mở chi tiết người dùng khi nhấn vào
                        className="text-blue-600 underline"
                      >
                        {user.id}
                      </button>
                    </td>
                    <td className="px-2 py-2 text-gray-700">{user.role_id}</td>
                    <td className="px-2 py-2 text-gray-700">
                      {user.firt_name}
                    </td>
                    <td className="px-2 py-2 text-gray-700">
                      {user.image_user ? (
                        <img
                          src={`http://127.0.0.1:8000${user.image_user}`}
                          alt="User"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center border-2 border-gray-400 shadow-sm">
                          {/* Icon đại diện */}
                          <svg
                            fill="#4B5563" // Đặt màu xám đậm để icon nổi bật
                            width="20px" // Kích thước nhỏ gọn phù hợp với khung
                            height="20px"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z" />
                          </svg>
                        </div>
                      )}
                    </td>

                    {/* Hiển thị trạng thái từ state 'users' */}
                    <td
                      className={`px-2 py-2 ${
                        user.status === "active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {user.status}
                    </td>
                    <td className="px-2 py-2 text-gray-700">{user.email}</td>
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
                {/* Hình ảnh người dùng */}
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

                {/* Thông tin chi tiết người dùng */}
                <div className="w-2/3">
                  <div className="grid grid-cols-2 gap-6 ">
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-700 text-left">
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
                      <h3 className="text-lg font-semibold text-gray-700 text-left">
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
                        <strong>Ngày tạo:</strong> {selectedUser.date_create}
                      </p>
                      <p className="text-gray-600">
                        <strong>Cập nhật lần cuối:</strong>{" "}
                        {selectedUser.date_update}
                      </p>
                      <p className="text-gray-600">
                        <strong>Địa chỉ:</strong> {selectedUser.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nút đóng */}
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
