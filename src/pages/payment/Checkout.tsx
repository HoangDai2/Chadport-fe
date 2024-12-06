import React, { useState, useEffect } from "react";
import apisphp from "../../Service/api";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { MdLocationOn } from "react-icons/md";
import AddressForm from "./Address";
import { useUserContext } from "../AuthClient/UserContext";
import { AddressData } from "../../Types/TUsers";
import CartData from "../../Types/TCart";
import { FaSackDollar } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
const Checkout = () => {
  const { user } = useUserContext();

  const [checked, setCheckes] = useState<CartData | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // state này check xem khi nào người dùng thêm địa chỉ mới thì mới hiên dữ liệu
  const [checkdata, setCheckData] = useState(false);
  console.log(checkdata);

  const [getaddress, setGetaddress] = useState<AddressData | null>(null);

  // state quản lí trạng thái form thanh toán online và offline
  const [formpayment, setFormPayment] = useState("");

  // state quản lí khi chọn địa chỉ mặc định hoặc new
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
  });

  // Hàm xử lý khi ấn nút "Thêm địa chỉ"
  const handleAddAddressClick = () => {
    setIsFormVisible(true); // Hiển thị form thêm địa chỉ
  };

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

  // call dữ liệu được chọn từ bên giỏ hàng
  useEffect(() => {
    const fetchdataChecked = async () => {
      try {
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

        const dataChecked = await apisphp.get("/user/getcheckcart", {
          headers,
        });
        setCheckes(dataChecked.data);
        // console.log("data checked", dataChecked.data);

        return dataChecked.data;
      } catch (error) {}
    };
    fetchdataChecked();
  }, []);

  // call data address mới
  useEffect(() => {
    const fetchNewAddress = async () => {
      try {
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

        const dataChecked = await apisphp.get("/user/getadress", {
          headers,
        });

        setGetaddress(dataChecked.data.address);
        console.log("data address", dataChecked.data.address);

        return dataChecked.data;
      } catch (error) {}
    };
    fetchNewAddress();
  }, []);

  useEffect(() => {
    console.log("Address Data:", getaddress);
    const hasValidAddress = !!(
      getaddress?.first_name &&
      getaddress?.last_name &&
      getaddress?.address &&
      getaddress?.phone_number_address &&
      getaddress?.specific_address
    );

    setCheckData(hasValidAddress); // Cập nhật trực tiếp trạng thái
    console.log(hasValidAddress);
  }, [getaddress]); // Chỉ theo dõi sự thay đổi của getaddress

  // hàm xử lí chọn online và offline
  const handleFormPayment = (option: any) => {
    setFormPayment(option);
  };

  // Cập nhật dữ liệu vào form khi chọn địa chỉ
  const handleAddressChange = (addressType: any) => {
    setSelectedAddress(addressType);

    // Cập nhật thông tin form tương ứng với địa chỉ chọn
    if (addressType === "default") {
      setFormData({
        first_name: user?.firt_name || "",
        last_name: user?.last_name || "",
        phone_number: user?.phone_number || "",
        address: user?.address || "",
      });
    } else if (addressType === "new") {
      setFormData({
        first_name: getaddress?.first_name || "",
        last_name: getaddress?.last_name || "",
        phone_number: getaddress?.phone_number_address || "",
        address: getaddress?.specific_address || "",
      });
    }
  };

  // Hàm xử lý khi người dùng thay đổi thông tin trong form
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            {/* hiển thị danh sách mặc định vaf addressnew */}

            {/* nút thêm địa chỉ */}
            <div className="flex justify-between items-center mb-[30px] text-left border-b border-gray-500 border-opacity-50">
              <div>
                <span className="font-bold text-2xl">Address</span>
              </div>
              <div className="text-right">
                <button
                  onClick={handleAddAddressClick}
                  className="font-semibold text-blue-500 font-bold"
                >
                  Thêm địa chỉ
                </button>
              </div>
            </div>

            <fieldset style={{ marginBottom: "30px" }}>
              <legend className="sr-only">Checkboxes</legend>

              <div className="space-y-2">
                {/* địa chỉ mặc định */}
                <label
                  htmlFor="Option1"
                  className="flex justify-between cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                >
                  <div>
                    <div className="flex">
                      <div className="flex items-center">
                        &#8203;
                        <input
                          type="checkbox"
                          className="size-4 rounded border-gray-300"
                          id="Option1"
                          checked={selectedAddress === "default"}
                          onChange={() => handleAddressChange("default")}
                        />
                      </div>

                      <div className="w-[170px] text-lg font-bold text-left flex items-center space-x-2">
                        <MdLocationOn className="text-xl text-blue-500" />
                        <span className="text-gray-800">Địa chỉ nhận hàng</span>
                      </div>
                    </div>
                    <div className="w-[100%] flex justify-between">
                      <p className=" mt-1 text-pretty text-sm text-gray-700">
                        {/* Thông tin địa chỉ */}
                        <div className="mt-6 space-y-4 text-left flex gap-[20px]">
                          <div
                            className="flex gap-[10px] "
                            style={{ fontSize: "1rem" }}
                          >
                            <span className="font-bold text-black">
                              {user?.firt_name} {user?.last_name}
                            </span>

                            <span className="font-bold text-gray-700">
                              {user?.phone_number}
                            </span>
                            <span className="text-gray-600 ml-2">
                              {user?.address}
                            </span>
                            <span className="text-gray-800 text-left">
                              (Mặc định)
                            </span>
                          </div>
                        </div>
                      </p>
                    </div>
                  </div>
                  <div className="w-[260px] text-right">
                    <div className="flex flex-col items-end ">
                      <button className="font-semibold p-2 text-blue-500 font-bold">
                        Cập Nhật
                      </button>

                      {/* Hiển thị AddressForm khi isFormVisible là true */}
                    </div>
                  </div>
                </label>

                {/* địa chỉ mơi */}
                {checkdata && (
                  <label
                    htmlFor="Option2"
                    className="flex justify-between cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                  >
                    <div>
                      <div className="flex">
                        <div className="flex items-center">
                          &#8203;
                          <input
                            type="checkbox"
                            className="size-4 rounded border-gray-300"
                            id="Option2"
                            checked={selectedAddress === "new"}
                            onChange={() => handleAddressChange("new")}
                          />
                        </div>

                        <div className="w-[170px] text-lg font-bold text-left flex items-center space-x-2">
                          <MdLocationOn className="text-xl text-blue-500" />
                          <span className="text-gray-800">
                            Địa chỉ nhận hàng
                          </span>
                        </div>
                      </div>
                      <div className="w-[100%] flex justify-between">
                        <p className=" mt-1 text-pretty text-sm text-gray-700">
                          {/* Thông tin địa chỉ */}
                          <div className="mt-6 space-y-4 text-left flex gap-[20px]">
                            <div
                              className="flex gap-[10px] "
                              style={{ fontSize: "1rem" }}
                            >
                              <span className="font-bold text-black">
                                {getaddress?.first_name} {getaddress?.last_name}
                              </span>

                              <span className="font-bold text-gray-700">
                                {getaddress?.phone_number_address}
                              </span>
                              <span className="text-gray-600 ml-2">
                                {getaddress?.specific_address}
                              </span>
                            </div>
                          </div>
                        </p>
                      </div>
                    </div>
                    <div className="w-[260px] text-right">
                      <div className="flex flex-col items-end ">
                        <button className="font-semibold p-2 text-blue-500 font-bold">
                          Cập Nhật
                        </button>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </fieldset>
            <div className="-mx-3 md:flex items-start">
              {/* hiển thị sản phẩm được chọn từ bên giỏ hàng hoặc mua ngay sản phẩm  */}
              <div className="px-3 md:w-7/12 lg:pr-10">
                <div className="mb-[20px] text-left border-b border-gray-500 border-opacity-50">
                  <span className="font-bold text-2xl">Products</span>
                </div>
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

                {/* thành tiền  */}
                <div className="mt-[40px] text-left border-b border-gray-500 border-opacity-50">
                  <span className="font-bold text-2xl">Total Money</span>
                </div>
                <div className="mt-[20px] mb-6 pb-6 border-b border-gray-200 text-gray-800 text-left">
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
                {/* phân này là gọi form bên addressform */}
                {isFormVisible && (
                  <AddressForm setIsFormVisible={setIsFormVisible} />
                )}

                {/* phần này là form thanh toán  */}
                <div className=" text-left border-b border-gray-500 border-opacity-50">
                  <span className="font-bold text-2xl">Payment Methods</span>
                </div>
                <div
                  className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6"
                  style={{ marginTop: "2rem" }}
                >
                  <div className="w-full p-3 border-b border-gray-200">
                    <div className=" w-[100%] flex items-center justify-around gap-[10px]">
                      {/* Thanh toán khi nhận hàng */}
                      <label
                        htmlFor="Option3"
                        className=" w-[50%] flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition duration-200 ease-in-out hover:bg-blue-50 "
                      >
                        <div className="flex items-center">
                          &#8203;
                          <input
                            type="radio"
                            className="size-4 rounded border-gray-300"
                            id="Option3"
                            name="paymentOption"
                            onChange={() => {
                              handleFormPayment("code");
                            }}
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-center">
                            <FaSackDollar />
                            <span className="text-pretty font-medium text-gray-900 ml-2">
                              Cash on Delivery
                            </span>
                          </div>
                        </div>
                      </label>

                      {/* Thanh toán online */}
                      <label
                        htmlFor="Option4"
                        className="w-[50%] flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition duration-200 ease-in-out hover:bg-blue-50 "
                      >
                        <div className="flex items-center">
                          &#8203;
                          <input
                            type="radio"
                            className="size-4 rounded border-gray-300"
                            id="Option4"
                            name="paymentOption"
                            onChange={() => {
                              handleFormPayment("online");
                            }}
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-center">
                            <MdPayment />
                            <span className="text-pretty font-medium text-gray-900 ml-2">
                              Online Payment
                            </span>
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="border-b mb-[20px]"></div>

                    {/* form thanh toán khi nhận hàng */}
                    {formpayment === "code" && (
                      <div className="max-w-4xl mx-auto bg-white rounded-lg">
                        {/* First Name and Last Name */}
                        <div className=" mb-6 grid grid-cols-2 gap-6">
                          {/* First Name */}
                          <div className="input-group">
                            <label
                              htmlFor="firstName"
                              className=" text-sm font-semibold text-gray-700 mb-2 block"
                            >
                              First Name
                            </label>
                            <input
                              id="firstName"
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                              placeholder="John"
                              type="text"
                              name="firt_name"
                              value={formData.first_name}
                              onChange={handleInputChange}
                            />
                          </div>

                          {/* Last Name */}
                          <div className="input-group">
                            <label
                              htmlFor="lastName"
                              className="text-sm font-semibold text-gray-700 mb-2 block"
                            >
                              Last Name
                            </label>
                            <input
                              id="lastName"
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                              placeholder="Smith"
                              type="text"
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div className="mb-6">
                          <label
                            htmlFor="nameOnCard"
                            className="text-left text-sm font-semibold text-gray-700 mb-2 block"
                          >
                            Phone Number
                          </label>
                          <input
                            id="nameOnCard"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="PhoneNumber"
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* Address */}
                        <div className="mb-6">
                          <label
                            htmlFor="cardNumber"
                            className="text-left text-sm font-semibold text-gray-700 mb-2 block"
                          >
                            Address
                          </label>
                          <input
                            id="cardNumber"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="Address"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>

                        {/* code giảm giá  */}
                        <div className="mb-6">
                          <label
                            htmlFor="cardNumber"
                            className="text-left text-sm font-semibold text-gray-700 mb-2 block"
                          >
                            Have a promo code
                          </label>
                          <input
                            id="cardNumber"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="Code"
                            type="text"
                          />
                        </div>
                      </div>
                    )}

                    {/* form thanh toán online */}
                    {formpayment === "online" && <div>VNPAY</div>}
                  </div>
                </div>
                {/* nút thanh toán pay now */}
                <div className="mt-[55px]">
                  <button className=" block w-full mx-auto bg-black hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold">
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
