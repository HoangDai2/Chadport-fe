import React, { useState, useEffect } from "react";
import { CgChevronRight } from "react-icons/cg";
import apisphp from "../../../Service/api";
import { CancelOrders } from "../../../Types/TListCancelOrder";
import { toast, ToastContainer } from "react-toastify";
import { useLoading } from "../../../pages/Loadings/LoadinfContext";
type Props = {};

const Row = ({ row, setCancelOrder }: { row: any, setCancelOrder: Function }) => {
  const [open, setOpen] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  // Giải mã JSON và xử lý undefined
  const parsedNoteUser = row.note_user ? JSON.parse(row.note_user) : {};
  const accountInfo = parsedNoteUser.account_info || {};

  const handleSubmitRefndandCancel = async (check_refund: number, reason: string) => {
    startLoading();
    try {
      // Gửi yêu cầu API
      const dataRefundAndCancel = await apisphp.post("/confirm_refund", {
        order_id: row.id,
        check_refund: check_refund,
        reason: reason,
      });

      // Hiển thị thông báo khi thành công
      if (check_refund === 1) {
        toast.success("Xác nhận hoàn tiền thành công!");
      } else if (check_refund === 2) {
        toast.success("Admin Từ chối hoàn tiền!");
      }
      // Gọi lại API để cập nhật danh sách mới nhất
      const responseCancel = await apisphp.get("/list_refund");
      setCancelOrder(responseCancel.data.data || []);
      console.log(dataRefundAndCancel.data);
    } catch (error) {
      // Hiển thị thông báo khi gặp lỗi
      console.error("Lỗi xử lý hoàn tiền:", error);
      toast.error("Có lỗi xảy ra khi xử lý hoàn tiền.");
    } finally {
      // Kết thúc trạng thái loading
      stopLoading();
    }
  };


  return (
    <>
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
      {/*thông tin order*/}
      <tr className="border-b border-gray-300">
        <td
          onClick={() => setOpen(!open)}
          className="h-[53px] px-4 py-2  border-gray-300 cursor-pointer flex items-center justify-center"
        >
          <button
            className={`text-gray-600 hover:text-gray-800 transform transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"
              }`}
          >
            <CgChevronRight />
          </button>
        </td>

        <td className="px-4 py-2 border border-gray-300">{row.oder_number}</td>
        <td className="px-4 py-2 border border-gray-300">Chờ kiên</td>
        <td className="px-4 py-2 border border-gray-300">Chờ kiên</td>
        <td className="px-4 py-2 border border-gray-300 text-right">
          {row.created_at}
        </td>
        <td className="px-4 py-2 border border-gray-300 text-right">
          {row.check_refund === 0 ? (
            <span className="text-red-500 font-semibold">Đơn yêu cầu hủy</span>
          ) : (
            "Khác"
          )}
        </td>

        <td className="px-4 py-2 border border-gray-300 text-right">
          {row.status}
        </td>
        <td className="px-4 py-2 border border-gray-300 text-right">
          {row.total_money} VND
        </td>
      </tr>

      {/* Tổng hợp thông tin của đơn hàng  */}
      <tr>
        <td colSpan={8} className="px-4 py-2 border border-gray-300">
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            {/* Chi tiết đơn hàng */}
            <h4 className="text-gray-700 font-semibold mb-2">Chi Tiết Khách Hàng</h4>
            <table className="w-full text-sm text-left text-gray-600 bg-gray-50">
              <thead className="text-gray-700 bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Tên khách hàng</th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                  <th className="px-4 py-2 border border-gray-300">Số điện thoại</th>
                  <th className="px-4 py-2 border border-gray-300">Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-gray-300">
                    {row.user.firt_name} {row.user.last_name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{row.user.email}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {row.user.phone_number}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {row.user.address}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Chi tiết sản phẩm */}
            <h4 className="text-gray-700 font-semibold mt-4 mb-2">
              Chi Tiết Sản Phẩm
            </h4>
            <table className="w-full text-sm text-left text-gray-600 bg-gray-50">
              <thead className="text-gray-700 bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Tên sản phẩm</th>
                  <th className="px-4 py-2 border border-gray-300 text-right">Image</th>
                  <th className="px-4 py-2 border border-gray-300 text-right">
                    Số Lượng
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-right">Giá</th>
                  <th className="px-4 py-2 border border-gray-300 text-right">
                    Biến thể
                  </th>
                </tr>
              </thead>
              <tbody>
                {row.order_details.map((detail: any, index: number) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-300">
                      {detail.product_item.product.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <img
                        width={"100px"}
                        src={`http://127.0.0.1:8000/storage/${detail.product_item.product.image_product}`}
                        alt=""
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-right">
                      {detail.quantity}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-right">
                      <p className="text-sm text-gray-500 ">

                        {detail.price
                          ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(Math.ceil(detail.price))
                          : "null"}
                      </p>
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-right">
                      <div className="flex items-center justify-center space-x-2">
                        {/* Màu sắc */}
                        <span
                          className="inline-block w-5 h-5 rounded-full border-2 border-gray-300 shadow-sm"
                          style={{
                            backgroundColor: detail.product_item.color.hex || "#E5E7EB",
                          }}
                        ></span>
                        {/* Kích thước */}
                        <span className="font-medium text-gray-800">
                          Size: {detail.product_item.color.name} - {detail.product_item.size.name}
                        </span>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {/* Lý do hủy */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md shadow-md mt-6">
              <h4 className="text-yellow-700 font-bold text-lg mb-3">
                📋 Lý do hủy
              </h4>
              <p className="text-gray-800 text-base font-medium mb-2">
                <span className="font-bold text-yellow-700">Lý do: </span>
                {parsedNoteUser.reason || "Không có lý do"}
              </p>
              <p className="text-gray-800 text-base font-medium">
                <span className="font-bold text-yellow-700">Thông tin tài khoản: </span>
                {accountInfo.bank_name || "Không có"} -{" "}
                {accountInfo.account_number || "Không có"} (Chủ tài khoản:{" "}
                {accountInfo.account_holder || "Không có"})
              </p>
            </div>


            {/* Nút xác nhận hoặc từ chối của admin */}
            <div className="col-span-2 flex gap-[10px] justify-end mt-6 mb-[30px]">
              <button
                onClick={() => handleSubmitRefndandCancel(1, "Admin đã xác nhận hoàn tiền.")}
                type="submit"
                className="bg-black text-white py-3 px-8 rounded-lg hover:bg-orange-600 transition-all text-base font-medium"
              >
                Xác Nhận
              </button>

              <button
                onClick={() => handleSubmitRefndandCancel(2, "Admin Từ chối hoàn tiền.")}
                type="submit"
                className="bg-gray-500 text-white py-3 px-8 rounded-lg hover:bg-orange-600 transition-all text-base font-medium"
              >
                Từ chối
              </button>
            </div>

          </div>
        </td>
      </tr>
    </>
  );
};


const CancelOrder = (props: Props) => {
  const [cancelorder, setCancelOrder] = useState<CancelOrders[]>([]);
  const [loading, setLoading] = useState(true);

  // call data những đơn hàng user yêu cầu hủy với check_refund =0
  useEffect(() => {
    const dataCancel = async () => {
      try {
        const responseCancel = await apisphp.get("/list_refund")

        setCancelOrder(responseCancel.data.data || []);
        setLoading(false);
        console.log(responseCancel);
      } catch (error) {
        console.log("loi lay data cancel order", error);
      }
    }
    dataCancel();
  }, []);



  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        {/* Vòng tròn quay */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>

        {/* Dòng thông báo */}
        <p className="mt-4 text-gray-600 text-lg font-medium">
          Đang tải dữ liệu
          <span className="animate-pulse">...</span>
        </p>
      </div>
    </div>; // Hiển thị trạng thái loading
  }

  return (
    <div className="overflow-x-auto mx-auto p-4">
      <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg overflow-hidden shadow-lg border border-gray-300">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border border-gray-300">Thao Tác</th>
            <th className="px-4 py-2 border border-gray-300">Mã đơn hàng</th>
            <th className="px-4 py-2 border border-gray-300 text-right">Ảnh QR</th>
            <th className="px-4 py-2 border border-gray-300 text-right">Video Sản Phẩm</th>
            <th className="px-4 py-2 border border-gray-300 text-right">Ngày tạo</th>
            <th className="px-4 py-2 border border-gray-300 text-right">Thanh toán</th>
            <th className="px-4 py-2 border border-gray-300 text-right">Trạng thái</th>
            <th className="px-4 py-2 border border-gray-300 text-right">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {cancelorder.length > 0 ? (
            cancelorder.map((row, index) => (
              <Row key={index} row={row} setCancelOrder={setCancelOrder} />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                Không có đơn hàng nào yêu cầu hoàn tiền .
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CancelOrder;
