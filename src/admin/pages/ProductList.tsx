import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import instance from "../../Service";
import { TProduct } from "../../Types/TProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tcategory from "../../Types/TCategories";
function ProductList() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [categories, setCategories] = useState<Tcategory[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<"Delete" | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await instance.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("lỗi danh mục:", error);
        toast.error("lỗi danh mục");
      }
    };
    fetchCategories();
    fetchProducts();
  }, []);

  // hàm này sẽ lấy tên danh mục theo id
  const getCategoryName = (cat_id: number) => {
    const category = categories.find((cat) => cat.id === cat_id);
    return category ? category.name : "Unknown Category";
  };
  const handleDelete = async (id: number) => {
    try {
      await instance.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      // Cập nhật thông báo và trạng thái hành động
      setMessage("Sản phẩm đã được xóa thành công!");
      setCurrentAction("Delete");
      toast.success("Sản phẩm đã được xóa thành công!");

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
                <th className="px-2 py-2 font-medium text-gray-900">Price</th>
                <th className="px-2 py-2 font-medium text-gray-900">Status</th>
                <th className="px-2 py-2 font-medium text-gray-900">
                  Quantity
                </th>
                <th className="px-2 py-2 font-medium text-gray-900 ">
                  Description
                </th>
                <th className="px-2 py-2 font-medium text-gray-900">
                  Categories
                </th>
                <th className="px-2 py-2 font-medium text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-2 py-2 text-gray-900 truncate max-w-xs">
                    {product.id}
                  </td>
                  <td className="px-2 py-2">
                    <img
                      src={product.image_product}
                      alt=""
                      style={{ width: "150px" }}
                    />
                  </td>
                  <td className="px-2 py-2 text-gray-700 truncate max-w-[100px]">
                    {product.name}
                  </td>
                  <td className="px-2 py-2 text-gray-700">{product.price}</td>
                  <td className="px-2 py-2 text-gray-700">{product.status}</td>
                  <td className="px-2 py-2 text-gray-700">
                    {product.quantity}
                  </td>
                  <td className="px-2 py-2 text-gray-700 truncate max-w-xs">
                    {product.description}
                  </td>
                  <td className="px-2 py-2 text-gray-700">
                    {getCategoryName(product.cat_id)}
                  </td>
                  <td className="px-2 py-2 text-gray-700">
                    <div className="flex space-x-4">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
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
  );
}

export default ProductList;
