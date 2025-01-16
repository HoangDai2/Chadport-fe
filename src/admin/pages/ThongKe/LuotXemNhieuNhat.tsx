import React, { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  product_id: number;
  name: string;
  price: number;
  image_product: string;
  quantity: number;
  total_revenue: number; // Doanh thu (USD)
  search_count: number; // Số lượt tìm kiếm
};

const DonHangCoLuotXemNhieuNhat = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Sản phẩm được chọn
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>("12");

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/getTopSearchedProducts/${year}/${month}`
        );

        // Kiểm tra nếu API trả về thông báo lỗi
        if (response.data.message) {
          setProductData([]); // Đặt productData thành mảng rỗng
          console.warn(response.data.message);
        } else if (response.data && Array.isArray(response.data.data)) {
          // Kiểm tra nếu response.data.data là một mảng
          setProductData(response.data.data.slice(0, 5)); // Lấy 5 sản phẩm đầu tiên
        } else {
          setProductData([]); // Nếu không phải mảng, đặt thành rỗng
        }
      } catch (error) {
        // console.error("Error fetching top selling products:", error);
        setProductData([]); // Nếu lỗi xảy ra, đặt productData thành rỗng
      }
    };
    fetchTopSellingProducts();
  }, [year, month]);

  // console.log(productData);
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
    <div className=" rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top 5 sản phẩm có lượt xem nhiều nhất
      </h4>

      <div className="mb-4 flex gap-4">
        <form className="w-full flex items-center gap-4 ">
          <div className="flex flex-col items-start gap-1">
            <select
              value={month}
              onChange={handleMonthChange}
              className="text-black w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="text-black w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

      <div className="relative shadow-md sm:rounded-lg">
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
                Giá sản phẩm
              </th>
              <th scope="col" className="px-6 py-3">
                Số lượt xem
              </th>
            </tr>
          </thead>
          <tbody>
            {productData.length === 0 ? (
              // Nếu không có dữ liệu
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-sm uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-gray-500"
                >
                  Không có sản phẩm nào trong thời gian này
                </td>
              </tr>
            ) : (
              // Nếu có dữ liệu
              productData.map((product, key) => (
                <tr
                  className=" text-black border-b  hover:bg-gray-200"
                  key={key}
                  onClick={() => openProductDetails(product)}
                >
                  <td className="w-4 pl-8">{key + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={`http://127.0.0.1:8000/storage/${product.image_product}`}
                      alt={product.name}
                      className="text-black w-12 h-12 object-cover"
                    />
                  </td>
                  <th
                    scope="row"
                    className="text-black px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.name.length > 20
                      ? `${product.name.substring(0, 20)}....`
                      : product.name}
                  </th>
                  <td className="px-6 py-4 text-green-400">
                    {product.price
                      ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(Math.ceil(product.price))
                      : "null"}
                  </td>
                  <td className="px-6 py-4">{product.search_count}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* {selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white rounded-lg w-3/4 lg:w-1/2 p-6 overflow-y-auto max-h-[80vh] shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 mt-10">
              Chi tiết sản phẩm {selectedProduct.product_id}
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
                          src={`http://127.0.0.1:8000/storage/${selectedProduct.image_product}`}
                          alt={selectedProduct.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-sm text-gray-800">
                            {selectedProduct.name}
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
      )} */}
    </div>
  );
};

export default DonHangCoLuotXemNhieuNhat;
