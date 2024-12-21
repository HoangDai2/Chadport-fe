import React, { useEffect, useState } from "react";
import apisphp from "../../Service/api";
import { useUserContext } from "./UserContext";
import TUser from "../../Types/TUsers";
import { profileValidationSchema } from "./Validation";
import { useFormik } from "formik";
import AddressInput from "./apiMaps";
import axios from "axios";

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
  const [orders, setOrders] = useState([]); // Danh sách đơn hàng
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [loading1, setLoading1] = useState(true); // Trạng thái loading
  const [activeFilter, setFilter] = useState("chờ xử lí"); // Bộ lọc trạng thái
  const [isModalOpen, setIsModalOpen] = useState(false); // State để điều khiển hiển thị modal
  const [selectedOrder, setSelectedOrder] = useState(null); // State để lưu đơn hàng chọn

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading1(true);
        const token = localStorage.getItem("jwt_token");
        if (!token) {
          throw new Error("User is not authenticated!");
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/api/user-status",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              status: activeFilter === "chờ xử lí" ? "" : activeFilter,
            },
          }
        );

        setOrders(response.data.data); // Gán dữ liệu đơn hàng từ API
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Bạn cần đăng nhập để xem chi tiết đơn hàng!"
        );
      } finally {
        setLoading1(false);
      }
    };
    // console.log(error);

    fetchOrders();
  }, [activeFilter]);

  if (loading1) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Lọc dữ liệu dựa trên trạng thái
  const filteredOrders =
    activeFilter === "Tất cả"
      ? orders
      : orders.filter((order) => order.status === activeFilter);

  // Hàm mở modal và chọn đơn hàng
  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const steps = [
    { key: "chờ xử lí", label: "chờ xử lí" },
    { key: "đã thanh toán", label: "đã thanh toán" },
    { key: "đang giao", label: "đang giao" },
    { key: "đã hoàn thành", label: "đã hoàn thành" },
    { key: "bị hủy", label: "bị hủy" },
  ];

  return (
    <>
      <div id="title" className="page-title py-6 mt-[120px]">
        <div className="section-container max-w-7xl mx-auto px-6">
          <div className="content-title-heading mb-4">
            <h1 className="text-title-heading" style={{ fontSize: "50px" }}>
              Profile
            </h1>
          </div>
          <div className="breadcrumbs text-sm text-gray-600 font-inter">
            <a href="/" className="hover:text-blue-500">
              Home
            </a>
            <span className="delimiter mx-2">/</span>
            <a href="/shop-grid-left" className="hover:text-blue-500">
              profile
            </a>
            <span className="delimiter mx-2">/</span>
            <span className="text-gray-900">Nike</span>
          </div>
        </div>
      </div>

      <div className=" min-h-screen p-8">
        <div className=" mx-auto bg-white rounded-lg  p-8 relative">
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

          {/* thanh chọn trạng thái */}
          <div className="flex space-x-8 text-gray-500 text-sm font-medium mb-6">
            {[
              "Tất cả",
              "chờ xử lí",
              "đã thanh toán",
              "đang giao",
              "bị hủy",
              "đã hoàn thành",
            ].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`relative pb-1 ${
                  activeFilter === status
                    ? "text-gray-900 after:content-[''] after:block after:w-full after:h-[2px] after:bg-gray-800 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
                    : "text-gray-600 hover:text-gray-900 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gray-400 after:absolute after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-5 grid-rows-2 gap-4">
            {/* show dữ liệu khi check out xong */}
            <div className="col-span-3 row-span-3 space-y-4">
              {filteredOrders && filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div
                    onClick={() => handleViewDetails(order)}
                    key={order.order_id}
                    className="bg-white rounded-lg p-6 border border-gray-300 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="">
                      <p className=" leading-[24px] text-right uppercase whitespace-nowrap  text-end text-black font-medium">
                        {order.status}
                      </p>
                    </div>

                    <hr className="border-t border-dashed border-gray-600 my-6" />

                    <div className="flex flex-col md:flex-row gap-6">
                      <img
                        src={
                          order.products[0]?.product_image
                            ? `http://127.0.0.1:8000/storage/${order.products[0]?.product_image}`
                            : "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                        }
                        className="w-24 h-24 object-cover rounded-lg  border-gray-200"
                        alt="Product"
                      />
                      <div className="flex flex-col text-left flex-1">
                        <p className="text-base  text-gray-800 font-semibold">
                          {order.products[0]?.product_name}
                        </p>
                        <p className="text-sm  text-gray-500 mt-1">
                          Phân loại hàng: Be,S (40-52kg)
                        </p>
                        <p className="text-sm  text-gray-500 mt-1">
                          Số lượng: {order.products[0]?.quantity}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-center">
                        <p className="text-sm text-gray-500 line-through">
                          Giá:{" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(Math.ceil(order.products[0].price))}
                        </p>
                        <p className="text-lg text-red-600 font-semibold">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(Math.ceil(order.products[0].price))}
                        </p>
                      </div>
                    </div>

                    <hr className="border-t border-dashed border-gray-600 my-6" />

                    <div className="flex justify-end">
                      <p className="text-sm text-gray-500 mt-1">
                        Số tiền phải trả:{" "}
                      </p>
                      <p className="text-lg text-red-600 font-bold">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(order.total_money)}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-end gap-4">
                      <button className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        Hủy Đơn Hàng
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-6">
                  Không có sản phẩm nào trong trạng thái "{activeFilter}".
                </p>
              )}
            </div>

            {/* Modal hiển thị thông tin chi tiết đơn hàng */}
            {isModalOpen && selectedOrder && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center mt-20 z-50">
                <div className="bg-white rounded-lg w-3/4 lg:w-1/2 p-6 overflow-y-auto max-h-[80vh] shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800 mt-10">
                    Chi tiết đơn hàng
                  </h3>
                  <div className="mt-6 space-y-6">
                    <div className="flex space-x-8">
                      <div className="w-1/2">
                        <div>
                          <p className="text-lg font-semibold text-gray-800">
                            Sản phẩm trong đơn hàng
                          </p>
                          <div className="space-y-4 mt-4">
                            {selectedOrder.products.map((item) => (
                              <div
                                key={item.product_id}
                                className="flex items-center space-x-4 border-b pb-4"
                              >
                                <img
                                  src={`http://127.0.0.1:8000/storage/${item.product_image}`}
                                  alt={item.product_name}
                                  className="w-16 h-16 object-cover rounded-md"
                                />
                                <div>
                                  <p className="text-sm text-gray-800">
                                    {item.product_name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    SL: {item.quantity} - Size {item.size_name}{" "}
                                    - màu:
                                    <span className="mr-1">
                                      {item.color_name}
                                    </span>{" "}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Giá: {Math.ceil(item.price)} VND{" "}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2 text-left">
                        <p className="text-lg font-semibold text-gray-800">
                          Thông tin đơn hàng
                        </p>
                        <div className="space-y-2 mt-2">
                          <p className="text-sm text-gray-500">
                            Địa chỉ giao hàng: {selectedOrder.shipping_address}
                          </p>
                          {/* <p className="text-sm text-gray-500">
                        Địa chỉ thanh toán: {selectedOrder.billing_address}
                      </p> */}

                          <p className="text-sm text-gray-400">
                            Ngày tạo:{" "}
                            {new Date(
                              selectedOrder.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-lg font-semibold text-gray-800">
                        Tổng thanh toán:{" "}
                        <span className="text-green-500 font-semibold">
                          {selectedOrder.total_money} VND
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleCloseModal}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md"
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
