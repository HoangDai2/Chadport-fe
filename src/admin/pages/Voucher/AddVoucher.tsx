import React from 'react'

type Props = {}

const AddVoucher = (props: Props) => {
    return (
        <>
            <div className="p-6 bg-white h-[570px] rounded-lg shadow-lg">
                <div className="px-6 py-5  border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Thêm Mã Giảm Giá
                    </h2>
                </div>
                <form className="text-left grid grid-rows-7 gap-4"
                    style={{
                        gridTemplateColumns: `repeat(var(--x-columns, 4), 1fr)`,
                    }}>
                    {/* Mã Giảm Giá */}
                    <div className="col-span-4">
                        <div>
                            <label htmlFor="UserEmail" className="block text-sm font-medium text-gray-900 mb-2"> Mã Giảm Giá: </label>
                            <input
                                type="email"
                                id="UserEmail"
                                className="focus:outline-none focus:ring-2 focus:ring-2 focus:ring-black focus:border-black py-2 px-4 mt-1 w-full rounded-md border-gray-200  sm:text-sm"
                                placeholder='VD:SALE-2025'
                            />
                        </div>
                    </div>

                    {/* Kiểu Giảm Giá và Giá Trị Giảm Giá */}
                    <div className="col-span-4 row-start-2 grid grid-cols-2 gap-4"
                        style={{
                            gridTemplateColumns: `repeat(var(--x-columns, 2), 1fr)`,
                        }}>
                        {/* Kiểu Giảm Giá */}
                        <div>
                            <label
                                htmlFor="HeadlineAct"
                                className="block text-sm font-medium text-gray-900 mb-2"
                            >
                                Kiểu Giảm Giá:
                            </label>
                            <div className="relative">
                                <select
                                    name="HeadlineAct"
                                    id="HeadlineAct"
                                    className="block w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-700 sm:text-sm focus:outline-none focus:ring-2 focus:ring-2 focus:ring-black focus:border-black"
                                >
                                    <option value="">Chọn Kiểu Giảm Giá</option>
                                    <option value="JM">Giảm Giá Phần Trăm</option>
                                    <option value="SRV">Giảm Giá Cố Định</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Giá Trị Giảm Giá */}
                        <div>
                            <label
                                htmlFor="DiscountValue"
                                className="block text-sm font-medium text-gray-900 mb-2"
                            >
                                Giá Trị Giảm Giá:
                            </label>
                            <input
                                type="text"
                                id="DiscountValue"
                                className="block w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-700 sm:text-sm focus:outline-none focus:ring-2 focus:ring-2 focus:ring-black focus:border-black"
                                placeholder="VD: 10% - 50.0000"
                            />
                        </div>
                    </div>

                    {/* Số Lượng Mã */}
                    <div className="col-span-4 row-start-3">
                        <div>
                            <label htmlFor="UserEmail" className="block text-sm font-medium text-gray-900 mb-2"> Số Lượng Mã: </label>
                            <input
                                type="email"
                                id="UserEmail"
                                className="focus:outline-none focus:ring-2 focus:ring-2 focus:ring-black focus:border-black py-2 px-4 mt-1 w-full rounded-md border-gray-200  sm:text-sm"
                                placeholder='VD:10'
                            />
                        </div>
                    </div>

                    {/* Số Lượng Mã Đã Dùng */}
                    <div className="col-span-4 row-span-2 row-start-4">
                        <div>
                            <label htmlFor="UserEmail" className="block text-sm font-medium text-gray-900 mb-2"> Số Lượng Mã Đã Dùng </label>
                            <input
                                type="email"
                                id="UserEmail"
                                className="focus:outline-none focus:ring-2 focus:ring-black focus:border-black py-2 px-4 mt-1 w-full rounded-md border-gray-200  sm:text-sm"
                                placeholder='VD:10'
                            />
                        </div>
                    </div>

                    {/* Start Date */}
                    <div className="row-start-6">
                        <label
                            htmlFor="start-date"
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            Start date
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                id="start-date"
                                className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:border-black border-gray-300 text-gray-700"
                            />
                        </div>
                    </div>

                    {/* End Date */}
                    <div className="row-start-6">
                        <label
                            htmlFor="end-date"
                            className="block text-sm font-medium text-gray-900 mb-2"
                        >
                            End date
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                id="end-date"
                                className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:border-black border-gray-300 text-gray-700"
                            />
                        </div>
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
                            className="bg-gray-500 text-white py-3 px-8 rounded-lg hover:bg-orange-600 transition-all text-base font-medium"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddVoucher