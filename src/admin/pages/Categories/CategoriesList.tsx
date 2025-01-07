import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tcategory from "../../../Types/TCategories";
import { ToastContainer, toast } from "react-toastify";
import apisphp from "../../../Service/api";
// import "../style/Category.css";
type Props = {
  listcategories: Tcategory[];
};
const CategoriesList = ({ listcategories }: Props) => {
  const [categories, setCategories] = useState<Tcategory[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<"Delete" | null>(null);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10); // Số lượng danh mục hiển thị mỗi trang

  const [loading, setLoading] = useState(true);
  // Fetch dữ liệu danh mục
  useEffect(() => {
    const fetchCategories = async () => {

      try {
        const response = await apisphp.get(
          `getall/categories?page=${currentPage}&per_page=${perPage}`
        );

        if (response.data) {
          setCategories(response.data.data);
          setCurrentPage(response.data.current_page);
          setTotalPages(response.data.last_page);
        }
        setLoading(true)
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        toast.error("Lỗi khi lấy danh mục");
      } finally {
        setLoading(false)
      }
    };

    fetchCategories();
  }, [currentPage, perPage]);

  // Xóa danh mục
  const handleDelete = async (id: number) => {
    try {
      await apisphp.delete(`/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
      setMessage("Danh mục đã được xóa thành công!");
      setCurrentAction("Delete");
      toast.success("Danh mục đã được xóa thành công!");

      setTimeout(() => {
        setMessage(null);
      }, 4000);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setMessage("Lỗi khi xóa sản phẩm!");
      setCurrentAction(null);
      toast.error("Lỗi khi xóa sản phẩm");

      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  // Thay đổi trang
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Danh Sách Danh Mục</h2>
            </div>

            {message && (
              <div
                className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ${currentAction === "Delete" ? "bg-green-500" : "bg-red-500"
                  } text-white`}
              >
                {message}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Hình Ảnh</th>
                    <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Tên Danh Mục</th>
                    <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                    <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categories.map((category, index) => (
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-2 py-2 whitespace-nowrap text-center">{index + 1}</td>
                      <td className="px-6 py-6 flex center whitespace-nowrap">
                        <img
                          src={category.imageURL}
                          alt={category.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap max-w-60 truncate">{category.name}</td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${category.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                        >
                          {category.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex center">
                          <button
                            onClick={() => navigateToEdit(category.id)}
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                          >
                            Cập Nhật
                          </button>
                          {/* <button
                          onClick={() => handleDelete(category.id)}
                          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                        >
                          Xóa
                        </button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md ${currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-md ${currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md ${currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesList;
