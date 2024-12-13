import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { BiSolidLocationPlus } from "react-icons/bi";
import { AddressData } from "../../Types/TUsers";
import apisphp from "../../Service/api";
import AddressInput from "../AuthClient/apiMaps";
import { useFormik } from "formik";
type Props = {};

function AddressForm({ setIsFormVisible }: any) {
  // Quản lý thông tin nhập của form
  const [newAddress, setNewAddress] = useState({
    first_name: "",
    last_name: "",
    phone_number_address: "",
    specific_address: "",
    address: "",
    is_default: false,
  });
  const formik = "";
  // Quản lý trạng thái loading và lỗi
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm xử lý thay đổi dữ liệu trong form
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm thêm địa chỉ mới vào danh sách và gửi tới server
  const handleAddAddress = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("jwt_token");
      // console.log("Token:", token);
      if (!token) {
        console.log("Token not found");
        return;
      }

      // Cấu hình header để thêm token vào yêu cầu
      const headers = {
        Authorization: `Bearer ${token}`, // Gửi token vào header Authorization
      };

      // Gửi dữ liệu tới backend
      const response = await apisphp.post("/user/addadress", newAddress, {
        headers,
      });

      if (response.status === 200) {
        // Nếu thành công, reset form và đóng form
        console.log("Địa chỉ đã được thêm thành công", response.data);
        setNewAddress({
          first_name: "",
          last_name: "",
          phone_number_address: "",
          specific_address: "",
          address: "",
          is_default: false,
        });
        setIsFormVisible(false);
      } else {
        setError("Đã xảy ra lỗi khi thêm địa chỉ.");
      }
    } catch (error) {
      setError("Không thể thêm địa chỉ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý khi nhấn Cancel
  const handleCancel = () => {
    setIsFormVisible(false);
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        action="#"
        className="rounded-lg border border-gray-200 mt-8 grid grid-cols-6 p-4 gap-6 text-left"
      >
        <div className="text-lg font-bold text-left flex items-center space-x-2 mb-4 col-span-6">
          <BiSolidLocationPlus className="text-xl text-blue-500" />
          <span className="text-gray-800">Địa chỉ Mới</span>
        </div>

        {/* First Name */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="FirstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name:
          </label>
          <input
            type="text"
            id="FirstName"
            name="first_name"
            placeholder="Họ"
            value={newAddress.first_name}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md rounded-lg border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last Name */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="LastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name:
          </label>
          <input
            type="text"
            id="LastName"
            name="last_name"
            placeholder="Tên"
            value={newAddress.last_name}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* phone */}
        <div className="col-span-6">
          <label
            htmlFor="Email"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <input
            type="text"
            id="text"
            name="phone_number_address"
            placeholder="Số điện thoại"
            value={newAddress.phone_number_address}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div className="col-span-6">
          <label
            htmlFor="Address"
            className="block text-sm font-medium text-gray-700"
          >
            Address:
          </label>
          <input
            type="text"
            id="Address"
            name="address"
            placeholder="Đia chỉ"
            value={newAddress.address}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Address */}
        <div className="col-span-6">
          <label
            htmlFor="Address"
            className="block text-sm font-medium text-gray-700"
          >
            Specific Address:
          </label>
          <input
            type="text"
            id="Address"
            name="specific_address"
            placeholder="Đia chỉ cụ thể"
            value={newAddress.specific_address}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="col-span-6 flex justify-end gap-4 mt-4">
          <button
            onClick={handleAddAddress}
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            {loading ? "Đang thêm..." : "Thêm Địa Chỉ"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default AddressForm;
