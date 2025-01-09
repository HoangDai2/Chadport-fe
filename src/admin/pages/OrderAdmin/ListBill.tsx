import React, { useEffect, useState } from "react";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { OrderQR } from "./OrderQR";
import { template } from "@babel/core";

interface Order {
  id: number;
  voucher_id: string | null;
  user_id: number;
  oder_number: string;
  payment_method: string;
  total_money: number;
  phone_number: string;
  shipping_address: string;
  billing_address: string;
  firt_name: string;
  last_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  products?: Array<{
    product_id: number;
    product_name: string;
    product_image: string;
    quantity: number;
    size_name: string;
    color_name: string;
    price: number;
  }>;
}

const statusOptions = [
  { key: 1, value: "chờ xử lí", label: "chờ xử lí" },
  { key: 2, value: "đã thanh toán", label: "đã thanh toán" },
  { key: 3, value: "đang giao", label: "đang giao" },
  { key: 4, value: "đã hoàn thành", label: "đã hoàn thành" },
  { key: 5, value: "bị hủy", label: "bị hủy" },
];

const Orders1: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ordersPerPage] = useState<number>(10);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [startDate, setStartDate] = useState<string>(""); // Ngày bắt đầu
  const [endDate, setEndDate] = useState<string>(""); // Ngày kết thúc
  useEffect(() => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.created_at);

      // Kiểm tra trạng thái nếu có filter
      const isStatusMatched = statusFilter
        ? order.status === statusFilter
        : true;

      // Kiểm tra ngày nếu có filter
      const isDateMatched =
        (!startDate || orderDate >= new Date(startDate)) &&
        (!endDate || orderDate <= new Date(endDate));

      // Kết hợp cả điều kiện lọc trạng thái và ngày
      return isStatusMatched && isDateMatched;
    });

    // console.log("Filtered Orders:", filtered);
    setFilteredOrders(filtered);
  }, [statusFilter, orders, startDate, endDate]);

  const indexTruoc = currentPage * ordersPerPage;
  const indexSau = indexTruoc - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexSau, indexTruoc);

  const handleDateFilter = () => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.created_at).toISOString().split("T")[0]; // Đảm bảo định dạng ngày là yyyy-mm-dd

      const isStatusMatched = statusFilter
        ? order.status === statusFilter
        : true;

      // Nếu có endDate, cộng thêm một ngày vào đó
      const modifiedEndDate = endDate ? new Date(endDate) : null;
      if (modifiedEndDate) {
        modifiedEndDate.setDate(modifiedEndDate.getDate() + 1); // Cộng thêm 1 ngày để bao gồm cả ngày cuối
      }

      // Kiểm tra xem ngày có khớp với bộ lọc không
      const isDateMatched =
        (!startDate || orderDate >= startDate) &&
        (!modifiedEndDate ||
          orderDate < modifiedEndDate.toISOString().split("T")[0]);

      return isStatusMatched && isDateMatched;
    });

    setFilteredOrders(filtered);
  };

  const handleTodayFilter = () => {
    const today = new Date().toISOString().split("T")[0]; // Lấy ngày hôm nay dưới dạng yyyy-mm-dd

    // Cộng thêm 1 ngày vào endDate
    const modifiedEndDate = new Date(today);
    modifiedEndDate.setDate(modifiedEndDate.getDate() + 1); // Cộng thêm 1 ngày

    // Chuyển lại endDate thành định dạng yyyy-mm-dd
    const endDate = modifiedEndDate.toISOString().split("T")[0];

    setStartDate(today);
    setEndDate(endDate); // Cập nhậ
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ data: Order[] }>(
          "http://127.0.0.1:8000/api/all-ordersAdmin"
        );
        const sortedOrders = response.data.data.sort((a, b) => b.id - a.id);
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  // console.log(orders);
  // useEffect(() => {
  //   const filtered = statusFilter
  //     ? orders.filter((order) => order.status === statusFilter)
  //     : orders;
  //   setFilteredOrders(filtered);
  // }, [statusFilter, orders]);
  // console.log(filteredOrders);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleStatusChangeSubmit = async (
    orderId: number,
    newStatus: string
  ) => {
    try {
      const currentOrder = orders.find((order) => order.id === orderId);
      if (!currentOrder) {
        toast.error("Order not found!");
        return;
      }

      const currentStatusKey = statusOptions.find(
        (status) => status.value === currentOrder.status
      )?.key;
      const newStatusKey = statusOptions.find(
        (status) => status.value === newStatus
      )?.key;

      if (
        currentStatusKey !== undefined &&
        newStatusKey !== undefined &&
        newStatusKey < currentStatusKey
      ) {
        toast.error("Không thể quay lại trạng thái trước đó!");
        return;
      }

      // Nếu chuyển từ "chờ xử lý" (1) sang "đang giao" (3)
      if (
        currentStatusKey === 1 && // trạng thái hiện tại là "chờ xử lý"
        newStatusKey === 3 // trạng thái mới là "đang giao"
      ) {
        // Gửi request chuyển từ 1 -> 2
        const firstResponse = await axios.post(
          "http://127.0.0.1:8000/api/orders/bill/status",
          {
            id: orderId,
            status: 2, // "đã thanh toán"
          }
        );

        if (!firstResponse.data?.message) {
          toast.error("Không thể cập nhật trạng thái đầu tiên!");
          return;
        }

        // Gửi request chuyển từ 2 -> 3
        const secondResponse = await axios.post(
          "http://127.0.0.1:8000/api/orders/bill/status",
          {
            id: orderId,
            status: 3, // "đang giao"
          }
        );

        if (secondResponse.data?.message) {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === orderId ? { ...order, status: newStatus } : order
            )
          );
          toast.success("Cập nhật trạng thái thành công!");
        } else {
          toast.error("Không thể cập nhật trạng thái tiếp theo!");
        }
        return;
      }

      // Gửi request thông thường
      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders/bill/status",
        {
          id: orderId,
          status: newStatusKey,
        }
      );

      if (response.data?.message) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Cập nhật trạng thái thành công!");
      } else {
        toast.error("Cập nhật thất bại!");
      }
    } catch (err) {
      toast.error("Failed to update order status. Please try again.");
    }
  };

  const handleViewDetails = async (orderId: number) => {
    try {
      setLoading(true); // Show loading spinner
      const response = await axios.get<Order>(
        `http://127.0.0.1:8000/api/all-ordersAdmin/${orderId}`
      );
      setSelectedOrder(response.data.data);
      setIsModalOpen(true);
    } catch (err) {
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Order Management
      </h2>

      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <label className="text-sm text-gray-600">Filter by status:</label>
          <select
            className="p-2 border text-sm font-medium text-gray-600 text-center rounded-md w-20 h-9"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="">All</option>
            {statusOptions.map((status) => (
              <option key={status.key} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-sm text-gray-600">From:</label>
          <input
            type="date"
            className="p-2 border text-sm rounded-md w-36"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label className="text-sm text-gray-600">To:</label>
          <input
            type="date"
            className="p-2 border text-sm rounded-md w-36"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              className="w-24 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 flex justify-center"
              onClick={handleDateFilter}
            >
              Filter
            </button>
            <button
              onClick={handleTodayFilter}
              className="w-24 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 flex justify-center"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <PuffLoader color="#3b82f6" size={60} />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Order Number
                </th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider w-24">
                  Total Price
                </th>
                {/* <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Shipping Address
                </th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Billing Address
                </th> */}
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {/* <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Updated At
                </th> */}
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-2 py-3 text-sm text-gray-800">
                    {order.id}
                  </td>
                  <td className="text-sm font-medium text-gray-600 whitespace-nowrap max-w-48 truncate">
                    {order.oder_number}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-800">
                    {`${order.firt_name} ${order.last_name}`}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-gray-600">
                    {order.payment_method === "1"
                      ? "Thanh toán trực tiếp"
                      : order.payment_method === "2"
                      ? "Thanh toán online"
                      : "Credit Card"}
                  </td>
                  <td className="text-sm font-medium text-gray-600 w-24">
                    {order.total_money} VND
                  </td>
                  {/* <td className="px-2 py-3 text-sm font-medium text-gray-600">
                    {order.shipping_address}
                  </td>
                  <td className="px-2 py-3 text-sm font-medium text-gray-600">
                    {order.billing_address}
                  </td> */}
                  {/* hưng */}
                  <td className="p-2 text-gray-700 block md:table-cell">
                    <select
                      className="border border-gray-300 rounded p-2"
                      value={order.status || ""}
                      onChange={(e) =>
                        handleStatusChangeSubmit(order.id, e.target.value)
                      }
                      disabled={order.status === "bị hủy"}
                    >
                      {statusOptions
                        .filter(
                          (status) =>
                            !(
                              order.payment_method === "1" &&
                              status.value === "đã thanh toán"
                            ) // Ẩn "đã thanh toán" nếu payment_method = 1
                        )
                        .map((status) => {
                          const currentStatusKey = statusOptions.find(
                            (option) => option.value === order.status
                          )?.key;

                          const isCurrentStatus = order.status === status.value;

                          return (
                            <option
                              key={status.key}
                              value={status.value}
                              disabled={
                                (currentStatusKey !== undefined &&
                                  status.key < currentStatusKey) ||
                                (status.value === "bị hủy" &&
                                  order.status !== "bị hủy")
                              }
                              className={`${
                                isCurrentStatus ? "bg-blue-500 font-bold" : ""
                              } disabled:bg-gray-300`}
                            >
                              {status.label}
                            </option>
                          );
                        })}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                      onClick={() => handleViewDetails(order.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from(
              { length: Math.ceil(filteredOrders.length / ordersPerPage) },
              (_, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 mx-1 rounded-md ${
                    index + 1 === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      )}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[40rem] p-10 overflow-y-auto max-h-[80vh] shadow-lg relative">
            {/* Nút đóng */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label="Đóng"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </button>

            {/* Nội dung modal */}
            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-center">
                {/* Phần bên trái */}
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900">
                    #{selectedOrder.id}
                  </h2>
                  {/* <p className="text-sm text-gray-500">Order details</p> */}
                </div>

                {/* OrderQR sang bên phải và nhỏ lại */}
                <div className="flex-shrink-0 mb-2">
                  <OrderQR selectedOrder={selectedOrder} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                {/* Phần bên trái */}
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900">
                    <p className="text-sm text-gray-500">Order details</p>
                  </h3>
                </div>
              </div>

              {/* Information */}
              <div
                className="grid grid-cols-2 border-t"
                style={{ gridTemplateColumns: "1fr 1fr" }}
              >
                <p className="text-sm text-left mt-4 text-gray-500">
                  Họ và tên:
                </p>
                <p className="text-sm text-left mt-4 text-gray-500">
                  <span className="font-medium text-gray-900">
                    {`${selectedOrder.firt_name} ${selectedOrder.last_name}`}
                  </span>{" "}
                  {/* Express */}
                </p>
                <p className="text-sm text-left text-gray-500">Trạng thái:</p>
                <p className="text-sm text-left text-gray-500">
                  <span className="font-medium text-gray-900">
                    {selectedOrder.status}
                  </span>{" "}
                </p>
                <p className="text-sm text-left text-gray-500">
                  Số điện thoại:
                </p>
                <p className="text-sm text-left text-gray-500">
                  <span className="font-medium text-gray-900">
                    {selectedOrder.phone_number}
                  </span>{" "}
                </p>
              </div>
              {/*  */}
              <div
                className="grid grid-cols-2 gap-4 border-t bottom-1 pt-4"
                style={{ gridTemplateColumns: "1fr 1fr" }}
              >
                <p className="text-sm text-left text-gray-500">Địa chỉ:</p>
                <p className="text-sm text-left text-gray-500">
                  <span className="font-medium text-gray-900">
                    {selectedOrder.shipping_address}
                  </span>{" "}
                  {/* Express */}
                </p>
                <p className="text-sm text-left text-gray-500">Ngày tạo</p>
                <p className="text-sm text-left text-gray-500">
                  <span className="font-medium text-gray-900">
                    {new Date(selectedOrder.created_at).toLocaleDateString(
                      "vi-VN",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      }
                    )}{" "}
                    |{" "}
                    {new Date(selectedOrder.created_at).toLocaleTimeString(
                      "vi-VN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }
                    )}
                  </span>{" "}
                </p>
              </div>
              {/* Items */}

              {selectedOrder.products && selectedOrder.products.length > 0 ? (
                <div className="">
                  <div className="text-left mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      Product Items
                    </h2>
                  </div>
                  {selectedOrder.products.map((item) => (
                    <div key={item.product_id} className="mb-4">
                      <div className="flex items-center justify-between border border-gray-200 bg-white rounded-lg shadow-sm">
                        {/* Hình ảnh và thông tin sản phẩm */}
                        <div className="flex items-center space-x-3 p-3">
                          <img
                            src={`http://127.0.0.1:8000/storage/${item.product_image}`}
                            alt={item.product_name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div className="text-left max-w-[200px]">
                            <h4 className="text-sm font-semibold text-gray-900">
                              {item.product_name}
                            </h4>
                            <p className="text-sm text-gray-500">{`${item.color_name} - ${item.size_name}`}</p>
                          </div>
                        </div>

                        {/* Số lượng */}
                        <p className="text-sm text-gray-500 text-center w-16">
                          SL: {item.quantity}
                        </p>

                        {/* Giá */}
                        <p className="text-sm text-gray-500 text-right mr-5 w-20">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* Tổng tiền */}
                  <div className="border-t pt-4 ">
                    <div className="flex justify-between text-sm font-medium text-gray-900">
                      <p>Total</p>
                      <p className="text-green-600">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(selectedOrder.total_money)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  Không có sản phẩm ở bill này
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders1;
