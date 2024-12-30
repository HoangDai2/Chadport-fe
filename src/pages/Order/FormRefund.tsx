import React, { useState } from "react";

const RefundForm = () => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("maily0332446519@gmail.com");
  const refundAmount = 22000;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ reason, description, email });
  };

  return (
    <>
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

      <div className=" text-left mx-auto p-8 bg-white  rounded-lg ">
        {/* tình huống hủy hàng  */}
        <div
          style={{ padding: "20px" }}
          className="border rounded-lg  items-center bg-gray-50 "
        >
          <h1 className="text-xl font-bold mb-8 text-gray-800">
            Tình huống bạn đang gặp?
          </h1>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            Tôi đã nhận hàng nhưng gặp vấn đề (vỡ, sai màu, hàng lỗi...) - Miễn
            ship hoàn về
          </p>
        </div>

        <div className="grid grid-cols-6 grid-rows-3 gap-6 mb-8">
          {/* sản phảm được chọn hủy hàng */}
          <div className="col-span-6 p-6 border rounded-lg items-center bg-gray-50 mt-[20px]">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">
              Sản phầm được chọn hủy hàng
            </h2>
            <div className="flex">
              <img
                src="https://via.placeholder.com/50"
                alt="product"
                className="w-20 h-20 object-cover mr-6 rounded-md"
              />
              <div>
                <p className="font-semibold text-lg text-gray-800">
                  Maycheer Bật lông dê che phủ...
                </p>
                <p className="text-base text-gray-600">đá/Gray - 22.000đ</p>
              </div>
            </div>
          </div>

          {/* lý do người dùng muốn hủy hàng */}
          <div className="col-span-3 row-span-2 row-start-2 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">
              Lý do cần Trả hàng và Hoàn tiền
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-base font-medium mb-3 text-gray-700">
                  Lý do
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border p-4 rounded-lg focus:ring focus:ring-orange-300 text-gray-700"
                >
                  <option value="">Chọn Lý Do</option>
                  <option value="damaged">Hàng bị hư hỏng</option>
                  <option value="wrong-item">Giao sai sản phẩm</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-medium mb-3 text-gray-700">
                  Mô tả
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border p-4 rounded-lg focus:ring focus:ring-orange-300 text-gray-700"
                  rows={5}
                  placeholder="Chi tiết vấn đề bạn gặp phải"
                ></textarea>
              </div>
            </form>
          </div>

          {/* thông tin hoàn tiền  */}
          <div className="col-span-3 row-span-2 col-start-4 row-start-2 p-6 border rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">
              Thông tin hoàn tiền
            </h2>
            <div>
              <p className="text-base mb-6 text-gray-700">
                Số tiền hoàn lại:
                <span className="font-semibold text-gray-800">
                  {" "}
                  ₫ {refundAmount.toLocaleString()}
                </span>
              </p>
              <p className="text-base mb-6 text-gray-700">
                Hoàn tiền vào:{" "}
                <span className="font-semibold text-gray-800">
                  Số dư TK Shopee
                </span>
              </p>
              <label className="block text-base font-medium mb-3 text-gray-700">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-4 rounded-lg focus:ring focus:ring-orange-300 text-gray-700"
              />
            </div>
            {/* Căn nút xuống góc phải */}
            <div className="flex justify-end mt-[5.5rem]">
              <button
                type="submit"
                className="bg-black text-white py-3 px-8 rounded-lg hover:bg-orange-600 transition-all text-base font-medium"
              >
                Hoàn thành
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundForm;
