import React, { useEffect, useState } from "react";
import TUser from "../../Types/TUsers";
import apisphp from "../../Service/api";
import { useUserContext } from "../../pages/AuthClient/UserContext";
import axios from "axios";

type Props = {
  listuser: TUser[];
};

const ListUser = ({ listuser }: Props) => {
  const { user } = useUserContext();
  const [users, setUsers] = useState<TUser[]>(listuser);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

  const roleOptions = {
    1: "Boss",
    2: "Admin",
    3: "Client",
  };

  useEffect(() => {
    setUsers(listuser);
  }, [listuser]);

  const token = localStorage.getItem('token'); // hoặc sessionStorage nếu lưu token
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.error("Token không tồn tại hoặc chưa được lưu trữ!");
  }

  const handleLockUnlock = async (userId: number, action: "active" | "inactive") => {
    if (userId === user?.id) {
      setMessage("Không thể thay đổi trạng thái tài khoản của chính mình!");
      setTimeout(() => setMessage(null), 2000);
      return;
    }

    setLoadingUserId(userId);
    try {
      const response = await apisphp.patch(`/user/status/${userId}`, { status: action });
      if (response.status === 200) {
        setUsers(users.map((user) =>
          user.id === userId ? { ...user, status: action } : user
        ));
        setMessage(`Tài khoản ${action === "inactive" ? "bị khóa" : "mở khóa"} thành công!`);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      } else {
        setMessage("Không thể cập nhật trạng thái. Vui lòng thử lại!");
      }
    } finally {
      setLoadingUserId(null);
      setTimeout(() => setMessage(null), 2000);
    }
  };

  const handleRoleChange = async (userId: number, newRoleId: number) => {
    if (userId === user?.id) {
      setMessage("Không thể thay đổi chức vụ của chính mình!");
      setTimeout(() => setMessage(null), 2000);
      return;
    }

    if (user?.role_id !== 1) {
      setMessage("Bạn không có quyền thay đổi chức vụ người dùng.");
      setTimeout(() => setMessage(null), 2000);
      return;
    }

    setIsLoading(true);
    try {
      const response = await apisphp.patch(`/user/role/${userId}`, { role_id: newRoleId });
      if (response.status === 200) {
        setUsers(users.map((u) =>
          u.id === userId ? { ...u, role_id: newRoleId } : u
        ));
        setMessage("Cập nhật chức vụ thành công!");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      } else {
        setMessage("Không thể cập nhật chức vụ. Vui lòng thử lại!");
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Danh Sách Người Dùng</h2>
          </div>

          {message && (
            <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ${message.includes("khóa") ? "bg-red-500" : "bg-green-500"
              } text-white`}>
              {message}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">STT</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Người Dùng</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Chức Vụ</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Ngày Tạo</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Cập Nhật</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((userData, index) => (
                  <tr
                    key={userData.id}
                    className={`hover:bg-gray-50 transition-colors ${userData.id === user?.id ? "bg-gray-200" : ""}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-center">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center cursor-pointer" onClick={() => setSelectedUser(userData)}>
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {userData.firt_name?.[0]}{userData.last_name?.[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-600">{`${userData.firt_name} ${userData.last_name}`}</div>
                          <div className="text-sm text-gray-500">{userData.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${userData.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}>
                        {userData.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative">
                        <select
                          value={userData.role_id}
                          onChange={(e) => handleRoleChange(userData.id, parseInt(e.target.value))}
                          className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 px-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                          disabled={isLoading || user?.role_id !== 1 || userData.id === user?.id}
                        >
                          {Object.entries(roleOptions).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.586l3.71-3.356a.75.75 0 111.04 1.08l-4 3.625a.75.75 0 01-1.04 0l-4-3.625a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {new Date(userData.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {new Date(userData.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {loadingUserId === userData.id ? (
                        <div className="w-11 h-6 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                            checked={userData.status === "active"}
                            onChange={(e) => handleLockUnlock(userData.id, e.target.checked ? "active" : "inactive")}
                            disabled={loadingUserId !== null || userData.id === user?.id}
                          />
                          <div className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 
                            peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-5 after:w-5 after:transition-all 
                            peer-checked:bg-green-600 
                            ${loadingUserId !== null || userData.id === user?.id ? 'bg-gray-300 cursor-not-allowed' : 'cursor-pointer'}`}>
                          </div>
                        </label>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Chi tiết người dùng</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                <p className="mt-1 text-sm text-gray-900">{`${selectedUser.firt_name} ${selectedUser.last_name}`}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                <p className="mt-1 text-sm text-gray-900">{selectedUser.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUser;
