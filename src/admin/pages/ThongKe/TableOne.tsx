import React, { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  product_id: number;
  product_name: string;
  product_image: string;
  quantity: number;
  total_revenue: number; // Doanh thu (USD)
};

const TableOne = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Sản phẩm được chọn
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>("12");

  // Tỷ giá chuyển đổi từ USD sang VND (ví dụ 1 USD = 23,500 VND)
  const usdToVndRate = 23500;

  // Gọi API để lấy dữ liệu theo tháng và năm
  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/top-selling-products-by-month/${year}/${month}`
        );
        if (response.data && response.data.data) {
          // Giới hạn chỉ lấy 5 sản phẩm đầu tiên
          setProductData(response.data.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching top selling products:", error);
      }
    };

    fetchTopSellingProducts();
  }, [year, month]);

  // Hàm xử lý sự kiện thay đổi năm và tháng
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top 5 sản phẩm bán chạy trong tháng
      </h4>

      <div className="mb-4 flex gap-4">
        <form className="w-full flex items-center gap-4">
          <div className="flex flex-col items-start gap-1">
            <select
              value={month}
              onChange={handleMonthChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Tháng {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-start gap-1">
            <select
              value={year}
              onChange={handleYearChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {[...Array(new Date().getFullYear() - 1999)].map((_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      <div className="relative shadow-md sm:rounded-lg mb-3">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                Top
              </th>
              <th scope="col" className="px-6 py-3">
                Hình ảnh
              </th>
              <th scope="col" className="px-6 py-3">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-3">
                số lượng bán
              </th>
              <th scope="col" className="px-6 py-3">
                Doanh thu
              </th>
            </tr>
          </thead>
          <tbody>
            {productData.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center justify-center py-4 text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-gray-500"
                >
                  Sản phẩm chưa có ở thời gian này
                </td>
              </tr>
            ) : (
              productData.map((product, key) => (
                <tr
                  className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200"
                  key={key}
                  onClick={() => openProductDetails(product)}
                >
                  <td className="w-4 pl-8">{key + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={`http://127.0.0.1:8000/storage/${product.product_image}`}
                      alt={product.product_name}
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.product_name.length > 20
                      ? `${product.product_name.substring(0, 20)}....`
                      : product.product_name}
                  </th>
                  <td className="px-16 py-4">{product.quantity}</td>
                  <td className="px-6 py-4 text-green-400">
                    {product.total_revenue
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Math.ceil(product.total_revenue))
                      : "null"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white rounded-lg w-3/4 lg:w-1/2 p-6 overflow-y-auto max-h-[80vh] shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 mt-10">
              Chi tiết đơn hàng {selectedProduct.product_id}
            </h3>
            <div className="mt-6 space-y-6">
              <div className="flex space-x-8">
                <div className="w-full">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      Sản phẩm
                    </p>
                    <div className="space-y-4 mt-4">
                      <div
                        key={selectedProduct.product_id}
                        className="flex items-center space-x-4 border-b pb-4"
                      >
                        <img
                          src={`http://127.0.0.1:8000/storage/${selectedProduct.product_image}`}
                          alt={selectedProduct.product_name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-sm text-gray-800">
                            {selectedProduct.product_name}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm">
                        Giá:{" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(selectedProduct.total_revenue)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-lg font-semibold text-gray-800">
                  Doanh thu:{" "}
                  <span className="text-green-500 font-semibold">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(selectedProduct.total_revenue)}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeProductDetails}
                className="bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableOne;
