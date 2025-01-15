import React from 'react'

type Props = {}

const ListVoucherClient = (props: Props) => {
    return (
        <>
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


            <div className="grid grid-cols-5 grid-rows-4 gap-4">
                {/* mã giảm giá mặc đinhj */}
                <div className="col-span-5 row-span-2">
                    <h1 className="text-2xl text-left mb-4 font-bold text-gray-800">Danh Sách Voucher Người Mới</h1>
                    <div className=" p-6 ">
                        <div className="grid grid-cols-1 gap-6">
                            {/* Card 1 */}
                            <div>
                                <div
                                    className={`mb-[30px] bg-white shadow-md transition-shadow rounded-lg flex w-full border border-gray-200 hover:shadow-lg`}
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
                                        >
                                            Copy
                                        </button>
                                        <div className="text-lg font-bold">Mã Voucher</div>
                                    </div>

                                    <div className="bg-white rounded-lg p-4 w-full mx-auto flex flex-col space-y-4">
                                        <p className="text-left text-gray-700 text-base leading-relaxed font-medium">
                                            Tận hưởng mức giảm giá 20% cho đơn hàng của bạn. Đừng bỏ lỡ ưu đãi này!
                                        </p>

                                        {/* Timer Section */}
                                        <div className="flex items-center text-red-500 text-sm font-medium space-x-2">
                                            <span className="text-sm">3 DAYS LEFT</span>
                                        </div>

                                        {/* Divider */}
                                        <hr className="border-t-2 border-dashed border-gray-500 my-4" />

                                        {/* Price Section */}
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    20% <span className="text-sm text-gray-500 ml-1 italic">Theo đơn hàng của bạn</span>
                                                </h3>
                                            </div>
                                            <div>
                                                <button type="submit">
                                                    <a
                                                        className="group relative inline-flex items-center overflow-hidden rounded bg-black px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                                                        href="#"
                                                    >
                                                        <span className="text-sm font-medium transition-all group-hover:ml-4">Lấy Mã</span>
                                                    </a>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toàn bộ mã giảm giá */}
                <div className="col-span-5 row-span-2 row-start-3">
                    <div className=" bg-gray-50 p-6 overflow-y-scroll rounded-lg shadow-inner">
                        <div className="grid grid-cols-1 gap-6">
                            <h1 className="text-2xl text-left  font-bold text-gray-800">Danh Sách Voucher</h1>
                            {/* Card 1 */}
                            <div>
                                <div
                                    className={`mb-[30px] bg-white shadow-md transition-shadow rounded-lg flex w-full border border-gray-200 hover:shadow-lg`}
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
                                        >
                                            Copy
                                        </button>
                                        <div className="text-lg font-bold">Mã Voucher</div>
                                    </div>

                                    <div className="bg-white rounded-lg p-4 w-full mx-auto flex flex-col space-y-4">
                                        <p className="text-left text-gray-700 text-base leading-relaxed font-medium">
                                            Tận hưởng mức giảm giá 20% cho đơn hàng của bạn. Đừng bỏ lỡ ưu đãi này!
                                        </p>

                                        {/* Timer Section */}
                                        <div className="flex items-center text-red-500 text-sm font-medium space-x-2">
                                            <span className="text-sm">3 DAYS LEFT</span>
                                        </div>

                                        {/* Divider */}
                                        <hr className="border-t-2 border-dashed border-gray-500 my-4" />

                                        {/* Price Section */}
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    20% <span className="text-sm text-gray-500 ml-1 italic">Theo đơn hàng của bạn</span>
                                                </h3>
                                            </div>
                                            <div>
                                                <button type="submit">
                                                    <a
                                                        className="group relative inline-flex items-center overflow-hidden rounded bg-black px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                                                        href="#"
                                                    >
                                                        <span className="text-sm font-medium transition-all group-hover:ml-4">Lấy Mã</span>
                                                    </a>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ListVoucherClient