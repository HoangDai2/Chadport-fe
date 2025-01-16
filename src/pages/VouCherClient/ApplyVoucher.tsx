import React, { useEffect, useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import { PiCoins } from "react-icons/pi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Voucher } from "../../Types/TVoucher";
import apisphp from "../../Service/api";
import { toast } from "react-toastify";
import { IoMdCopy } from "react-icons/io";
const DiscountCard = () => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // call data voucher
    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const dataVoucher = await apisphp.get<Voucher[]>('/client/vouchers');

                // Lấy danh sách voucher đã claim từ localStorage
                const claimedVouchers = JSON.parse(localStorage.getItem('claimedVouchers') || '[]');

                // Cập nhật trạng thái `is_disabled` cho các voucher đã claim
                const updatedVouchers = dataVoucher.data.map((voucher) => ({
                    ...voucher,
                    is_disabled: claimedVouchers.includes(voucher.id),
                }));

                setVouchers(updatedVouchers);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu voucher:", error);
            }
        };
        fetchVoucher();
    }, []);


    const handleSubmit = async (voucherId: number) => {
        try {
            const token = localStorage.getItem("jwt_token");
            if (!token) {
                console.error("Token không hợp lệ");
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            // Gửi yêu cầu claim voucher
            const response = await apisphp.post(`/get-vouchers-user-client`, { voucher_id: voucherId }, { headers });
            toast.success("Bạn đã lấy Voucher thành công");

            // Lưu voucher_id vào localStorage
            const claimedVouchers = JSON.parse(localStorage.getItem('claimedVouchers') || '[]');
            claimedVouchers.push(voucherId);
            localStorage.setItem('claimedVouchers', JSON.stringify(claimedVouchers));

            // Cập nhật trạng thái vouchers
            setVouchers((prevVouchers) =>
                prevVouchers.map((voucher) =>
                    voucher.id === voucherId ? { ...voucher, is_disabled: true } : voucher
                )
            );

            setMessage(response.data.message);
            setError(null);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi khi claim voucher.";
            toast.error(errorMessage);
            setError(errorMessage);
            setMessage(null);
        }
    };


    // hàm này tính ngày còn lại của voucher
    const calculateDaysLeft = (expiresAt: any) => {
        const currentDate = new Date();
        const expiryDate = new Date(expiresAt);
        const timeDifference = expiryDate - currentDate;
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysLeft > 0 ? daysLeft : 0;
    };

    return (
        <div className="h-[75vh] bg-gray-50 p-6 overflow-y-scroll rounded-lg shadow-inner">
            <div className="grid grid-cols-1 gap-6">
                {/* Card 1 */}
                {vouchers.length === 0 ? (
                    <p>Không có voucher nào còn hiệu lực.</p>
                ) : (
                    <div>
                        {vouchers.map((item) => (
                            <div
                                key={item.id}
                                className={`mb-[30px] bg-white shadow-md transition-shadow rounded-lg flex w-full border border-gray-200 'hover:shadow-lg'
                                    }`}
                            >
                                <div
                                    className="bg-gradient-to-br from-white via-white to-black text-white py-6 px-4 flex flex-col justify-center rounded-lg shadow-md relative"
                                    style={{
                                        background: 'linear-gradient(to bottom right, #a2a2a2 20%, black 70%)',
                                        width: '200px',
                                    }}
                                >
                                    <button
                                        className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded shadow hover:bg-gray-700"
                                        onClick={() => navigator.clipboard.writeText(item.code)}
                                    >
                                        <IoMdCopy />
                                    </button>
                                    <div className="text-lg font-bold">{item.code}</div>
                                </div>


                                <div className="bg-white rounded-lg p-4 w-full mx-auto flex flex-col space-y-4">
                                    <p className="text-left text-gray-700 text-base leading-relaxed font-medium">
                                        Tận hưởng mức giảm giá{' '}
                                        {item.discount_type === 'percentage'
                                            ? `${Math.round(item.discount_value)}%` // Hiển thị phần trăm
                                            : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.discount_value) // Hiển thị tiền tệ
                                        }{' '}
                                        cho đơn hàng của bạn. Đừng bỏ lỡ ưu đãi này!
                                    </p>

                                    {/* Timer Section */}
                                    <div className="flex items-center text-red-500 text-sm font-medium space-x-2">
                                        <IoTimeOutline />
                                        <span>
                                            {calculateDaysLeft(item.expires_at) > 0
                                                ? `${calculateDaysLeft(item.expires_at)} DAYS LEFT`
                                                : 'EXPIRED'}
                                        </span>
                                    </div>

                                    {/* Divider */}
                                    <hr className="border-t-2 border-dashed border-gray-500 my-4" />

                                    {/* Price Section */}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center space-x-2">
                                            <PiCoins className="text-yellow-600 text-2xl" />
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {item.discount_type === 'percentage'
                                                    ? `${Math.round(item.discount_value)}%`
                                                    : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.discount_value)
                                                }
                                                <span className="text-sm text-gray-500 ml-1 italic">Theo đơn hàng của bạn</span>
                                            </h3>
                                        </div>
                                        <div>
                                            {!item.is_disabled ? (
                                                <div>

                                                </div>
                                            ) : (
                                                <span className="text-sm font-medium text-gray-500">Voucher đã được nhận</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscountCard;
