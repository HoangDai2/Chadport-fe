import React, { useEffect, useState } from 'react';
import { AiFillProduct } from "react-icons/ai";
import { FaSave, FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import apisphp from '../../../Service/api';
import { Voucher } from '../../../Types/TVoucher';
import { toast, ToastContainer } from 'react-toastify';
type Props = {}

const ViewVoucher = (props: Props) => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]); // Dữ liệu sau khi lọc
    const [statusFilter, setStatusFilter] = useState<string>(""); // Trạng thái (all, online, offline)
    const [defaultFilter, setDefaultFilter] = useState<string>(""); // Giá trị lọc is_default
    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const dataVoucher = await apisphp.get<Voucher[]>('/vouchers');
                setVouchers(dataVoucher.data);
                setFilteredVouchers(dataVoucher.data); // Gán dữ liệu ban đầu

                // Kiểm tra và cập nhật trạng thái hết hạn
                checkAndUpdateExpiredVouchers();
                console.log(dataVoucher.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu voucher:", error);
            }
        }
        fetchVoucher();
    }, []);

    // cập nhật nút trạng thái ẩn hiện 
    const handleToggleDefault = async (voucherId: number) => {
        // Cập nhật trạng thái của voucher được chọn
        const updatedVouchers = vouchers.map((voucher) =>
            voucher.id === voucherId
                ? { ...voucher, is_default: voucher.is_default === 3 ? 0 : 3 } // Toggle trạng thái
                : voucher
        );

        // Lấy trạng thái mới của voucher được chọn
        const updatedVoucher = updatedVouchers.find((voucher) => voucher.id === voucherId);

        // Cập nhật danh sách trong state để phản ánh ngay trên giao diện
        setVouchers(updatedVouchers);
        setFilteredVouchers(updatedVouchers);

        try {
            // Gửi yêu cầu API để cập nhật trạng thái trên backend
            const response = await apisphp.put('/updateRoleClient3', {
                voucher_id: voucherId,
                is_default: updatedVoucher?.is_default, // Gửi trạng thái mới
            });
            // Hiển thị thông báo toast phù hợp
            if (updatedVoucher?.is_default === 3) {
                toast.success("Bạn đã bật Voucher thành công.");
            } else {
                toast.success("Bạn đã tắt Voucher thành công.");
            }
            console.log(response.data.message); // Log phản hồi từ API
        } catch (error) {
            console.error("Lỗi khi cập nhật voucher:", error);
            toast.error("Bạn đã bật Vuocher Thất bại.")
            // Nếu API thất bại, khôi phục trạng thái ban đầu
            const revertedVouchers = vouchers.map((voucher) =>
                voucher.id === voucherId
                    ? { ...voucher, is_default: voucher.is_default === 3 ? 0 : 3 } // Phục hồi trạng thái
                    : voucher
            );
            setVouchers(revertedVouchers);
            setFilteredVouchers(revertedVouchers);
        }
    };

    // hàm này để check nêu voucher hết hạn thì voucher chuyển trạng thái tắt không thể bật được
    const checkAndUpdateExpiredVouchers = async () => {
        const today = new Date();

        // Kiểm tra các voucher đã hết hạn
        const updatedVouchers = vouchers.map((voucher) => {
            if (new Date(voucher.expires_at) < today && voucher.is_default !== 0) {
                return { ...voucher, is_default: 0 }; // Đặt về 0 nếu hết hạn
            }
            return voucher;
        });

        // Chỉ cập nhật state nếu có sự khác biệt
        if (JSON.stringify(vouchers) !== JSON.stringify(updatedVouchers)) {
            setVouchers(updatedVouchers);
            setFilteredVouchers(updatedVouchers);

            // Gửi yêu cầu cập nhật trạng thái trên backend nếu cần
            const expiredVouchers = updatedVouchers.filter(
                (voucher) => new Date(voucher.expires_at) < today && voucher.is_default !== 0
            );

            for (const expiredVoucher of expiredVouchers) {
                try {
                    await apisphp.put('/updateRoleClient3', {
                        voucher_id: expiredVoucher.id,
                        is_default: 0, // Đặt trạng thái về 0
                    });
                    console.log(`Voucher ${expiredVoucher.id} đã được cập nhật trạng thái hết hạn.`);
                } catch (error) {
                    console.error(`Lỗi khi cập nhật trạng thái của voucher ${expiredVoucher.id}:`, error);
                }
            }
        }
    };

    // Hàm lọc theo trạng thái ngay khi thay đổi trạng thái
    const handleStatusFilterChange = (status: string) => {
        setStatusFilter(status);
        if (!status) {
            setFilteredVouchers(vouchers);
            return;
        }

        const today = new Date();

        const filtered = vouchers.filter((voucher) => {
            const expiresAtDate = new Date(voucher.expires_at);
            const isOnline = voucher.usage_limit > voucher.used_count && expiresAtDate > today;
            return status === "online" ? isOnline : !isOnline;
        });

        setFilteredVouchers(filtered);
    };

    // lọc theo ngày hiện tại
    const handleFilterToday = () => {
        const today = new Date().toISOString().split('T')[0];
        const filtered = vouchers.filter((voucher) => {
            const createdAtDate = new Date(voucher.created_at).toISOString().split('T')[0];
            return createdAtDate === today;
        });
        setFilteredVouchers(filtered);
    };

    // lọc theo 1 tuần 
    const handleLast7DaysFilter = () => {
        const today = new Date();
        const last7Days = new Date();
        last7Days.setDate(today.getDate() - 7);

        const filtered = vouchers.filter((voucher) => {
            const createdAtDate = new Date(voucher.created_at);
            return createdAtDate >= last7Days && createdAtDate <= today;
        });

        setFilteredVouchers(filtered);
    };

    // Hàm lọc theo is_default
    const handleFilterDefault = (isDefault: string) => {
        setDefaultFilter(isDefault);
        if (isDefault === "") {
            setFilteredVouchers(vouchers); // Hiển thị tất cả nếu không chọn lọc
        } else {
            const filtered = vouchers.filter(voucher => voucher.is_default.toString() === isDefault);
            setFilteredVouchers(filtered);
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
            <div
                className="grid mb-[30px]  gap-4 p-4"
                style={{
                    gridTemplateColumns: `repeat(var(--x-columns, 2), 1fr)`
                }}
            >
                <div className=" flex items-center text-black font-bold text-[25px]">
                    <AiFillProduct className="mr-2  " />
                    Danh Sách Voucher
                </div>

                <div className="col-span-2 col-start-4 flex space-x-4">
                    <Link to={'/admin/add/voucher'}>
                        <button className="flex items-center bg-black text-white py-3 px-4 rounded-sm text-sm font-medium">
                            <FaCheck className="mr-2" />
                            Thêm Mã Giảm Giá
                        </button>
                    </Link>
                </div>
            </div>

            <div className="mb-4 flex justify-between items-center">

                <div className="flex justify-center items-center space-x-8">
                    {/* lọc theo trạng thái Online và Offline */}
                    <div className="flex items-center space-x-4">
                        <label className="text-sm text-gray-600">Lọc theo trạng thái:</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => handleStatusFilterChange(e.target.value)}
                            className="p-2 border text-sm font-medium text-gray-600 text-center rounded-md w-40 h-9"
                        >
                            <option value="">Tất cả</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                    </div>

                    {/* lọc theo is_default */}
                    <div className="flex items-center space-x-4">
                        <label className="text-sm text-gray-600">Lọc theo Loại Voucher:</label>
                        <select
                            value={defaultFilter}
                            onChange={(e) => handleFilterDefault(e.target.value)}
                            className="p-2 text-left border text-sm font-medium text-gray-600 rounded-md w-40"
                        >
                            <option value="">Tất cả</option>
                            <option value="1">Voucher mặc định của user</option>
                            <option value="2">VouCher ưu đãi cho user</option>
                            <option value="3">Voucher Sự Kiện</option>
                        </select>
                    </div>
                </div>

                {/* lọc theo ngày và tuần */}
                <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                        <button
                            onClick={handleFilterToday}
                            className="w-24 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 flex justify-center"
                        >
                            Hôm Nay
                        </button>
                        <button
                            onClick={handleLast7DaysFilter}
                            className="w-36 py-1.5 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 flex justify-center"
                        >
                            7 ngày gần đây
                        </button>
                    </div>
                </div>


            </div>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Code</th>
                        <th className="border border-gray-300 px-4 py-2">Loại Giảm Giá</th>
                        <th className="border border-gray-300 px-4 py-2">Giá Trị</th>
                        <th className="border border-gray-300 px-4 py-2">Số Lượng Phát Hành</th>
                        <th className="border border-gray-300 px-4 py-2">Số Lượng Đã Sử Dụng</th>
                        <th className="border border-gray-300 px-4 py-2">Ngày Hết Hạn</th>
                        <th className="border border-gray-300 px-4 py-2">Ngày Tạo Voucher</th>
                        <th className="border border-gray-300 px-4 py-2">Trạng Thái</th>
                        <th className="border border-gray-300 px-4 py-2">Acction</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVouchers.map((item) => (
                        <tr key={item.id}>
                            <td className="border border-gray-300 px-4 py-2 text-center">{item.id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{item.code}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                {item.discount_type === 'percentage' ? 'Giảm giá %' : 'Giảm giá cố định'}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                {item.discount_type === "fixed"
                                    ? new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                        maximumFractionDigits: 0, // Không hiển thị phần thập phân
                                    }).format(item.discount_value) // Hiển thị dạng tiền tệ
                                    : `${item.discount_value}%`} {/* Hiển thị dạng phần trăm */}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{item.usage_limit}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{item.used_count}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                {new Intl.DateTimeFormat("vi-VN", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                }).format(new Date(item.expires_at))}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                {new Intl.DateTimeFormat("vi-VN", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                }).format(new Date(item.created_at))}
                            </td>

                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <span
                                    className={`px-2 py-1 rounded ${new Date(item.expires_at) < new Date()
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-green-100 text-green-600'
                                        }`}
                                >
                                    {new Date(item.expires_at) < new Date() ? 'offline' : 'online'}
                                </span>
                            </td>

                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <div key={item.id} className="flex items-center space-x-4">
                                    <label
                                        htmlFor={`default-${item.id}`}
                                        className={`relative inline-block h-8 w-14 cursor-pointer rounded-full transition duration-300 ease-in-out ${item.is_default === 3 && new Date() <= new Date(item.expires_at)
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            id={`default-${item.id}`}
                                            className="peer sr-only"
                                            checked={item.is_default === 3 && new Date() <= new Date(item.expires_at)} // Chỉ bật nếu chưa hết hạn
                                            disabled={item.is_default === 1 || item.is_default === 2}
                                            onChange={() => {
                                                if (new Date() > new Date(item.expires_at)) {
                                                    toast.info("Voucher đã hết hạn, trạng thái đã được đặt về tắt.");
                                                } else {
                                                    handleToggleDefault(item.id);
                                                }
                                            }}
                                        />
                                        <span
                                            className={`absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all duration-300 ease-in-out ${item.is_default === 3 && new Date() <= new Date(item.expires_at)
                                                ? "translate-x-6"
                                                : "translate-x-0"
                                                }`}
                                        ></span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}

export default ViewVoucher;
