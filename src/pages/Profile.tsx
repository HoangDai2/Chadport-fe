import React from "react";

type Props = {};

const Profile = (props: Props) => {
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white p-8 mt-10 shadow-md rounded-lg mt-[120px]">
        <h2 className="text-3xl font-semibold mb-6">Hồ Sơ Người Dùng</h2>
        <p className="mb-6 text-gray-600">
          Cập nhật thông tin cá nhân của bạn để bảo mật tài khoản
        </p>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Avatar */}
            <div className="text-center md:col-span-2">
              <img
                className="w-32 h-32 rounded-full mx-auto shadow-lg"
                src="https://via.placeholder.com/150"
                alt="Profile Avatar"
              />
              <input
                type="file"
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer"
              />
              <p className="mt-2 text-sm text-gray-600">
                Kích thước tối đa: 1 MB, định dạng: JPEG, PNG
              </p>
            </div>

            {/* Tên đăng nhập */}
            <div>
              <label className="block text-gray-700">Tên đăng nhập</label>
              <input
                type="text"
                name="username"
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                readOnly
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            {/* Số Điện Thoại */}
            <div>
              <label className="block text-gray-700">Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Địa chỉ */}
            <div>
              <label className="block text-gray-700">Địa chỉ</label>
              <input
                type="text"
                name="address"
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Ngày sinh */}
            <div className="md:col-span-2">
              <label className="block text-gray-700">Ngày sinh</label>
              <div className="mt-2 flex space-x-4">
                <select
                  name="dateOfBirthDay"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  name="dateOfBirthMonth"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {[
                    "Tháng 1",
                    "Tháng 2",
                    "Tháng 3",
                    "Tháng 4",
                    "Tháng 5",
                    "Tháng 6",
                    "Tháng 7",
                    "Tháng 8",
                    "Tháng 9",
                    "Tháng 10",
                    "Tháng 11",
                    "Tháng 12",
                  ].map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="dateOfBirthYear"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={2024 - i} value={2024 - i}>
                      {2024 - i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Nút Lưu */}
          <button
            type="submit"
            className="mt-6 w-full md:w-auto px-4 py-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition-all"
          >
            Cập nhật thông tin
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
