import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Tcategory from "../../Types/TCategories";
import { ToastContainer, toast } from "react-toastify";
import apisphp from "../../Service/api";
type Props = {
  listcategories: Tcategory[];
};

const CategoriesList = ({ listcategories }: Props) => {
  const [categories, setCategories] = useState<Tcategory[]>([]);

  const [message, setMessage] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<"Delete" | null>(null);
  // console.log("listcategories:", listcategories);

  const handleDelete = async (id: number) => {
    try {
      await apisphp.delete(`/categories/${id}`);
      setCategories(categories.filter((categori) => categori.id !== id));
      // Cập nhật thông báo và trạng thái hành động
      setMessage("Danh mục đã được xóa thành công!");
      setCurrentAction("Delete");
      toast.success("Danh mục đã được xóa thành công!");

      // Xóa thông báo sau 4 giây
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setMessage("Lỗi khi xóa sản phẩm!");
      setCurrentAction(null); // Xóa sản phẩm không thành công
      toast.error("Lỗi khi xóa sản phẩm");

      // Xóa thông báo lỗi xóa sản phẩm sau 4 giây
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };
  return (
    <>
      <section className="conten_admin">
        <div className="header_table">
          <h2>Danh Sách Người Dùng</h2>
        </div>

        {/* Hiển thị thông báo */}
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
              <tbody className="divide-y divide-gray-200 ">
                {Array.isArray(listcategories) &&
                  listcategories.map((categori) => (
                    <tr key={categori.id} className="border-b">
                      <td className="px-2 py-2 text-gray-900 truncate max-w-xs">
                        {categori.id}
                      </td>
                      <td className="px-2 py-2 flex justify-center">
                        <img
                          src={categori.imageURL}
                          alt=""
                          style={{ width: "150px" }}
                        />
                      </td>
                      <td className="px-2 py-2 text-gray-700 truncate max-w-xs">
                        {categori.name}
                      </td>
                      <td
                        className={`px-2 py-2 ${
                          categori.status === "active"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {categori.status}
                      </td>

                      <td className="px-2 py-2 text-gray-700">
                        <div className="flex space-x-4 justify-center">
                          <Link
                            to={`/admin/categories/edit/${categori.id}`}
                            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                          >
                            Update
                          </Link>
                          <button
                            onClick={() => handleDelete(categori.id)}
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
        </div>
      </section>
    </>
  );
};

export default CategoriesList;
