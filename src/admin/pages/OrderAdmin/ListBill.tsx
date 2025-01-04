import React, { useEffect, useState } from "react";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

interface Order {
  id: number;
  voucher_id: string | null;
  user_id: number;
  oder_number: string;
  payment_method: string;
  total_money: number;
  shipping_address: string;
  billing_address: string;
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

  useEffect(() => {
    const filtered = statusFilter
      ? orders.filter((order) => order.status === statusFilter)
      : orders;
    setFilteredOrders(filtered);
  }, [statusFilter, orders]);

  const indexTruoc = currentPage * ordersPerPage;
  const indexSau = indexTruoc - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexSau, indexTruoc);

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
      setError("Failed to update order status. Please try again.");
    }
  };

  const handleViewDetails = async (orderId: number) => {
    try {
      setLoading(true); // Show loading spinner
      const response = await axios.get<Order>(
        `http://127.0.0.1:8000/api/all-ordersAdmin/${orderId}`
      );
      setSelectedOrder(response.data);
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
            className="p-2 border text-sm font-medium text-gray-600 text-center rounded-md w-32 h-11"
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
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider w-24">Total Money</th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Shipping Address</th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Billing Address</th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-2 py-3 text-sm text-gray-800">{order.id}</td>
                  <td className="text-sm font-medium text-gray-600 whitespace-nowrap max-w-48 truncate">{order.oder_number}</td>
                  <td className="px-2 py-3 text-sm text-gray-800">{order.user_id}</td>
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
                  <td className="px-2 py-3 text-sm font-medium text-gray-600">{order.shipping_address}</td>
                  <td className="px-2 py-3 text-sm font-medium text-gray-600">{order.billing_address}</td>
                  <td className="px-2 py-3 text-sm font-medium text-gray-600">
                    <select
                      className="p-2 border rounded-md bg-white text-sm"
                      value={order.status}
                      onChange={(e) => handleStatusChangeSubmit(order.id, e.target.value)}
                      disabled={order.status === "bị hủy"}
                    >
                      {statusOptions.map((status) => (
                        <option key={status.key} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-600">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-600">
                    {new Date(order.updated_at).toLocaleString()}
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
                      {selectedOrder.data.products &&
                      selectedOrder.data.products.length > 0 ? (
                        selectedOrder.data.products.map((item) => (
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
                                SL: {item.quantity} - Size {item.size_name} -
                                màu:
                                <span className="mr-1">
                                  {item.color_name}
                                </span>{" "}
                              </p>
                              <p className="text-sm text-gray-500">
                                Giá:{" "}
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.price)}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Không có sản phẩm ở bill này</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-1/2 text-left">
                  <p className="text-lg font-semibold text-gray-800">
                    Thông tin đơn hàng
                  </p>
                  <div className="space-y-2 mt-2">
                    <p className="text-sm text-gray-500">
                      Địa chỉ giao hàng: {selectedOrder.data.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      User_id: {selectedOrder.data.user_id}
                    </p>
                    <p className="text-sm text-red-500">
                      Tổng tiền:
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(selectedOrder.data.total_money)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Trạng thái: {selectedOrder.data.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      Địa chỉ thanh toán: {selectedOrder.data.shipping_address}
                    </p>

                    <p className="text-sm text-gray-400">
                      Ngày tạo:{" "}
                      {new Date(
                        selectedOrder.data.created_at
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-lg font-semibold text-gray-800">
                  Tổng thanh toán:{" "}
                  <span className="text-green-500 font-semibold">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(selectedOrder.data.total_money)}
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
    </div>
  );
};

export default Orders1;
