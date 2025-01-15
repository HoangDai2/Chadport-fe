import React, { useState } from 'react';
import apisphp from '../../../Service/api';
import { useFormik } from 'formik';
import ValidationVoucher from './ValidationVoucher';
import { toast, ToastContainer } from 'react-toastify';

function AddVoucher() {
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            code: '',
            discount_type: 'fixed',
            discount_value: '',
            expires_at: '',
            usage_limit: '',
        },
        validationSchema: ValidationVoucher,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await apisphp.post('/vouchers', values);
                toast.success('Tạo mã giảm giá thành công!');

                setTimeout(() => {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        resetForm();
                    }, 2000);
                }, 1000);
            } catch (error: any) {
                if (error.response && error.response.data && error.response.data.errors) {
                    toast.error('Mã giảm giá này đã tồn tại!');
                } else {
                    toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
                }
            } finally {
                setLoading(false)
            }
        },
    });

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="flex flex-col items-center">
                {/* Vòng tròn quay */}
                <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>

                {/* Dòng thông báo */}
                <p className="mt-4 text-gray-600 text-lg font-medium">
                    Đang tải dữ liệu
                    <span className="animate-pulse">...</span>
                </p>
            </div>
        </div>; // Hiển thị trạng thái loading
    }

    return (
        <>
            <ToastContainer
                theme="light"
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
            />
            <div className="p-6 border h-[570px] rounded-lg ">
                <div className="px-6 py-5 border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Thêm Mã Giảm Giá</h2>
                </div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="text-left grid grid-rows-7 gap-4"
                    style={{
                        gridTemplateColumns: `repeat(var(--x-columns, 4), 1fr)`,
                    }}
                >
                    {/* Mã Giảm Giá */}
                    <div className="col-span-4">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-900 mb-2">
                            Mã Giảm Giá:
                        </label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="focus:outline-none focus:ring-2 focus:ring-black py-2 px-4 mt-1 w-full rounded-md border-gray-200 sm:text-sm"
                            placeholder="VD: SALE-2025"
                        />
                        {formik.touched.code && formik.errors.code && (
                            <p className="text-red-500 text-sm">{formik.errors.code}</p>
                        )}
                    </div>

                    {/* Kiểu Giảm Giá và Giá Trị Giảm Giá */}
                    <div
                        className="col-span-4 row-start-2 grid grid-cols-2 gap-4"
                        style={{
                            gridTemplateColumns: `repeat(var(--x-columns, 2), 1fr)`,
                        }}
                    >
                        {/* Kiểu Giảm Giá */}
                        <div>
                            <label htmlFor="discount_type" className="block text-sm font-medium text-gray-900 mb-2">
                                Kiểu Giảm Giá:
                            </label>
                            <select
                                id="discount_type"
                                name="discount_type"
                                value={formik.values.discount_type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="block w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-700 sm:text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                <option value="">Chọn Kiểu Giảm Giá</option>
                                <option value="fixed">Cố Định</option>
                                <option value="percentage">Phần Trăm</option>
                            </select>
                            {formik.touched.discount_type && formik.errors.discount_type && (
                                <p className="text-red-500 text-sm">{formik.errors.discount_type}</p>
                            )}
                        </div>

                        {/* Giá Trị Giảm Giá */}
                        {/* Giá Trị Giảm Giá */}
                        <div>
                            <label htmlFor="discount_value" className="block text-sm font-medium text-gray-900 mb-2">
                                Giá Trị Giảm Giá:
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="discount_value"
                                    name="discount_value"
                                    value={
                                        formik.values.discount_type === "fixed"
                                            ? new Intl.NumberFormat("vi-VN").format(Number(formik.values.discount_value || 0)) // Hiển thị định dạng tiền tệ
                                            : formik.values.discount_value // Nếu là phần trăm, hiển thị giá trị thô
                                    }
                                    onChange={(e) => {
                                        // Loại bỏ mọi ký tự không phải số và định dạng lại khi nhập
                                        const rawValue = e.target.value.replace(/[^0-9]/g, ""); // Chỉ giữ ký tự số
                                        formik.setFieldValue("discount_value", rawValue); // Lưu giá trị thô vào Formik
                                    }}
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-700 sm:text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder={
                                        formik.values.discount_type === "fixed" ? "Nhập số tiền (₫)" : "Nhập giá trị (%)"
                                    }
                                />
                                {/* Ký hiệu tiền tệ hoặc phần trăm */}
                                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                                    {formik.values.discount_type === "fixed" ? "₫" : "%"}
                                </span>
                            </div>
                            {formik.touched.discount_value && formik.errors.discount_value && (
                                <p className="text-red-500 text-sm">{formik.errors.discount_value}</p>
                            )}
                        </div>



                    </div>

                    {/* Số Lượng Mã */}
                    <div className="col-span-4 row-start-3">
                        <label htmlFor="usage_limit" className="block text-sm font-medium text-gray-900 mb-2">
                            Số Lượng Mã:
                        </label>
                        <input
                            type="number"
                            id="usage_limit"
                            name="usage_limit"
                            value={formik.values.usage_limit}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="focus:outline-none focus:ring-2 focus:ring-black py-2 px-4 mt-1 w-full rounded-md border-gray-200 sm:text-sm"
                            placeholder="VD: 10"
                        />
                        {formik.touched.usage_limit && formik.errors.usage_limit && (
                            <p className="text-red-500 text-sm">{formik.errors.usage_limit}</p>
                        )}
                    </div>

                    {/* Ngày Kết Thúc */}
                    <div className="row-start-6">
                        <label htmlFor="expires_at" className="block text-sm font-medium text-gray-900 mb-2">
                            Ngày Kết Thúc:
                        </label>
                        <input
                            type="date"
                            id="expires_at"
                            name="expires_at"
                            value={formik.values.expires_at}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-black border-gray-300 text-gray-700"
                        />
                        {formik.touched.expires_at && formik.errors.expires_at && (
                            <p className="text-red-500 text-sm">{formik.errors.expires_at}</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="col-span-4 row-start-7 flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="bg-black text-white py-3 px-8 rounded-lg hover:bg-orange-600 transition-all text-base font-medium"
                        >
                            Xác Nhận
                        </button>
                        <button
                            type="button"
                            onClick={formik.handleReset}
                            className="bg-gray-500 text-white py-3 px-8 rounded-lg hover:bg-orange-600 transition-all text-base font-medium"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddVoucher;
