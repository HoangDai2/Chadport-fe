import React, { useEffect, useState } from 'react'
import { Voucher } from '../../Types/TVoucher';
import apisphp from '../../Service/api';
import { toast, ToastContainer } from 'react-toastify';
import { IoTimeOutline } from "react-icons/io5";
import { PiCoins } from "react-icons/pi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useLoading } from '../Loadings/LoadinfContext';
type Props = {}

const ListVoucherClient = (props: Props) => {

    const { startLoading, stopLoading } = useLoading();

    const [vouchers, setVouchers] = useState<Voucher[]>([]);

    const [vouchersuser, setVouchersuser] = useState<Voucher[]>([]);
    // call data voucher
    useEffect(() => {
        const fetchVoucheruser = async () => {
            startLoading()
            const token = localStorage.getItem("jwt_token");
            if (!token) {
                console.error("Token không hợp lệ");
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await apisphp.get("/client/vouchers", { headers })
                setVouchers(response.data)

                // Đọc danh sách voucher đã lấy từ localStorage
                const claimedVouchers = JSON.parse(localStorage.getItem('claimedVouchers') || '[]');

                // Cập nhật trạng thái is_disabled cho các voucher
                const updatedVouchers = response.data.map((voucher: any) => ({
                    ...voucher,
                    is_disabled: claimedVouchers.includes(voucher.id), // Nếu id có trong claimedVouchers thì set is_disabled = true
                }));

                setVouchers(updatedVouchers);
                console.log("data voucher user", response);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi khi claim voucher.";
            } finally {
                stopLoading()
            }
        };
        fetchVoucheruser();
    }, [])

    //  // call data voucher của user
    useEffect(() => {
        const VoucherUser = async () => {
            const token = localStorage.getItem('jwt_token');
            if (!token) {
                console.error('Token không hợp lệ');
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                const response = await apisphp.get('/get-vouchers-user-client', { headers });
                // Lấy danh sách voucher từ trường `vouchers`
                const fetchedVouchers = response.data.vouchers || [];
                setVouchersuser(fetchedVouchers);
                console.log('Danh sách voucher của user:', fetchedVouchers);
            } catch (error: any) {
                console.error('Lỗi khi lấy danh sách voucher của user:', error);
                toast.error('Không thể lấy danh sách voucher.');
            }
        };

        VoucherUser();
    }, []);

    const handleSubmit = async (voucherId: number) => {
        console.log(voucherId);

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
            const response = await apisphp.post(`/claimVoucher`, { voucher_id: voucherId }, { headers });

            console.log("id", response);

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

            toast.success("Bạn đã lấy Voucher thành công");
            // setMessage(response.data.message);
            // setError(null);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi khi claim voucher.";
            toast.error(errorMessage);
            // setError(errorMessage);
            // setMessage(null);
        }
    };

    const calculateDaysLeft = (expiresAt: string | Date): number => {
        if (!expiresAt) {
            return 0; // If the input is null or undefined, return 0 days left
        }

        const expiryDate = new Date(expiresAt);
        if (isNaN(expiryDate.getTime())) {
            return 0; // If the input is not a valid date, return 0 days left
        }

        const currentDate = new Date();
        const timeDifference = expiryDate.getTime() - currentDate.getTime();
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysLeft > 0 ? daysLeft : 0;
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
            <div id="title" className="page-title bg-gray-50 py-6 mt-[120px]">
                <div className="section-container max-w-7xl mx-auto px-6">
                    <div className="content-title-heading mb-4">
                        <h1 className="text-title-heading" style={{ fontSize: "50px" }}>
                            List_voucher
                        </h1>
                    </div>
                    <div className="breadcrumbs text-sm text-gray-600 font-inter">
                        <a href="/" className="hover:text-blue-500">
                            Home
                        </a>
                        <span className="delimiter mx-2">/</span>
                        <a href="/shop-grid-left" className="hover:text-blue-500">
                            ListVoucher
                        </a>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-5 grid-rows-4 gap-4" style={{ gridTemplateRows: "repeat(2, minmax(0, 1fr))" }}>
                {/* mã giảm giá mặc đinhj */}
                <div className="col-span-5 " style={{ gridRow: "span 2 / span 15" }}>
                    <div className=" p-6 ">
                        <h1 className="text-2xl text-left mb-4 font-bold text-gray-800">Danh Sách Voucher Ưu Đãi</h1>
                        <div className="grid grid-cols-1 gap-6">
                            {/* Card 1 */}
                            {Array.isArray(vouchersuser) &&
                                vouchersuser.filter(
                                    (voucher: any) =>
                                        voucher.voucher && // Kiểm tra voucher không null
                                        (voucher.voucher.is_default === 1 || voucher.voucher.is_default === 2) && // Kiểm tra is_default là 1 hoặc 2
                                        calculateDaysLeft(voucher.voucher.expires_at) > 0 // Kiểm tra ngày hết hạn
                                ).length === 0 ? (
                                <div className="text-center text-gray-500">
                                    <span>Hiện tại không có ưu đãi nào dành cho bạn.</span>
                                </div>
                            ) : (
                                <div>
                                    {vouchersuser
                                        .filter(
                                            (voucher: any) =>
                                                voucher.voucher && // Kiểm tra voucher không null
                                                (voucher.voucher.is_default === 1 || voucher.voucher.is_default === 2) && // Kiểm tra is_default là 1 hoặc 2
                                                calculateDaysLeft(voucher.voucher.expires_at) > 0 // Kiểm tra ngày hết hạn
                                        )
                                        .map((voucher: any) => (
                                            <div
                                                key={voucher.voucher.id}
                                                className="mb-[30px] bg-white shadow-md transition-shadow rounded-lg flex w-full border border-gray-200 hover:shadow-lg"
                                            >
                                                <div
                                                    className="bg-gradient-to-br from-white via-white to-black text-white py-6 px-4 flex flex-col justify-center rounded-lg shadow-md relative"
                                                    style={{
                                                        background: 'linear-gradient(to bottom right, #a2a2a2 20%, black 70%)',
                                                        width: '200px',
                                                    }}
                                                >
                                                    <button className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded shadow hover:bg-gray-700">
                                                        Copy
                                                    </button>
                                                    <div className="text-lg font-bold">{voucher.voucher.code}</div>
                                                </div>

                                                <div className="bg-white rounded-lg p-4 w-full mx-auto flex flex-col space-y-4">
                                                    <p className="text-left text-gray-700 text-base leading-relaxed font-medium">
                                                        Tận hưởng mức giảm giá{' '}
                                                        {voucher.voucher.discount_type === 'percentage'
                                                            ? `${Math.round(voucher.voucher.discount_value)}%`
                                                            : new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(voucher.voucher.discount_value)}{' '}
                                                        cho đơn hàng của bạn. Đừng bỏ lỡ ưu đãi này!
                                                    </p>

                                                    {/* Timer Section */}
                                                    <div className="flex items-center text-red-500 text-sm font-medium space-x-2">
                                                        <IoTimeOutline />
                                                        <span>
                                                            {calculateDaysLeft(voucher.voucher.expires_at) > 0
                                                                ? `${calculateDaysLeft(voucher.voucher.expires_at)} ngày còn lại`
                                                                : 'Hết hạn'}
                                                        </span>
                                                    </div>

                                                    {/* Divider */}
                                                    <hr className="border-t-2 border-dashed border-gray-500 my-4" />

                                                    {/* Price Section */}
                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex items-center space-x-2">
                                                            <PiCoins className="text-yellow-600 text-2xl" />
                                                            <h3 className="text-lg font-medium text-gray-900">
                                                                {voucher.voucher.discount_type === 'percentage'
                                                                    ? `${Math.round(voucher.voucher.discount_value)}%`
                                                                    : new Intl.NumberFormat('vi-VN', {
                                                                        style: 'currency',
                                                                        currency: 'VND',
                                                                    }).format(voucher.voucher.discount_value)}
                                                                <span className="text-sm text-gray-500 ml-1 italic">
                                                                    Theo đơn hàng của bạn
                                                                </span>
                                                            </h3>
                                                        </div>

                                                        <div>
                                                            <div>
                                                                <span className="text-sm font-medium text-gray-500">Voucher đã được nhận</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Toàn bộ mã giảm giá */}
                <div className="col-span-5 row-span-2 row-start-3">
                    <div className=" bg-gray-50 p-6 overflow-y-scroll rounded-lg ">
                        <div className="grid grid-cols-1 gap-6">
                            <h1 className="text-2xl text-left  font-bold text-gray-800">Danh Sách Voucher</h1>
                            {/* Card 2 */}
                            {vouchers.length === 0 ? (
                                <div className="text-center text-gray-500">
                                    <span>Hiện tại không có ưu đãi nào dành cho bạn.</span>
                                </div>
                            ) : (
                                <div>
                                    {vouchers
                                        .filter(
                                            (voucher) =>
                                                voucher.is_default === 3 && calculateDaysLeft(voucher.expires_at) > 0 // Chỉ hiển thị voucher bật và chưa hết hạn
                                        )
                                        .map((voucher) => (
                                            <div key={voucher.id}>
                                                <div
                                                    className={`mb-[30px] bg-white shadow-md transition-shadow rounded-lg flex w-full border border-gray-200 ${voucher.is_disabled ? "opacity-50 pointer-events-none" : "hover:shadow-lg"
                                                        }`}
                                                >
                                                    <div
                                                        className="bg-gradient-to-br from-white via-white to-black text-white py-6 px-4 flex flex-col justify-center rounded-lg shadow-md relative"
                                                        style={{
                                                            background: "linear-gradient(to bottom right, #a2a2a2 20%, black 70%)",
                                                            width: "200px",
                                                        }}
                                                    >
                                                        <button
                                                            className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded shadow hover:bg-gray-700"
                                                            disabled={voucher.is_disabled} // Disable button nếu is_disabled = true
                                                        >
                                                            Copy
                                                        </button>
                                                        <div className="text-lg font-bold">{voucher.code}</div>
                                                    </div>

                                                    <div className="bg-white rounded-lg p-4 w-full mx-auto flex flex-col space-y-4">
                                                        <p className="text-left text-gray-700 text-base leading-relaxed font-medium">
                                                            Tận hưởng mức giảm giá{" "}
                                                            {voucher.discount_type === "percentage"
                                                                ? `${Math.round(voucher.discount_value)}%`
                                                                : new Intl.NumberFormat("vi-VN", {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                }).format(voucher.discount_value)}{" "}
                                                            cho đơn hàng của bạn. Đừng bỏ lỡ ưu đãi này!
                                                        </p>

                                                        {/* Timer Section */}
                                                        <div className="flex items-center text-red-500 text-sm font-medium space-x-2">
                                                            <IoTimeOutline />
                                                            <span>{`${calculateDaysLeft(voucher.expires_at)} Ngày còn lại   `}</span>
                                                        </div>

                                                        {/* Divider */}
                                                        <hr className="border-t-2 border-dashed border-gray-500 my-4" />

                                                        {/* Price Section */}
                                                        <div className="flex items-center justify-between mt-4">
                                                            <div className="flex items-center space-x-2">
                                                                <PiCoins className="text-yellow-600 text-2xl" />
                                                                <h3 className="text-lg font-medium text-gray-900">
                                                                    {voucher.discount_type === "percentage"
                                                                        ? `${Math.round(voucher.discount_value)}%`
                                                                        : new Intl.NumberFormat("vi-VN", {
                                                                            style: "currency",
                                                                            currency: "VND",
                                                                        }).format(voucher.discount_value)}
                                                                    <span className="text-sm text-gray-500 ml-1 italic">Theo đơn hàng của bạn</span>
                                                                </h3>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    onClick={() => handleSubmit(voucher.id)}
                                                                    type="submit"
                                                                    disabled={voucher.is_disabled} // Disable nút nếu is_disabled = true
                                                                    className={`group relative inline-flex items-center overflow-hidden rounded px-8 py-3 text-white focus:outline-none focus:ring ${voucher.is_disabled ? "bg-gray-400" : "bg-black"
                                                                        }`}
                                                                >
                                                                    <AiOutlineArrowRight className="absolute -start-full transition-all group-hover:start-4" />
                                                                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                                        {voucher.is_disabled ? "Đã Lấy" : "Lấy Mã"}
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ListVoucherClient