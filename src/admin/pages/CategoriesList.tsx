import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tcategory from "../../Types/TCategories";
import { ToastContainer, toast } from "react-toastify";
import apisphp from "../../Service/api";
import "../style/Category.css";
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

  // Fetch dữ liệu danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apisphp.get(
          `/categories?page=${currentPage}&per_page=${perPage}`
        );

        if (response.data) {
          setCategories(response.data.data);
          setCurrentPage(response.data.current_page);
          setTotalPages(response.data.last_page);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        toast.error("Lỗi khi lấy danh mục");
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

  return (
    <>
      <section className="conten_admin">
        <div className="header_table">
          <h2>Danh Sách Danh Mục</h2>
        </div>

        {message && (
          <div
            className={`alert-message p-4 mb-4 rounded text-white fixed top-4 right-4 transition-all duration-500 transform ${
              currentAction === "Delete" ? "bg-green-500" : "bg-red-500"
            } fade-in`}
            style={{ zIndex: 1000 }}
          >
            {message}
          </div>
        )}

        <div className="rounded-lg border border-gray-200">
          <div className="overflow-x-auto max-w-full rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="px-2 py-2 font-medium text-gray-900">STT</th>
                  <th className="px-2 py-2 font-medium text-gray-900">Image</th>
                  <th className="px-2 py-2 font-medium text-gray-900">Name</th>
                  <th className="px-2 py-2 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="px-2 py-2 font-medium text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="border-b">
                    <td className="px-2 py-2 text-gray-900">{category.id}</td>
                    <td className="px-2 py-2 flex justify-center">
                      <img
                        src={category.imageURL}
                        alt=""
                        style={{ width: "150px" }}
                      />
                    </td>
                    <td className="px-2 py-2 text-gray-700">{category.name}</td>
                    <td
                      className={`px-2 py-2 ${
                        category.status === "active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {category.status}
                    </td>
                    <td className="px-2 py-2 text-gray-700">
                      <div className="flex space-x-4 justify-center">
                        <Link
                          to={`/admin/categories/edit/${category.id}`}
                          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phân trang */}
          <div className="pagination mt-4">
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                {/* Previous Button */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link rounded-pill shadow-sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                </li>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link rounded-pill shadow-sm"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                {/* Next Button */}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link rounded-pill shadow-sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesList;
