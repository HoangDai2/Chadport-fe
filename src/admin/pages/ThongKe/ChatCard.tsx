import { useEffect, useState } from "react";
import axios from "axios";
import DonHangCoLuotXemNhieuNhat from "./LuotXemNhieuNhat";

// Kiểu dữ liệu cho thống kê đơn hàng theo người dùng
type UserOrderStats = {
  userId: number;
  totalOrders: number;
  totalRevenue: number;
};

const ChatCard = () => {
  const [orderStats, setOrderStats] = useState<UserOrderStats[]>([]);

  // Fetch all orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/all-ordersAdmin"
      );
      const orders = response.data.data;

      // Lọc và nhóm đơn hàng theo user_id
      const completedOrders = orders.filter(
        (order: any) => order.status === "đã hoàn thành"
      );
      const userOrderStats: { [key: number]: UserOrderStats } = {};

      completedOrders.forEach((order: any) => {
        if (!userOrderStats[order.user_id]) {
          userOrderStats[order.user_id] = {
            userId: order.user_id,
            totalOrders: 0,
            totalRevenue: 0,
          };
        }
        userOrderStats[order.user_id].totalOrders += 1;
        userOrderStats[order.user_id].totalRevenue += order.total_money;
      });

      // Sắp xếp theo doanh thu giảm dần
      const sortedStats = Object.values(userOrderStats).sort(
        (a, b) => b.totalRevenue - a.totalRevenue
      );

      setOrderStats(sortedStats);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className=" dark:border-gray-700 dark:bg-gray-800 xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-gray-900 dark:text-white">
        Người dùng có doanh thu cao nhất
      </h4>
      <div className="relative  shadow-md sm:rounded-lg mb-3">
        <table className="w-full text-sm px-4 text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <span
                    id="checkbox-all-search"
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  >
                    Top
                  </span>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                ID user
              </th>
              <th scope="col" className="px-6 py-3">
                Total orders
              </th>
              <th scope="col" className="px-6 py-3">
                revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {orderStats.map((item, index) => (
              <tr
                key={item.userId}
                className="hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <span
                      id="checkbox-table-search-1"
                      className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    >
                      {index + 1}
                    </span>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.userId}
                </th>
                <td className="px-6 py-4">{item.totalOrders}</td>
                <td className="px-6 py-4">
                  {item.totalRevenue
                    ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(Math.ceil(item.totalRevenue))
                    : "null"}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChatCard;
