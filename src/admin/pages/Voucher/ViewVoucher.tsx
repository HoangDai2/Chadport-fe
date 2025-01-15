import React, { useEffect, useState } from 'react';
import { AiFillProduct } from "react-icons/ai";
import { FaSave, FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import apisphp from '../../../Service/api';
import { Voucher } from '../../../Types/TVoucher';
type Props = {}

const ViewVoucher = (props: Props) => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]); // Dữ liệu sau khi lọc
    const [statusFilter, setStatusFilter] = useState<string>(""); // Trạng thái (all, online, offline)

    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const dataVoucher = await apisphp.get<Voucher[]>('/vouchers');
                setVouchers(dataVoucher.data);
                setFilteredVouchers(dataVoucher.data); // Gán dữ liệu ban đầu
                console.log(dataVoucher.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu voucher:", error);
            }
        }
        fetchVoucher();
    }, []);

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

    return (
        <>
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
                <div className="flex items-center space-x-4">
                    <label className="text-sm text-gray-600">Lọc theo trạng thái:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => handleStatusFilterChange(e.target.value)}
                        className="p-2 border text-sm font-medium text-gray-600 text-center rounded-md w-20 h-9"
                    >
                        <option value="">Tất cả</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                    </select>
                </div>

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


                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}

export default ViewVoucher;
