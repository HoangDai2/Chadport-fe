import React from "react";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { AiFillContainer } from "react-icons/ai";
import { Link } from "react-router-dom";
const RefundModal = ({ onClose }: any) => {
  return (
    <div
      style={{ marginLeft: "0px" }}
      className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
    >
      <div className="bg-white mt-[90px] p-6 rounded-lg w-[500px]">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold">Tình huống bạn đang gặp?</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4 mt-4">
          <Link to="/formrefund">
            <div className="mb-4 p-4 border rounded-lg hover:bg-gray-10 cursor-pointer flex items-start gap-4">
              <HiMiniReceiptRefund className="text-7xl mt-1" />
              <div>
                <p className="text-left font-semibold">
                  Tôi đã nhận hàng nhưng hàng có vấn đề (bể vỡ, sai mẫu, hàng
                  lỗi, khác mô tả...) - Miễn ship hoàn về
                </p>
                <p className="text-left text-gray-500 mt-1">
                  Lưu ý: Trường hợp yêu cầu Trả hàng Hoàn tiền của bạn được chấp
                  nhận, Voucher có thể sẽ không được hoàn lại
                </p>
              </div>
            </div>
          </Link>

          <Link to="/formrefund">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer flex items-start gap-4">
              <AiFillContainer className="text-7xl  mt-1" />
              <div>
                <p className="text-left font-semibold">
                  Tôi chưa nhận hàng/nhận thiếu hàng
                </p>
                <p className="text-left text-gray-500 mt-1">
                  Lưu ý: Trong trường hợp yêu cầu Trả Hàng Hoàn tiền của bạn
                  được chấp nhận, Voucher, Phí vận chuyển có thể không được hoàn
                  lại
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;
