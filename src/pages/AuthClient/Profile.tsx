import React, { useEffect, useState } from "react";
import apisphp from "../../Service/api";
import { useUserContext } from "./UserContext";
import TUser from "../../Types/TUsers";
import { profileValidationSchema } from "./Validation";
import { useFormik } from "formik";
import AddressInput from "./apiMaps";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { useLoading } from "../Loadings/LoadinfContext";
import CancelOrderForm from "../Order/CancelOrder";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import TComments from "../../Types/TComments";
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
  const { startLoading, stopLoading } = useLoading();
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

  const navigate = useNavigate(); // Hook để chuyển trang\

  // trạng thái đơn hàng trong profile
  const [orders, setOrders] = useState<Order[]>([]); // Danh sách đơn hàng
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [activeFilter, setFilter] = useState("Tất cả"); // Bộ lọc trạng thái
  const [isModalOpen, setIsModalOpen] = useState(false); // State để điều khiển hiển thị modal
  const [selectedOrder, setSelectedOrder] = useState(null); // State để lưu đơn hàng chọn
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const ordersPerPage = 4; // Số đơn hàng mỗi trang
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [showReviewForm, setShowReviewForm] = useState(false); // State để điều khiển hiển thị ReviewForm
  const [reviewFormData, setReviewFormData] = useState<TComments | null>(null); // Sử dụng TComments

  // xử lí nút hoàn trả tiền hiện form
  const [isRefundFormOpen, setRefundFormOpen] = useState(false);

  const handleOpenRefundForm = () => {
    setRefundFormOpen(true);
  };

  const handleCloseRefundForm = () => {
    setRefundFormOpen(false);
  };

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

  interface Order {
    id: number;
    order_id: number;
    status: string;
    [key: string]: any; // Nếu đơn hàng có nhiều trường khác, bạn có thể thay thế bằng kiểu cụ thể
  }

  // call dữ liệu theo trạng thái
  useEffect(() => {
    const fetchOrders = async () => {
      startLoading();
      try {
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
          }
        );
        console.log("999", response);

        // Xử lý dữ liệu để đưa `order_id` vào `Order`
        const formattedOrders = response.data.data.map((order: any) => ({
          ...order,
          order_id: order.products?.[0]?.order_id || null, // Lấy `order_id` từ `products`
        }));

        console.log("Formatted Orders:", formattedOrders);

        setOrders(formattedOrders); // Gán dữ liệu đã xử lý vào state
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
          "Bạn cần đăng nhập để xem chi tiết đơn hàng!"
        );
      } finally {
        stopLoading();
      }
    };
    // console.log(error);

    fetchOrders();
  }, []);

  // Lọc dữ liệu dựa trên trạng thái
  const filteredOrders =
    activeFilter === "Tất cả"
      ? orders
      : orders.filter((order) => order.status === activeFilter);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;

  const currentOrders = filteredOrders.slice(startIndex, endIndex);
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

  // Hàm chuyển sang trang kế tiếp
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Hàm quay lại trang trước
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // hiện các nút và xử lí theo trạng thái đơn hàng
  const renderButtonCancelOrder = (order: any) => {
    switch (order.status) {
      case "chờ xử lí":
        return (
          <div className="flex space-x-4">
            <button
              className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300"
              disabled
            >
              Chờ
            </button>

            <button
              className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => setShowCancelForm(true)}
            >
              Hủy Đơn Hàng
            </button>
          </div>
        );
      case "đang giao":
        return (
          <div className="flex space-x-4">
            {/* Nút Yêu Cầu Trả Hàng/Hoàn Tiền */}
            <button className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300">
              Theo dõi đơn hàng
            </button>

            {/* nút hủy đơn hàng */}
            <button className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Liên hệ người bán
            </button>
          </div>
        );
      case "đã hoàn thành":
        // Chuẩn bị dữ liệu của tất cả sản phẩm để truyền qua query string
        // const productsQuery = order.products.map((product) => ({
        //   order_id: product.order_id,
        //   product_item_id: product.product_item_id,
        //   product_image: product.product_image,
        //   product_name: product.product_name,
        //   price: product.price,
        //   color_name: product.color_name,
        //   size_name: product.size_name,
        //   color_hex: product.color_hex,
        //   quantity: product.quantity,
        // }));
        // console.log("ggg", productsQuery);

        // Mã hóa dữ liệu thành JSON để truyền qua query string
        // const queryString = encodeURIComponent(JSON.stringify(productsQuery));
        return (
          <div className="flex space-x-4">
            {/* Nút Đánh Giá */}
            <button
              className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => {
                if (order.products && order.products.length > 0 && user?.id) {

                  const reviewFormsData = order.products.map((product) => ({
                    comment_id: 0,
                    product_item_id: product.product_item_id, // Lấy product_item_id từ sản phẩm
                    user_id: user.id, // Lấy user_id từ user
                    user: user as TUser,
                    content: "",
                    rating: 0,
                    reported: false,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    product_name: product.product_name, // Tên sản phẩm
                    product_image: product.product_image, // Ảnh sản phẩm
                    color_name: product.color_name, // Ảnh sản phẩm
                    size_name: product.size_name,
                    quantity: product.quantity,
                    color_hex: product.color_hex,
                  }));

                  setReviewFormData(reviewFormsData); // Lưu dữ liệu của tất cả sản phẩm
                  setShowReviewForm(true); // Hiển thị modal đánh giá
                  console.log("qqq", reviewFormData);

                } else {
                  toast.error(
                    "Không thể lấy thông tin sản phẩm hoặc người dùng. Vui lòng thử lại."
                  );
                }
              }}
            >
              Đánh Giá
            </button>


            {/* Nút Yêu Cầu Trả Hàng/Hoàn Tiền */}

            {/* Nút Hoàn Tiền - Chuyển sang trang hoàn trả với danh sách sản phẩm */}
            <button className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300">
              Yêu Cầu Trả Hàng/Hoàn Tiền
            </button>

            {/* Dropdown Menu */}
            <div className="relative">
              <button
                className="bg-white border px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Thêm
                <span
                  className={`ml-2 transform transition-transform ${showDropdown ? "rotate-180" : "rotate-0"
                    }`}
                >
                  <FaAngleDown />
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Liên Hệ Người Bán
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Mua Lại
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case "đã thanh toán":
        // Chuẩn bị dữ liệu của tất cả sản phẩm để truyền qua query string
        const productsQuery = order.products.map((product: any) => ({
          order_id: product.order_id,
          product_item_id: product.product_item_id,
          product_image: product.product_image,
          product_name: product.product_name,
          price: product.price,
          color_name: product.color_name,
          size_name: product.size_name,
          color_hex: product.color_hex,
          quantity: product.quantity,
        }));

        // Thêm total_money vào dữ liệu gửi đi
        const payload = {
          total_money: order.total_money, // Trường total_money
          products: productsQuery, // Danh sách sản phẩm
        };

        console.log("ggg", productsQuery);
        const queryString = encodeURIComponent(JSON.stringify(payload));
        return (
          <div className="flex space-x-4">
            {/* Nút Hoàn Tiền - Chuyển sang trang hoàn trả với danh sách sản phẩm */}
            <Link to={`/formrefund/${order.order_id}?products=${queryString}`}>
              <button className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300">
                Yêu Cầu Trả Hàng/Hoàn Tiền
              </button>
            </Link>

            {/* nút hủy đơn hàng */}
            <button
              className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => setShowCancelForm(true)}
            >
              Hủy Đơn Hàng
            </button>
          </div>
        );
      case "bị hủy":
        return (
          <div className="flex space-x-4">
            {/* nút Mua lại */}
            <button className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Mua lại
            </button>

            {/* Nút Xem chi tiết đơn hàng */}
            <button className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300">
              Xem chi tiết đơn hàng
            </button>

            {/* nút  Liên hệ người bán */}
            <button className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Liên hệ người bán
            </button>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <>
      <div id="title" className="page-title py-6 mt-[120
      x]">
        <ToastContainer
          theme="light"
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
        />
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
              "đang giao",
              "đã thanh toán",
              "đã hoàn thành",
              "bị hủy",
            ].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`relative pb-1 ${activeFilter === status
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
                    key={order.id}
                    className="text-right bg-white rounded-lg px-4 py-2 border border-gray-300 hover:shadow-lg transition-shadow duration-200"
                  >
                    <p className="mt-[20px] uppercase whitespace-nowrap text-right text-black font-medium">
                      {order.status}
                    </p>

                    <hr className="border-t border-dashed border-gray-600 my-6" />
                    {/* Hiển thị danh sách sản phẩm trong đơn hàng */}
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row gap-6 p-4 border-b border-gray-300 last:border-b-0"
                      >
                        <img
                          src={
                            product.product_image
                              ? `http://127.0.0.1:8000/storage/${product.product_image}`
                              : "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                          }
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                          alt="Product"
                        />
                        <div className="flex flex-col text-left flex-1">
                          <p className="text-base text-gray-800 font-semibold">
                            {product.product_name}
                          </p>

                          <p className="text-sm text-gray-700 mt-1 flex items-center space-x-3">
                            {/* Hiển thị màu sắc */}
                            <span
                              className="inline-block w-5 h-5 rounded-full border-2 border-gray-300 shadow-sm"
                              style={{
                                backgroundColor: product.color_hex || "#E5E7EB",
                              }}
                            ></span>
                            <span className="font-medium text-gray-800">
                              Size: {product.size_name} - {product.color_name}
                            </span>
                          </p>

                          <p className="text-sm text-gray-700 mt-1">
                            Số lượng: {product.quantity}
                          </p>
                        </div>
                        <div className="flex flex-col items-end justify-center">
                          <p className="text-sm text-gray-500 line-through">
                            Giá:{" "}
                            {product.price
                              ? new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(Math.ceil(product.price))
                              : "null"}
                          </p>
                          <p className="text-lg text-red-600 font-semibold">
                            {product.price
                              ? new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(Math.ceil(product.price))
                              : "null"}
                          </p>
                        </div>
                      </div>
                    ))}

                    <hr className="border-t border-dashed border-gray-600 my-6" />

                    {/* Hiển thị tổng số tiền và trạng thái đơn hàng */}
                    <div className="flex justify-end items-center">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">Tổng tiền:</p>
                        <p className="text-lg text-red-600 font-bold">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order.total_money)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-end gap-4">
                      {renderButtonCancelOrder(order)}
                      {showCancelForm && (
                        <CancelOrderForm
                          onClose={() => setShowCancelForm(false)}
                        />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-6">
                  Không có sản phẩm nào trong trạng thái "{activeFilter}".
                </p>
              )}
            </div>

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
                          className={`bg-gray-100 border ${formik.touched.phone_number &&
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
                          className={`bg-gray-100 border ${formik.touched.gender && formik.errors.gender
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
                          className={`bg-gray-100 border ${formik.touched.birthday && formik.errors.birthday
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

          <div>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {showReviewForm && reviewFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="mt-[115px] bg-white rounded-lg w-full lg:w-1/2 p-6"> {/* Đảm bảo modal chiếm 100% chiều rộng màn hình */}
            <div className="overflow-y-auto max-h-[70vh]"> {/* Đảm bảo nội dung có thể cuộn */}
              {reviewFormData.map((data, index) => (
                <div key={data.product_item_id} className="mb-8 w-full"> {/* Đảm bảo form chiếm 100% chiều rộng */}
                  <ReviewForm
                    commentData={data}
                    onClose={() => setShowReviewForm(false)}
                    productName={data.product_name}
                    productImage={data.product_image}
                    color_name={data.color_name}
                    size_name={data.size_name}
                    quantity={data.quantity}
                    color_hex={data.color_hex}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
