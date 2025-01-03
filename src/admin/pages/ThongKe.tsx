import { useEffect, useState } from "react";
import ChartOne from "./ThongKe/ChartOne";
import ChartThree from "./ThongKe/ChartThree";
import TUser from "../../Types/TUsers";
import apisphp from "../../Service/api";
import axios from "axios";
import TableOne from "./ThongKe/TableOne";
import ChatCard from "./ThongKe/ChatCard";
import DonHangCoLuotXemNhieuNhat from "./ThongKe/LuotXemNhieuNhat";
const ThongKe = () => {
  const [orders, setOrders] = useState<any[]>([]); // Lưu danh sách đơn hàng
  const [revenue, setRevenue] = useState<number>(0); // Doanh thu
  const [donHang, setDonHang] = useState<number>(0); // Lợi nhuận

  const [users, setUsers] = useState<TUser[]>([]);
  const [roleCount, setroleCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  // Hàm lấy tất cả đơn hàng từ API
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/showAllOrder"
      );
      setOrders(response.data.data); // Cập nhật danh sách đơn hàng
      // console.log(response.data)
    } catch (error) {
      console.error("Có lỗi khi lấy dữ liệu đơn hàng:", error);
    }
  };
  // console.log(orders);
  // Hàm tính doanh thu khi trạng thái đơn hàng là "đã hoàn thành"
  const calculateRevenue = () => {
    const completedOrders = orders.filter(
      (order) => order.status === "đã thanh toán"
    );
    // console.log(completedOrders);
    const totalRevenue = completedOrders.reduce(
      (total: number, order: any) => total + order.total_money,
      0
    );
    const totalDonHang = completedOrders.length;
    setRevenue(totalRevenue);
    setDonHang(totalDonHang);
  };
  // console.log(revenue);
  // Hàm tính tổng đơn hàng
  //
  useEffect(() => {
    fetchOrders(); // Lấy dữ liệu đơn hàng khi component mount
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      calculateRevenue(); // Tính doanh thu khi đơn hàng đã được lấy
    }
  }, [orders]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const listUser = async () => {
    try {
      const res = await apisphp.get("/user/getall"); // Gọi API
      setUsers(res.data.users); // Cập nhật state users
      //   console.log(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy người dùng:", error); // Xử lý lỗi
    }
  };
  const countRole4 = () => {
    const count = users.filter((user) => user.role_id === 4).length; // Lọc và đếm người có role_id = 4
    setroleCount(count); // Cập nhật số lượng vào state
  };
  useEffect(() => {
    listUser(); // Lấy người dùng khi component được render lần đầu
  }, []); // Mảng phụ thuộc rỗng để chỉ chạy một lần
  useEffect(() => {
    countRole4(); // Đếm người có role_id = 4 khi `users` thay đổi
  }, [users]);
  //   end count user

  const listProducts = async () => {
    try {
      const res = await apisphp.get("/shop/products");
      setProducts(res.data.data); // Cập nhật danh sách sản phẩm
      //   console.log(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };

  // Tính toán số lượng sản phẩm
  const countProducts = () => {
    const count = products.length; // Đếm số lượng sản phẩm trong mảng
    setProductCount(count); // Cập nhật số lượng vào state
  };

  useEffect(() => {
    listProducts(); // Gọi API khi component được mount
  }, []);

  useEffect(() => {
    countProducts(); // Đếm số sản phẩm mỗi khi mảng `products` thay đổi
  }, [products]);

  return (
    <>
      <div className="row g-6 mb-6">
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card shadow border-0">
            <div className="card-body">
              {/* Hàng chứa doanh thu và icon */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="h6 font-semibold text-muted  text-gray-500 block mb-2">
                    Doanh thu
                  </span>
                  <span className="h3 font-bold mb-0">
                    {formatCurrency(revenue)}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-tertiary text-white rounded-full flex items-center justify-center">
                    <i className="bi bi-credit-card"></i>
                  </div>
                </div>
              </div>

              {/* Thông tin thêm */}
              <div className="mt-2 text-sm">
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                  <i className="bi bi-arrow-up me-1"></i>37%
                </span>
                <span className="text-gray-500 text-xs">Since last month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card shadow border-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                    Tổng đơn hàng
                  </span>
                  <span className="h3 font-bold mb-0">{donHang}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-warning text-white text-lg rounded-circle">
                    <i className="bi bi-minecart-loaded"></i>
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-0 text-sm">
                <span className="badge badge-pill bg-soft-success text-success me-2">
                  <i className="bi bi-arrow-up me-1"></i>10%
                </span>
                <span className="text-nowrap text-xs text-muted">
                  Since last month
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card shadow border-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                    Tổng Sản phẩm
                  </span>
                  <span className="h3 font-bold mb-0">{productCount}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                    <i className="bi bi-clock-history"></i>
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-0 text-sm">
                <span className="badge badge-pill bg-soft-danger text-danger me-2">
                  <i className="bi bi-arrow-down me-1"></i>-5%
                </span>
                <span className="text-nowrap text-xs text-muted">
                  Since last month
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card shadow border-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                    Tổng người dùng
                  </span>
                  <span className="h3 font-bold mb-0">{roleCount}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                    <i className="bi bi-people"></i>
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-0 text-sm">
                <span className="badge badge-pill bg-soft-success text-success me-2">
                  <i className="bi bi-arrow-up me-1"></i>80%
                </span>
                <span className="text-nowrap text-xs text-muted">
                  Since last month
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartThree />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
        <div className=" xl:col-span-12">
          <DonHangCoLuotXemNhieuNhat />
        </div>
      </div>
    </>
  );
};

export default ThongKe;
