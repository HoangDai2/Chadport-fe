import React, { useEffect, useState } from "react";
import apisphp from "../../Service/api";
import { useUserContext } from "./UserContext";
import TUser from "../../Types/TUsers";
import { profileValidationSchema } from "./Validation";
import { useFormik } from "formik";
import AddressInput from "./apiMaps";

type Props = {};
const genderMapping = {
  male: 1,
  female: 2,
  other: 3,
};
const reverseGenderMapping = {
  1: "male",
  2: "female",
  3: "other",
};
const Profile = (props: Props) => {
  // data bên user context
  const { user, setUser, token } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profileData, setProfileData] = useState<Partial<TUser>>({
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    gender: user?.gender,
    birthday: user?.birthday || "",
    address: user?.address || "",
  });

  // Hàm xử lý tải ảnh
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && token) {
      setLoading(true);
      setSuccess(false);
      const formData = new FormData();
      formData.append("image_user", file);

      try {
        const response = await apisphp.post("/user/update", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          // Sao chép `user` hiện tại và cập nhật `image_user`
          const updatedUser = { ...user, image_user: response.data.image_path };
          setUser(updatedUser); // Cập nhật `user` mới vào `UserContext`
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2000);
          window.location.reload();
        } else {
          alert("Cập nhật ảnh thất bại, vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Đã có lỗi xảy ra khi tải ảnh.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Hàm cập nhật hồ sơ và sử dụng Formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      phone_number: "",
      gender:
        typeof user?.gender === "string"
          ? genderMapping[user.gender]
          : user?.gender || 0, // Chuyển chuỗi sang số hoặc mặc định là 0
      birthday: "",
      address: "",
    },
    enableReinitialize: true, // Cho phép form cập nhật lại initialValues khi user thay đổi
    validationSchema: profileValidationSchema, // Áp dụng schema đã import
    onSubmit: async (values) => {
      if (!token) {
        alert("Bạn cần đăng nhập lại.");
        return;
      }
      setLoading(true);
      setSuccess(false);
      try {
        const transformedGender =
          reverseGenderMapping[
            values.gender as keyof typeof reverseGenderMapping
          ] || values.gender;

        // const transformedValues = {
        //   ...values,
        //   gender: transformedGender,
        // };
        const response = await apisphp.post("/user/update", values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          const updatedUser = { ...(user || {}), ...response.data.user };
          setUser(updatedUser);
          setSuccess(true);

          setTimeout(() => setSuccess(false), 2000);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Đã có lỗi xảy ra khi cập nhật hồ sơ.");
      } finally {
        setLoading(false);
      }
    },
  });

  // hàm này mục đích là cập nhật lại data cũ và cập nhất những trường chưa có dữ liệu
  useEffect(() => {
    if (user) {
      formik.setValues({
        email: user.email || "",
        phone_number: user.phone_number || "",
        gender:
          typeof user.gender === "string"
            ? genderMapping[user.gender]
            : user.gender || 0, // Sử dụng mapping hoặc mặc định là 0
        birthday: user.birthday || "",
        address: user.address || "",
      });
    }
  }, [user]);
  // trạng thái đơn hàng trong profile
  const [activeFilter, setFilter] = useState("Tất cả"); // Data giả cho các đơn hàng
  const orders = [
    {
      id: 1,
      name: "test bill 1",
      price: 1000,
      quantity: 2,
      total: 2000,
      status: "Completed",
    },
    {
      id: 2,
      name: "test bill 2",
      price: 1000,
      quantity: 2,
      total: 2000,
      status: "Chờ Thanh toán",
    },
    {
      id: 3,
      name: "test bill 3",
      price: 1000,
      quantity: 2,
      total: 2000,
      status: "Vận Chuyển",
    },
    {
      id: 4,
      name: "test bill 4",
      price: 1000,
      quantity: 2,
      total: 2000,
      status: "Chờ Giao Hàng",
    },
    {
      id: 5,
      name: "test bill 5",
      price: 1000,
      quantity: 2,
      total: 2000,
      status: "Đã Hủy",
    },
  ];

  // Lọc dữ liệu dựa trên trạng thái
  const filteredOrders =
    activeFilter === "Tất cả"
      ? orders
      : orders.filter((order) => order.status === activeFilter);

  // Hàm mở modal
  const [selectedOrder, setSelectedOrder] = useState(null); // State để lưu đơn hàng chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // State để điều khiển hiển thị modal

  // Hàm mở modal và chọn đơn hàng
  const handleViewDetails = (order: React.SetStateAction<null>) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  console.log(orders);
  const steps = [
    { key: "Chờ Thanh toán", label: "Chờ Thanh toán" },
    { key: "Vận Chuyển", label: "Vận Chuyển" },
    { key: "Chờ Giao Hàng", label: "Chờ Giao Hàng" },
    { key: "Completed", label: "Hoàn Thành" },
    { key: "Đã Hủy", label: "Đã Hủy" },
  ];

  const selectedOrder1 = orders.find((order) => order.id === 2);

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className=" mx-auto bg-white rounded-lg shadow-lg p-8 relative">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}
          {success && !loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="bg-green-500 p-2 rounded-full flex items-center justify-center animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          )}
          <form action="" onSubmit={formik.handleSubmit}>
            {/* phần này là đầu trang profile */}
            <div className="flex items-center justify-between border-b pb-6 mb-4">
              <div className="flex items-center space-x-6">
                {/* img */}
                <div className="relative flex items-center justify-center">
                  {user?.image_user ? (
                    <div className="relative">
                      <img
                        src={`http://127.0.0.1:8000${user.image_user}`}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />

                      {/* Nút "Sửa" ảnh */}
                      <label className="absolute bottom-1 right-1 bg-gray-800 bg-opacity-75 text-white p-1 rounded-full text-xs font-semibold cursor-pointer hover:bg-opacity-90 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536M6 18l3 3h12a2 2 0 002-2V9a2 2 0 00-.586-1.414l-5.828-5.828A2 2 0 0014 2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileUpload} // Gọi hàm handleFileUpload khi chọn file
                        />
                      </label>

                      {/* Nút "Xóa ảnh" */}
                      {/* <button
                        onClick={handleDeleteImage} // Gọi hàm để xóa ảnh
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs font-semibold hover:bg-red-700 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button> */}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-gray-400 mb-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.97 0 5.5-2.53 5.5-5.5S14.97 1 12 1 6.5 3.53 6.5 6.5 9.03 12 12 12zm0 2c-3.32 0-10 1.67-10 5v3h20v-3c0-3.33-6.68-5-10-5z" />
                      </svg>
                      <span className="text-gray-500 text-sm mb-2">
                        Chọn ảnh đại diện
                      </span>
                      <label className="bg-black text-white px-4 py-1 rounded-md text-sm font-semibold hover:bg-blue-600 transition duration-200">
                        Tải ảnh lên
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-xl font-semibold text-gray-800">
                      {user && `${user.firt_name} ${user.last_name}`}
                    </h1>
                    <span className="flex items-center bg-yellow-100 text-yellow-800 font-semibold text-sm px-2 py-0.5 rounded-full">
                      ⭐ 3.5 Overall
                    </span>
                    <span className="flex items-center bg-green-100 text-green-700 font-semibold text-sm px-2 py-0.5 rounded-full">
                      {user?.status}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-1 space-x-8">
                    <p>
                      <span className="font-medium text-gray-800">Origin:</span>{" "}
                      Career Site
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">
                        Applied at:
                      </span>{" "}
                      13 October, 2023
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">
                        Job Applied:
                      </span>{" "}
                      Research and Development
                    </p>
                  </div>
                </div>
              </div>

              {/* nút cập nhất profile */}
              <button
                type="submit"
                className="bg-black text-white font-semibold rounded-full px-4 py-2 shadow-md hover:bg-teal-700"
              >
                Cập Nhật
              </button>
            </div>
          </form>

          {/* phần này là để cho người dùng thây quá trình đơn hàng  */}
          {/* <div className="flex space-x-8 text-gray-500 text-sm font-medium mb-6">
              <button className="pb-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-800 focus:outline-none focus:border-gray-800 focus:text-gray-900">
                Tất cả
              </button>
              <button className="pb-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-800 focus:outline-none focus:border-gray-800 focus:text-gray-900">
                Chờ Thanh toán
              </button>
              <button className="pb-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-800 focus:outline-none focus:border-gray-800 focus:text-gray-900">
                Vận Chuyển
              </button>
              <button className="pb-1 border-b-2 border-gray-800 text-gray-900 hover:text-gray-900 hover:border-b-2 hover:border-gray-800 focus:outline-none focus:border-gray-800 focus:text-gray-900">
                Chờ Giao Hàng
              </button>
              <button className="pb-1 border-b-2 border-gray-800 text-gray-900 hover:text-gray-900 hover:border-b-2 hover:border-gray-800 focus:outline-none focus:border-gray-800 focus:text-gray-900">
                Hoàn Thành
              </button>
              <button className="pb-1 border-b-2 border-gray-800 text-gray-900 hover:text-gray-900 hover:border-b-2 hover:border-gray-800 focus:outline-none focus:border-gray-800 focus:text-gray-900">
                Đã Hủy
              </button>
              <button className="pb-1 border-b-2 border-gray-800 text-gray-900 hover:text-gray-900 hover:border-b-2 hover:border-gray-800 focus:outline-none focus:border-gray-800 focus:text-gray-900">
                Trả Hàng/Hoàn Tiền
              </button>
            </div> */}

          <div className="flex space-x-8 text-gray-500 text-sm font-medium mb-6">
            {/* <button className="pb-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-800 focus:outline-none focus:border-gray-800 focus:text-gray-900">
                Tất cả
              </button> */}
            {[
              "Tất cả",
              "Chờ Thanh toán",
              "Vận Chuyển",
              "Chờ Giao Hàng",
              "Đã Hủy",
            ].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`pb-1 ${
                  activeFilter === status
                    ? "text-white bg-gray-900 rounded-lg p-1"
                    : "text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-800"
                }`}
              >
                {status}
              </button>
            ))}
            <p>
              ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
            </p>
            <h2 className="text-lg font-semibold text-gray-800">
              Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-5 grid-rows-2 gap-4">
            {/* phần này là nhưng đơn hàng của user đó  */}
            {/* <div className="col-span-3 row-span-5 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between shadow-sm border border-gray-200">
                  <div>
                    <p className="text-gray-800 font-semibold">Aptitude Test</p>
                    <p className="text-sm text-gray-400">
                      01 Oct | 11:00AM - 12:00AM | with Bogus Fikri
                    </p>
                    <p className="text-sm text-green-500 font-medium">
                      Completed
                    </p>
                  </div>
                  <button className="text-teal-600 font-medium">
                    View Details
                  </button>
                </div>
                <button className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300">
                  + Add Interview
                </button>
              </div> */}
            <div className="col-span-3 row-span-3 space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-gray-50 rounded-lg p-4 flex items-center justify-between shadow-sm border border-gray-200"
                  >
                    <p className="text-sm text-gray-400">STT {order.id}</p>
                    <p>img</p>

                    <div>
                      <p className="text-gray-800 font-semibold">
                        {order.name}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400">
                      Giá: {order.price}
                      <p> SL: {order.quantity}</p>
                    </p>
                    <p className="text-sm text-green-500 font-medium">
                      {order.status}
                    </p>
                    <button
                      className="text-teal-600 font-medium"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                      <p>Tổng thanh toán {order.total}</p>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Không có đơn hàng nào.</p>
              )}
            </div>
            {/* Modal hiển thị thông tin chi tiết đơn hàng */}
            {isModalOpen && selectedOrder && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg w-1/2 p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Chi tiết đơn hàng
                  </h3>
                  <div className="space-y-4">
                    {selectedOrder1 && (
                      <div className="order-status">
                        <h3>
                          {selectedOrder.name} - Tổng: {selectedOrder.total} VND
                        </h3>
                        <ol className="steps">
                          {steps.map((step) => (
                            <li
                              key={step.key}
                              className={`step ${
                                selectedOrder.status === step.key
                                  ? "active"
                                  : ""
                              }`}
                            >
                              {step.label}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      className="bg-gray-600 text-white px-4 py-2 rounded-md"
                      onClick={handleCloseModal} // Đóng modal
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* <button className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300">
                  + Add Interview
                </button> */}
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="col-span-2 row-span-2 space-y-4"
            >
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                {/* thông tin người dùng  */}
                <div className="mb-6">
                  {/* <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Personal Information
                  </h2> */}
                  <div className="text-left space-y-4">
                    {/* Email */}
                    <div className="flex items-center">
                      <label className="w-1/3 text-gray-600 font-medium">
                        Email Address:
                      </label>
                      <div className="w-2/3">
                        <input
                          type="email"
                          name="email"
                          value={user?.email}
                          onChange={formik.handleChange}
                          readOnly
                          className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black w-full"
                        />
                        {/* Không có thông báo lỗi cho trường này vì nó chỉ để đọc */}
                      </div>
                    </div>
                    {/* Phone Number */}
                    <div className="flex items-center">
                      <label className="w-1/3 text-gray-600 font-medium">
                        Phone Number:
                      </label>
                      <div className="w-2/3">
                        <input
                          type="tel"
                          name="phone_number"
                          value={formik.values.phone_number}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`bg-gray-100 border ${
                            formik.touched.phone_number &&
                            formik.errors.phone_number
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black w-full`}
                        />
                        {formik.touched.phone_number &&
                          formik.errors.phone_number && (
                            <div className="text-red-500 text-sm mt-1">
                              {formik.errors.phone_number}
                            </div>
                          )}
                      </div>
                    </div>
                    {/* Gender */}
                    <div className="flex items-center">
                      <label className="w-1/3 text-gray-600 font-medium">
                        Gender:
                      </label>
                      <div className="w-2/3">
                        <select
                          name="gender"
                          value={formik.values.gender}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`bg-gray-100 border ${
                            formik.touched.gender && formik.errors.gender
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black w-full`}
                        >
                          <option value={0}>Chọn</option>
                          <option value={1}>Male</option>
                          <option value={2}>Female</option>
                          <option value={3}>Other</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.gender}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Birthday */}
                    <div className="flex items-center">
                      <label className="w-1/3 text-gray-600 font-medium">
                        Birthdate:
                      </label>
                      <div className="w-2/3">
                        <input
                          type="date"
                          name="birthday"
                          value={formik.values.birthday}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`bg-gray-100 border ${
                            formik.touched.birthday && formik.errors.birthday
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black w-full`}
                        />
                        {formik.touched.birthday && formik.errors.birthday && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.birthday}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Address */}
                    {/* <div className="flex items-center">
                      <label className="w-1/3 text-gray-600 font-medium">
                        Living Address:
                      </label>
                      <div className="w-2/3">
                        <input
                          type="text"
                          name="address"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`bg-gray-100 border ${
                            formik.touched.address && formik.errors.address
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black w-full`}
                        />
                        {formik.touched.address && formik.errors.address && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.address}
                          </div>
                        )}
                      </div>
                    </div> */}
                    <div className="flex items-center">
                      <label className="w-1/3 text-gray-600 font-medium">
                        Living Address:
                      </label>
                      <div className="w-2/3">
                        <AddressInput formik={formik} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* thông tin fake */}
                {/* <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Education Information
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center">
                      <span className="material-icons text-gray-400 mr-2">
                        University:
                      </span>
                      <span className="font-medium text-gray-800 ml-auto">
                        Boston University
                      </span>
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="material-icons text-gray-400 mr-2">
                        Qualification Held:
                      </span>
                      <span className="font-medium text-gray-800 ml-auto">
                        Bachelor of Engineering
                      </span>
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="material-icons text-gray-400 mr-2">
                        Year Graduation:
                      </span>
                      <span className="font-medium text-gray-800 ml-auto">
                        2014
                      </span>
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="material-icons text-gray-400 mr-2">
                        Referral:
                      </span>
                      <span className="font-medium text-gray-800 ml-auto">
                        Not Provided
                      </span>
                    </p>
                  </div>
                </div> */}

                {/* Notes Section */}
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Notes
                  </h2>
                  <div className="relative">
                    <textarea
                      className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200 focus:border-teal-600 focus:outline-none"
                      placeholder="Write note..."
                    />
                    <div className="absolute right-3 bottom-3 flex space-x-2 text-gray-400">
                      <button className="hover:text-gray-600">#</button>
                      <button className="hover:text-gray-600">@</button>
                      <button className="hover:text-gray-600">📎</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
