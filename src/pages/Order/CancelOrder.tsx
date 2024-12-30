import React, { useState } from "react";

const CancelOrderForm = ({ onClose }: any) => {
  const [selectedReason, setSelectedReason] = useState("");

  const reasons = [
    "Tôi muốn cập nhật địa chỉ/sđt nhận hàng.",
    "Tôi muốn thêm/thay đổi Mã giảm giá.",
    "Tôi muốn thay đổi sản phẩm ",
    "Thủ tục thanh toán rắc rối.",
    "Tôi tìm thấy chỗ mua khác tốt hơn ",
    "Tôi không có nhu cầu mua nữa.",
    "Tôi không tìm thấy lý do hủy phù hợp.",
  ];

  const handleSubmit = () => {
    alert(`Lý do hủy đơn: ${selectedReason}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-10 flex justify-center items-center z-50">
      <div className="p-6 bg-white rounded-lg  w-full max-w-md relative top-[70px]">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-left font-semibold mb-4">Lý Do Hủy</h2>
        <div className="p-4 bg-yellow-100 rounded-md mb-4">
          <p className="text-sm text-yellow-700 text-left">
            Bạn có biết? Bạn có thể cập nhật thông tin nhận hàng cho đơn hàng (1
            lần duy nhất) Nếu bạn xác nhận hủy, toàn bộ đơn hàng sẽ được hủy.
            Chọn lý do hủy phù hợp nhất với bạn nhé!
          </p>
        </div>
        <form>
          {reasons.map((reason, index) => (
            <div key={index} className="mb-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="text-red-500 focus:ring-red-500"
                />
                <span className="text-sm">{reason}</span>
              </label>
            </div>
          ))}
        </form>
        <div className="flex justify-end space-x-4 mt-6">
          <button className="text-gray-600" type="button" onClick={onClose}>
            KHÔNG PHẢI BÂY GIỜ
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-red-600"
            type="button"
            onClick={handleSubmit}
          >
            Hủy Đơn Hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderForm;
