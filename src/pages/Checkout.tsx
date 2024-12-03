import axios from "axios";
import React, { useState, useEffect } from "react";
import apisphp from "../Service/api";
import CartData from "../Types/TCart";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Checkout = () => {
  const [checked, setCheckes] = useState<CartData | null>(null);

  // call dữ liệu được chọn từ bên giỏ hàng
  useEffect(() => {
    const fetchdataChecked = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        console.log("Token:", token);
        if (!token) {
          console.log("Token not found");
          return;
        }

        // Cấu hình header để thêm token vào yêu cầu
        const headers = {
          Authorization: `Bearer ${token}`, // Gửi token vào header Authorization
        };

        const dataChecked = await apisphp.get("/user/getcheckcart", {
          headers,
        });
        setCheckes(dataChecked.data);
        console.log("data checked", dataChecked.data);

        return dataChecked.data;
      } catch (error) {}
    };
    fetchdataChecked();
  }, []);

  // bỏ trạng thanh từ false thành true từ bên checkout để k thanh toán
  const handleRemoveItem = async (cartItemIds: number) => {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        console.error("Token không hợp lệ");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await apisphp.post(
        "/user/updatecheckcart",
        { cart_item_id: cartItemIds },
        { headers }
      );
      // Kiểm tra xem yêu cầu đã thành công chưa
      if (response.status === 200) {
        // Cập nhật lại giỏ hàng sau khi xóa sản phẩm
        setCheckes((prevChecked) => {
          if (prevChecked) {
            // Cập nhật lại state để bỏ sản phẩm vừa bỏ chọn
            return {
              ...prevChecked,
              cart_items: prevChecked.cart_items.filter(
                (item) => item.cart_item_ids !== cartItemIds
              ),
            };
          }
          return prevChecked;
        });

        toast.success("Sản phẩm đã được bỏ chọn!");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm", error);
    }
  };

  // Kiểm tra dữ liệu và đảm bảo rằng nó đã được tải thành công
  if (!checked) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị thông báo tải nếu chưa có dữ liệu
  }

  return (
    <>
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />

      <div className="min-w-screen min-h-screen bg-gray-50 py-5">
        {/* tiêu đề  */}
        <div id="title" className="page-title bg-gray-50 py-6 mt-[120px]">
          <div className="section-container max-w-7xl mx-auto px-6">
            <div className="content-title-heading mb-4">
              <h1 className="text-title-heading" style={{ fontSize: "50px" }}>
                Check_out
              </h1>
            </div>
            <div className="breadcrumbs text-sm text-gray-600 font-inter">
              <a href="/" className="hover:text-blue-500">
                Home
              </a>
              <span className="delimiter mx-2">/</span>
              <a href="/shop-grid-left" className="hover:text-blue-500">
                Cart
              </a>
              <span className="delimiter mx-2">/</span>
              <span className="text-gray-900">Nike</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
          <div className="w-full">
            <div className="-mx-3 md:flex items-start">
              <div className="px-3 md:w-7/12 lg:pr-10">
                {/* hiển thị sản phẩm được chọn từ bên giỏ hàng hoặc mua ngay sản phẩm  */}
                {checked.cart_items?.length > 0 ? (
                  checked.cart_items.map((item) => (
                    <li
                      key={item.product_item_id}
                      className="relative  flex items-center justify-between gap-6 p-4 border-b border-gray-200"
                    >
                      {/* Biểu tượng đóng */}
                      <div
                        onClick={() => handleRemoveItem(item.cart_item_ids)} // Hàm xử lý xóa sản phẩm
                        className="absolute top-[-16px] right-[-15px] p-2 cursor-pointer"
                      >
                        <FaTimes />
                      </div>

                      {/* Hình ảnh sản phẩm */}
                      <img
                        src={`http://127.0.0.1:8000/storage/${item.image_product}`}
                        className="h-20 w-20 rounded object-cover"
                      />

                      {/* Thông tin sản phẩm */}
                      <div className="flex-1 text-left">
                        <h3 className="text-sm text-gray-900">
                          {item.product_name}
                        </h3>
                        <dl className="mt-0.5 space-y-px text-xs text-gray-600">
                          <div>
                            <dt className="inline">Size:</dt>
                            <dt className="inline">{item.size.name}</dt>
                          </div>
                          <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">{item.color.name}</dd>
                          </div>
                        </dl>
                      </div>

                      {/* Phần chỉnh sửa số lượng */}
                      <div className="flex items-center justify-center w-[80px]">
                        <input
                          type="number"
                          value={item.quantity}
                          className="w-full text-center bg-gray-100 border rounded"
                          readOnly
                        />
                      </div>

                      {/* Giá sản phẩm */}
                      <span className="w-[120px] text-right tracking-wider font-semibold text-green-600">
                        {isNaN(Number(item.product_sale_price))
                          ? "Giá không hợp lệ"
                          : new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(Number(item.product_sale_price))}
                      </span>
                    </li>
                  ))
                ) : (
                  <p>Giỏ hàng của bạn không có sản phẩm nào.</p>
                )}

                {/* app code giảm giá */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="-mx-2 flex items-end justify-end">
                    <div className="flex-grow px-2 lg:max-w-xs">
                      <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                        Discount code
                      </label>
                      <div>
                        <input
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="XXXXXX"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="px-2">
                      <button className="block w-full max-w-xs mx-auto border border-transparent bg-black hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">
                        APPLY
                      </button>
                    </div>
                  </div>
                </div>

                {/* thành tiền  */}
                <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800 text-left">
                  <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Giá Gốc</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold"></span>
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Taxes (GST)</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">$19.09</span>
                    </div>
                  </div>
                </div>

                {/* tổng tiền sản phẩm  */}
                <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl text-left">
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Total</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold" style={{ color: "red" }}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(checked?.total_amount || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 md:w-5/12">
                {/* phần này là chọn địa chỉ có sẵn  */}
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-3 items-center">
                    <div className="w-32">
                      <span className="text-gray-600 font-semibold">
                        Contact
                      </span>
                    </div>
                    <div className="flex-grow pl-3">
                      <span>Scott Windon</span>
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="w-32">
                      <span className="text-gray-600 font-semibold">
                        Billing Address
                      </span>
                    </div>
                    <div className="flex-grow pl-3">
                      <span>123 George Street, Sydney, NSW 2000 Australia</span>
                    </div>
                  </div>
                </div>

                {/* phần này là form thanh toán và địa chỉ người dùng */}
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                  <div className="w-full p-3 border-b border-gray-200">
                    <div className="flex items-center gap-[35px]">
                      {/* Thanh toán khi nhận hàng */}
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-indigo-500 peer"
                          name="type"
                          id="type1"
                          checked
                        />
                        <span className="bg-[#f1f5f9] text-xs text-[#3b82f6] font-medium py-1 px-3 rounded-md inline-block peer-checked:bg-[#3b82f6] peer-checked:text-white peer-checked:font-semibold peer-checked:scale-105 transition-all ml-2">
                          Thanh toán khi nhận hàng
                        </span>
                      </div>

                      {/* Thanh toán online momo */}
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-indigo-500"
                          name="type"
                          id="type2"
                        />
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                          width="80"
                          className="ml-3"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 text-left">
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                          Name on card
                        </label>
                        <div>
                          <input
                            className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="John Smith"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="mb-3 text-left">
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                          Card number
                        </label>
                        <div>
                          <input
                            className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="0000 0000 0000 0000"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="mb-3 -mx-2 flex items-end text-left">
                        <div className="px-2 w-1/4">
                          <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                            Expiration date
                          </label>
                          <div>
                            <select className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                              <option value="01">01 - January</option>
                              <option value="02">02 - February</option>
                              <option value="03">03 - March</option>
                              <option value="04">04 - April</option>
                              <option value="05">05 - May</option>
                              <option value="06">06 - June</option>
                              <option value="07">07 - July</option>
                              <option value="08">08 - August</option>
                              <option value="09">09 - September</option>
                              <option value="10">10 - October</option>
                              <option value="11">11 - November</option>
                              <option value="12">12 - December</option>
                            </select>
                          </div>
                        </div>
                        <div className="px-2 w-1/4">
                          <select className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                          </select>
                        </div>
                        <div className="px-2 w-1/4">
                          <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                            Security code
                          </label>
                          <div>
                            <input
                              className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                              placeholder="000"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* nút thanh toán pay now */}
                <div>
                  <button className="block w-full max-w-xs mx-auto bg-black hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold">
                    <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
