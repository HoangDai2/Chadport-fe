import React, { useState } from "react";
import TUser from "../../Types/TUsers";
import axios from "axios";

type Props = {
  listuser: TUser[];
};

const ListUser = ({ listuser }: Props) => {
  const [users, setUsers] = useState(listuser);

  const handleLockUnlock = async (
    userId: number,
    action: "active" | "inactive"
  ) => {
    try {
      // Gọi API khóa hoặc mở khóa tài khoản
      const response = await axios.patch(
        `http://localhost:3000/users/${userId}`,
        {
          status: action,
        }
      );

      if (response.status === 200) {
        // Cập nhật trạng thái người dùng sau khi khóa/mở khóa thành công
        const updatedUsers = users.map((user) =>
          user.user_id === userId ? { ...user, status: action } : user
        );
        setUsers(updatedUsers);
        alert(
          `Tài khoản ${
            action === "inactive" ? "đã bị khóa" : "đã được mở khóa"
          } thành công!`
        );
      } else {
        alert("Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể khóa/mở khóa tài khoản. Vui lòng thử lại!");
    }
  };

  return (
    <>
      <section className="conten_admin">
        <div className="header_table">
          <h2>Danh Sách Người Dùng</h2>
        </div>
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
                    <td className="px-2 py-2 text-gray-900">{user.user_id}</td>
                    <td className="px-2 py-2 text-gray-700">{user.role_id}</td>
                    <td className="px-2 py-2 text-gray-700">
                      {user.first_name}
                    </td>
                    <td className="px-2 py-2 text-gray-700">{user.img_user}</td>
                    <td className="px-2 py-2 text-gray-700">{user.email}</td>
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
                          onClick={() =>
                            handleLockUnlock(user.user_id, "active")
                          }
                          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                        >
                          Unlock
                        </button>
                        <button
                          onClick={() =>
                            handleLockUnlock(user.user_id, "inactive")
                          }
                          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
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
