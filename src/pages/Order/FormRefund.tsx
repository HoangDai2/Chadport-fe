import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { getAuthHeaders } from "../token/UserToken";
import { toast, ToastContainer } from "react-toastify";
import apisphp from "../../Service/api";
import RefundRequest, { AccountInfo, Note } from "../../Types/TCancelOrder";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../Loadings/LoadinfContext";
import { MdOutlineCameraAlt } from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";

interface Product {
  product_item_id: number;
  product_name: string;
  product_image: string;
  price: number;
  total_money: number;
  color_name: string;
  color_hex: string;
  size_name: string;
  quantity: number;
}
const RefundForm = () => {
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const { order_id } = useParams<{ id: string }>(); // Lấy order_id từ URL
  const [searchParams] = useSearchParams();
  const productsData = searchParams.get("products"); // Lấy danh sách sản phẩm từ query string
  const [products, setProducts] = useState<Product[]>([]); // Lưu danh sách sản phẩm
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]); // Lưu ID của sản phẩm được chọn
  const [totalMoney, setTotalMoney] = useState(0); // Lưu tổng tiền
  const [showPopup, setShowPopup] = useState(false); // Trạng thái hiển thị popup
  const [refundRequest, setRefundRequest] = useState({
    reason: "",
    account_number: "",
    bank_name: "",
    account_holder: "",
    check_refund: 0,
    file: "",
  });

  const [images, setImages] = useState<File[]>([]); // Store the files
  const [imageURLs, setImageURLs] = useState<string[]>([]); // Store the object URLs
  const [video, setVideo] = useState<File | null>(null);
  const [fileNote, setFileNote] = useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);


  // hàm này để upload ảnh
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validImages = files.filter((file) =>
        ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      );
      setImages((prev) => [...prev, ...validImages]);
      e.target.value = "";
    }
  };


  // hàm này để upload video 
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedVideo = e.target.files[0];
      if (selectedVideo.type === "video/mp4") {
        setVideo(selectedVideo);
      } else {
        toast.error("Chỉ hỗ trợ định dạng video MP4");
      }
      e.target.value = "";
    }
  };

  // hàm xóa ảnh qr bank cảu user
  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index)); // Remove the file
    setImageURLs((prev) => {
      URL.revokeObjectURL(prev[index]); // Revoke the object URL
      return prev.filter((_, i) => i !== index); // Remove the URL
    });
  };



  // hàm xóa video sản phẩm hoàn trả của user
  const handleDeleteVideo = () => {
    setVideo(null);
  };


  const handleChange = (key: string, value: string | number) => {
    setRefundRequest((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // call data và giải dữ liệu
  useEffect(() => {
    // Giải mã dữ liệu từ query string
    if (productsData) {
      // Parse toàn bộ object payload
      const payload = JSON.parse(decodeURIComponent(productsData));

      // Giải mã danh sách sản phẩm
      const decodedProducts: Product[] = payload.products || [];

      // Lấy giá trị total_money
      const totalMoney = payload.total_money || 0;

      // Cập nhật state
      setProducts(decodedProducts); // Danh sách sản phẩm
      setTotalMoney(totalMoney); // Tổng tiền
    }
  }, [productsData]);


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!order_id) {
      toast.error("Không tìm thấy ID đơn hàng");
      return;
    }

    const token = localStorage.getItem("jwt_token");
    if (!token) {
      toast.error("Vui lòng đăng nhập");
      return;
    }

    startLoading();
    const formData = new FormData();

    formData.append("order_id", order_id);
    formData.append("reason", refundRequest.reason);
    formData.append("account_number", refundRequest.account_number);
    formData.append("bank_name", refundRequest.bank_name);
    formData.append("account_holder", refundRequest.account_holder);
    formData.append("check_refund", refundRequest.check_refund.toString());

    // Thêm ảnh vào `file`
    images.forEach((image) => {
      formData.append("file", image); // Chỉ dành cho ảnh
    });

    // Thêm video vào `extra_file`
    if (video) {
      formData.append("extra_file", video); // Chỉ dành cho video
    }

    console.log("FormData:", images, video);

    try {
      const response = await apisphp.post(
        '/user/change_status_order',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const noteUser = JSON.parse(response.data.data.note_user);
      setFileNote(noteUser.file_note);
      toast.success(response.data.message);
      setShowPopup(true)
      setIsSubmitted(true); // Bắt đầu trạng thái submit
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
    } finally {
      stopLoading();
    }
  };
  // console.log("idd", selectedProducts);

  return (
    <>
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            {/* Tiêu đề */}
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Xác nhận yêu cầu hoàn tiền
            </h2>

            {/* Nội dung thông báo */}
            <p className="text-left text-gray-700 mb-4 leading-relaxed">
              Yêu cầu hoàn tiền của bạn đã được gửi thành công! Chúng tôi sẽ xử
              lý yêu cầu trong vòng{" "}
              <strong>3-5 ngày làm việc (Thứ 2 - Chủ Nhật)</strong>.
            </p>

            <p className="text-left text-gray-700 mb-4 leading-relaxed">
              Mọi thông tin về sản phẩm hoàn trả và trạng thái xử lý sẽ được
              thông báo qua email mà bạn đã đăng ký. Vui lòng kiểm tra hộp thư
              đến (hoặc spam) để không bỏ lỡ bất kỳ cập nhật nào từ chúng tôi.
            </p>

            <p className="text-left text-gray-700 mb-6">
              Chân thành cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của
              chúng tôi.
            </p>

            {/* Nút đóng thông báo */}
            <button
              onClick={() => setShowPopup(false)}
              className="bg-black text-white py-2 px-8 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
      <div id="title" className="page-title bg-gray-50 py-6 mt-[120px]">
        <div className="section-container max-w-7xl mx-auto px-6">
          <div className="content-title-heading mb-4">
            <h1 className="text-title-heading" style={{ fontSize: "50px" }}>
              Hoàn Trả tiền
            </h1>
          </div>
          <div className="breadcrumbs text-sm text-gray-600 font-inter">
            <a href="/" className="hover:text-blue-500">
              Home
            </a>
            <span className="delimiter mx-2">/</span>
            <a href="/shop-grid-left" className="hover:text-blue-500">
              Profile
            </a>
            <span className="delimiter mx-2">/</span>
            <span className="text-gray-900">Hoàn trả tiền </span>
          </div>
        </div>
      </div>

      <div className="text-left mx-auto p-8 bg-white rounded-lg">
        {/* Sản phẩm được chọn hủy hàng */}
        <div className="p-6 border rounded-lg bg-gray-50 mb-8">
          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            Sản phẩm được chọn hủy hàng
          </h2>
          {products.map((product) => (
            <div
              key={product.product_item_id}
              className="flex items-center mt-4 border-b pb-4"
            >
              <img
                src={`http://127.0.0.1:8000/storage/${product.product_image}`}
                alt="product"
                className="w-20 h-20 object-cover mr-6 rounded-md"
              />
              <div className="flex-1">
                <p className="font-semibold text-lg text-gray-800">
                  {product.product_name}
                </p>
                <p className="text-sm text-gray-700 mt-1 flex items-center space-x-3">
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
        </div>

        {/* Form lý do và thông tin hoàn tiền */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6 p-6 border rounded-lg bg-gray-50"
        >
          {/* Lý do người dùng muốn hủy hàng */}
          <div className="col-span-1 p-6 border rounded-lg bg-white ">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">
              Lý do cần Trả hàng và Hoàn tiền
            </h2>

            {/* lý do hoàn tiền */}
            <div>
              <label className="block text-base font-medium mb-3 text-gray-700">
                Lý do hoàn tiền
              </label>
              <select
                value={refundRequest.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
                className="w-full border p-4 rounded-lg focus:ring focus:ring-orange-300 text-gray-700"

              >
                <option value="">Chọn Lý Do</option>
                <option value="Hàng bị hư hỏng">Hàng bị hư hỏng</option>
                <option value="Giao sai sản phẩm">Giao sai sản phẩm</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* số tài khoản */}
            <div>
              <label className="block text-base font-medium mb-3 text-gray-700">
                Số tài khoản
              </label>
              <input
                value={refundRequest.account_number}
                onChange={(e) => handleChange("account_number", e.target.value)}
                type="number"
                placeholder="Nhập Số Tài Khoản"
                className="w-full border p-4 rounded-lg focus:ring focus:ring-orange-300 text-gray-700"
              />
            </div>

            {/* họ và tên dk ngân hàng */}
            <div>
              <label className="block text-base font-medium mb-3 text-gray-700">
                Họ và tên
              </label>
              <input
                value={refundRequest.account_holder}
                onChange={(e) => handleChange("account_holder", e.target.value)}
                type="text"
                placeholder="Nhập Họ Và Tên Tài Khoản"
                className="w-full border p-4 rounded-lg focus:ring focus:ring-orange-300 text-gray-700"
              />
            </div>


            {/* tên ngân hàng  */}
            <div>
              <label className="block text-base font-medium mb-3 text-gray-700">
                Tên ngân hàng
              </label>
              <input
                value={refundRequest.bank_name}
                onChange={(e) => handleChange("bank_name", e.target.value)}
                type="text"
                placeholder="Nhập Tên Ngân Hàng"
                className="w-full border p-4 rounded-lg focus:ring focus:ring-orange-300 text-gray-700"
              />
            </div>

            {/* Upload Image */}
            <div >
              <label className="block text-base font-medium mb-3 text-gray-700">
                Tải QR Bank
              </label>
              <div className="flex items-center justify-start gap-4">
                {/* Label Upload ảnhảnh */}
                <label
                  htmlFor="upload-image"
                  className="w-[90px] h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-black"
                >
                  <MdOutlineCameraAlt className="text-2xl text-gray-600" />
                  <p className="text-xs text-gray-600">Thêm Hình ảnh</p>
                </label>
                <input
                  id="upload-image"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                {/* Preview Images */}
                <div className="flex gap-4">
                  {images.map((image, index) => (
                    <div>
                      <div className="relative w-24 h-24 bg-gray-300 group overflow-hidden">
                        {/* Hình ảnh */}
                        <div>
                          <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`Hình ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>

                        <div
                          className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out"
                        >
                          <span onClick={() => handleDeleteImage(index)} className="text-white text-sm">
                            <FaRegTrashCan />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin hoàn tiền và phần upload ảnh và video lên */}
          <div className="col-span-1 p-6 border rounded-lg bg-white ">

            {/* phần upload video sản phẩm muốn hoàn trả lên  */}
            <div className="p-4 border rounded-lg">
              <p className="text-black text-sm mb-4">
                *Đăng tải video thấy rõ số lượng và tất cả sản phẩm nhận muốn hoàn trả.
              </p>
              <div className="flex gap-4">
                {/* Upload Video */}
                <label
                  htmlFor="upload-video"
                  className={`w-[90px] h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg ${video ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-black"
                    }`}
                >
                  <CiVideoOn className="text-2xl text-gray-600" />
                  <p className="text-xs text-gray-600">Thêm Video</p>
                </label>
                <input
                  id="upload-video"
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  disabled={!!video}
                />
              </div>

              {/* Preview Video */}
              <div className="mt-4">
                {video && (
                  <div className="relative group overflow-hidden">
                    {/* video */}
                    <div >
                      <video controls className=" max-w-md rounded-lg">
                        <source src={URL.createObjectURL(video)} type="video/mp4" />
                      </video>
                    </div>

                    {/* Thẻ hiện từ dưới lên */}
                    <div
                      className="w-[70%] absolute bottom-0 left-0 right-0 bg-black/60 py-2 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out"
                    >
                      <span onClick={handleDeleteVideo} className="text-white text-sm">
                        <FaRegTrashCan />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* thông tin số tiền muốn hoàn trả */}
            <h2 className="text-lg font-semibold mb-6 text-gray-800">
              Thông tin hoàn tiền
            </h2>
            <div>
              <p className="text-base mb-6 text-gray-700">
                Số tiền hoàn lại:
                <span className="font-semibold text-green-500">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalMoney)}
                </span>
              </p>

              <p className="text-base mb-6 text-gray-700">
                Hoàn tiền vào:{" "}
                <span className="font-semibold text-gray-800">
                  SỐ DƯ TÀI KHOẢN CỦA KHÁCH HÀNG
                </span>
              </p>
            </div>
          </div>

          {/* Nút Hoàn thành */}
          <div className="col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              disabled={isSubmitted} // Disable nút nếu đã submit thành công
              className={`py-3 px-8 rounded-lg transition-all text-base font-medium ${isSubmitted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-orange-600"
                }`}
            >
              {isSubmitted ? "Đã hoàn thành" : "Hoàn thành"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default RefundForm;
