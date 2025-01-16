import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";

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

type Voucher = {
  id: number;
  code: string;
  discount_value: string;

  discount_type: string;
  is_default: number;

  usage_limit: number;
  expires_at: string;
};

const ChatCard = () => {
  const [orderStats, setOrderStats] = useState<UserOrderStats[]>([]);
  const [hoveredUser, setHoveredUser] = useState<UserOrderStats | null>(null);
  const [isModalHovered, setIsModalHovered] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);

  // Fetch all orders from API
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
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch vouchers from API
  const fetchVouchers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/vouchers");
      const currentDate = new Date();

      const validVouchers = response.data.filter((voucher: Voucher) => {
        // Kiểm tra nếu voucher hết hạn
        const isExpired =
          voucher.expires_at && new Date(voucher.expires_at) < currentDate;
        // Kiểm tra nếu voucher là mặc định (is_default = 1)
        const isDefault = Number(voucher.is_default) === 1;

        // console.log(
        //   `Voucher ID: ${voucher.id}, is_default: ${voucher.is_default}, expires_at: ${voucher.expires_at}, IsExpired: ${isExpired}, IsDefault: ${isDefault}`
        // );

        // Loại bỏ voucher nếu là mặc định hoặc đã hết hạn
        return !(isDefault || isExpired);
      });

      console.log("Valid Vouchers After Filtering:", validVouchers);
      setVouchers(validVouchers);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchVouchers();
  }, []);

  // console.log("Valid Vouchers:", vouchers);
  const handleConfirmClick = async () => {
    if (!selectedVoucherId) {
      alert("Vui lòng chọn một voucher trước khi xác nhận!");
      return;
    }

    if (!hoveredUser?.userId) {
      alert("Không xác định được User ID!");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/add-voucher-to-user", {
        user_id: hoveredUser.userId,
        voucher_id: selectedVoucherId,
      });
      toast.success("Voucher đã được áp dụng thành công!");
      setShowGiftModal(false); // Đóng modal sau khi thành công
      setHoveredUser(null);
    } catch (error) {
      console.error("Lỗi khi áp dụng voucher:", error);
      toast.warn(" User này đã được nhận Voucher trước đó");
    }
  };

  const handleMouseLeave = () => {
    if (!isModalHovered) {
      setHoveredUser(null);
    }
  };
  const handleGiftClick = () => {
    setHoveredUser(null);
    setShowGiftModal(false);
  };

  return (
    <div className="border bg-white rounded-lg xl:col-span-4 relative">
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
      <h4 className="mt-[20px] px-7.5 text-xl font-semibold text-black dark:text-white">
        Khách hàng tiềm năng
      </h4>
      <div
        onMouseLeave={handleMouseLeave}
        className="relative sm:rounded-lg mb-3"
      >
        <table className="w-full text-sm text-left text-black bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="text-xs text-black uppercase bg-gray-100">
            <tr>
              <th scope="col" className="p-4 text-center">
                Top
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Total Orders
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orderStats.map((item, index) => (
              <tr
                key={item.userId}
                className="hover:bg-gray-50 cursor-pointer"
                onMouseEnter={() => setHoveredUser(item)}
              >
                <td className="p-4 text-center font-medium">{index + 1}</td>
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {item.firt_name} {item.last_name}
                </td>
                <td className="px-6 py-4 text-center">{item.totalOrders}</td>
                <td className="px-6 py-4 text-right">
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
      {hoveredUser && !showGiftModal && (
        <div
          className="h-[500px] absolute z-10 bg-white border shadow-lg  rounded-lg max-w-md"
          style={{
            top: "0%", // Điều chỉnh khoảng cách từ trên xuống
            left: "-56%", // Đặt ở giữa theo chiều ngang
            transform: "translate(-50%, -20%)", // Cân chỉnh chính giữa màn hình
            minWidth: "400px", // Chiều rộng tối thiểu
            // overflow: "auto", // Thêm scroll nếu nội dung quá dài
          }}
          onMouseEnter={() => setIsModalHovered(true)}
          onMouseLeave={() => setIsModalHovered(false)}
        >
          {/* Header */}
          <div className="h-[23%] flex items-center justify-between bg-gray-100 p-4 rounded-t-lg border-b">
            <div className="absolute top-0 right-0 p-4">
              <button
                onClick={() => setShowGiftModal(true)}
                className="flex items-center gap-2 bg-yellow-200 p-4 rounded-full shadow hover:bg-yellow-300"
              >
                🎁
                {/* <span className="text-sm font-medium">Giỏ quà</span> */}
              </button>
            </div>
            {/* Left Section: Profile Photo and Info */}
            <div className=" absolute items-center gap-4 top-[60px]">
              <img
                src={`http://127.0.0.1:8000${hoveredUser.image_user}`}
                alt={hoveredUser.firt_name}
                className="w-20 h-20 object-cover rounded-full border-2 border-blue-500"
              />
              <div>
                <h3 className="text-left font-semibold text-gray-800">
                  {hoveredUser.firt_name} {hoveredUser.last_name}
                </h3>
                <p className="text-sm text-gray-500">
                  SĐT: {hoveredUser.phone_number}
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <form className="h-[70%] p-6 text-left space-y-6 mt-[60px]">
            {/* Name Section */}
            <div
              className="grid grid-cols-2 gap-4"
              style={{
                gridTemplateColumns: `repeat(var(--x-columns, 1), 1fr)`,
              }}
            >
              <div className="w-[100%] flex">
                <div className="w-[20%] mt-[15px] ">
                  <label className="block text-sm font-medium text-gray-700">
                    Name:
                  </label>
                </div>
                <div className="w-[80%] flex gap-[10px]">
                  <input
                    type="text"
                    className="w-[40%] mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={hoveredUser.firt_name}
                    readOnly
                  />
                  <input
                    type="text"
                    className="w-[40%] mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={hoveredUser.last_name}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Email Section */}
            <div className="w-[100%] flex">
              <div className="w-[20%] mt-[15px] ">
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
              </div>
              <div className="w-[80%] flex gap-[10px]">
                <div className="flex items-center border rounded-md mt-1 w-[100%]">
                  <input
                    type="text"
                    className="flex-1 border-none rounded-r-md focus:ring-0 focus:outline-none"
                    value={hoveredUser.user_email}
                    readOnly
                  />
                  <span className="px-2">
                    <MdOutlineMailOutline />
                  </span>
                </div>
              </div>
            </div>

            {/* Username Section */}
            <div className="w-[100%] flex">
              <div className="w-[20%] mt-[15px] ">
                <label className="block text-sm font-medium text-gray-700">
                  Address:
                </label>
              </div>
              <div className="w-[80%] flex gap-[10px]">
                <div className="flex items-center border rounded-md mt-1 w-[100%]">
                  <input
                    type="text"
                    className="flex-1 border-none rounded-r-md focus:ring-0 focus:outline-none"
                    value={hoveredUser.address}
                    readOnly
                  />
                  <span className="px-2">
                    <CiLocationOn />
                  </span>
                </div>
              </div>
            </div>

            {/* sinh nhật và giới tính */}
            <div
              className="grid grid-cols-2 gap-4"
              style={{
                gridTemplateColumns: `repeat(var(--x-columns, 1), 1fr)`,
              }}
            >
              <div className="w-[100%] flex gap-[20px]">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Birthday:
                  </label>
                  <input
                    type="text"
                    className="w-[50%] mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={hoveredUser.birthday}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender:
                  </label>
                  <input
                    type="text"
                    className="w-[550%] mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={hoveredUser.gender}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {showGiftModal &&
        (console.log(hoveredUser?.userId),
          (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-120">
                <h3 className="text-lg font-semibold mb-4">
                  Chọn Voucher cho User ID: {hoveredUser?.userId}
                </h3>
                <select
                  className="w-full border rounded-lg p-2"
                  value={selectedVoucherId || ""}
                  onChange={(e) => setSelectedVoucherId(e.target.value)}
                >
                  <option value="" disabled>
                    -- Chọn Voucher --
                  </option>
                  {vouchers.map((voucher) => (
                    <option key={voucher.id} value={voucher.id}>
                      {voucher.id} - {voucher.code} -{" "}
                      {voucher.discount_type === "fixed"
                        ? `${voucher.discount_value} VND`
                        : `${voucher.discount_value}%`}{" "}
                      - HSD:{" "}
                      {new Date(voucher.expires_at).toLocaleDateString("vi-VN")}
                    </option>
                  ))}
                </select>
                <div className="flex justify-center gap-10 mt-4">
                  <button
                    onClick={() => handleGiftClick()}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={() => handleConfirmClick()}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          ))}

      {/* Voucher Modal */}
      {/* {showGiftModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Chọn Voucher cho User ID: {hoveredUser?.userId}
            </h3>
            <select className="w-full border rounded-lg p-2">
              {vouchers.map((voucher) => (
                <option key={voucher.id} value={voucher.id}>
                  {voucher.code} -{" "}
                  {voucher.discount_type === "fixed"
                    ? `${voucher.discount_value} VND`
                    : `${voucher.discount_value}%`}{" "}
                  - HSD:{" "}
                  {new Date(voucher.expires_at).toLocaleDateString("vi-VN")}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleGiftClick()}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ChatCard;
