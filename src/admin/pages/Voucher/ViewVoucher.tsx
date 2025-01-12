import React from 'react'
import { AiFillProduct } from "react-icons/ai";
import { FaSave, FaCheck } from "react-icons/fa";
type Props = {}

const ViewVoucher = (props: Props) => {
    return (
        <>
            <div
                className="grid  gap-4 p-4"
                style={{
                    gridTemplateColumns: `repeat(var(--x-columns, 2), 1fr)`,
                }}
            >
                {/* Ô đầu tiên */}
                <div className=" flex items-center text-black font-bold text-[25px]">
                    <AiFillProduct className="mr-2  " />
                    Add New Product
                </div>

                {/* Ô thứ hai - đặt tại vị trí riêng theo col-start và col-span */}
                <div className="col-span-2 col-start-4 flex space-x-4">
                    <button className="flex items-center border border-gray-300 text-gray-700 py-2 px-4 rounded-full text-sm font-medium">
                        <FaSave className="mr-2" />
                        Save Draft
                    </button>

                    <button className="flex items-center bg-black text-white py-2 px-4 rounded-full text-sm font-medium">
                        <FaCheck className="mr-2" />
                        Add Product
                    </button>
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
                    <tr>
                        <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">SALE2025</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">Giảm giá %</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">10%</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">100</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">25</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">31-12-2025 23:59</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">01-01-2025 10:00</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded">Đang hoạt động</span>
                        </td>
                    </tr>
                    {/* Thêm các dòng dữ liệu khác */}
                </tbody>
            </table>

        </>
    )
}

export default ViewVoucher