import { useEffect, useState } from "react";
import axios from "axios";

// Kiểu dữ liệu cho thống kê đơn hàng theo người dùng
type UserOrderStats = {
  userId: number;
  totalOrders: number;
  totalRevenue: number;
  last_name: string;
  firt_name: string;
  image_user: string;
  user_email: string;
  gender: string;
  address: string;
  phone_number: number;
  status_user: string;
  birthday: Date;
};

const ChatCard = () => {
  const [orderStats, setOrderStats] = useState<UserOrderStats[]>([]);
  const [hoveredUser, setHoveredUser] = useState<UserOrderStats | null>(null);

  // Fetch all orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/all-ordersAdmin"
      );
      const orders = response.data.data;

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
            last_name: order.last_name || "",
            firt_name: order.firt_name || "",
            image_user: order.image_user || "",
            phone_number: order.phone_number || "",
            user_email: order.user_email || "",
            gender: order.gender || "",
            address: order.address || "",
            status_user: order.status_user || "",
            birthday: order.birthday || "",
          };
        }
        userOrderStats[order.user_id].totalOrders += 1;
        userOrderStats[order.user_id].totalRevenue += order.total_money;
      });

      const sortedStats = Object.values(userOrderStats).sort(
        (a, b) => b.totalRevenue - a.totalRevenue
      );

      setOrderStats(sortedStats);
    } catch (error) {
      // console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="dark:border-gray-700 dark:bg-gray-800 xl:col-span-4 relative">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-gray-900 dark:text-white">
        Người dùng có doanh thu cao nhất
      </h4>
      <div className="relative shadow-md sm:rounded-lg mb-3">
        <table className="w-full text-sm px-4 text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                Top
              </th>
              <th scope="col" className="px-6 py-3">
                ID user
              </th>
              <th scope="col" className="px-6 py-3">
                Total orders
              </th>
              <th scope="col" className="px-6 py-3">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {orderStats.map((item, index) => (
              <tr
                key={item.userId}
                className="hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 cursor-pointer"
                onMouseEnter={() => setHoveredUser(item)} // Hiển thị thông tin khi hover
                onMouseLeave={() => setHoveredUser(null)} // Ẩn thông tin khi rời chuột
              >
                <td className="p-4">{index + 1}</td>
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
                    : "null"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tooltip hiển thị thông tin người dùng */}
      {hoveredUser && (
        <div
          className="absolute z-10 bg-white border shadow-lg p-4 rounded-md max-w-[300px]"
          style={{
            top: "20%", // Điều chỉnh khoảng cách từ trên xuống
            right: "120%", // Di chuyển box sang phải
            transform: "translateX(10px)", // Di chuyển nhẹ box sang phải một chút
            minWidth: "400px", // Chiều rộng tối thiểu của box
            overflow: "auto", // Thêm scroll nếu nội dung quá dài
          }}
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Chi tiết User {hoveredUser.userId}
          </h3>
          <div className=" items-start space-x-4 mt-4">
            <img
              src={`http://127.0.0.1:8000${hoveredUser.image_user}`}
              alt={hoveredUser.firt_name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="space-y-2">
              {" "}
              {/* Sử dụng space-y để tách các đoạn văn */}
              <p className="text-sm text-gray-700">
                Họ tên: {hoveredUser.firt_name} {hoveredUser.last_name}
              </p>
              <p className="text-sm text-gray-700">
                Tổng đơn hàng: {hoveredUser.totalOrders}
              </p>
              <p className="text-sm text-gray-700">
                Giới tính: {hoveredUser.gender}
              </p>
              <p className="text-sm text-gray-700">
                Địa chỉ: {hoveredUser.address}
              </p>
              <p className="text-sm text-gray-700">
                SĐT: {hoveredUser.phone_number}
              </p>
              <p className="text-sm text-gray-700">
                Trạng thái: {hoveredUser.status_user}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatCard;
