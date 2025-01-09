import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TProduct } from "../../../Types/TProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tcategory from "../../../Types/TCategories";
import apisphp from "../../../Service/api";
import Modal from "react-modal";
import "../../style/Product.css";


Modal.setAppElement("#root");

function ProductList() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [deletedProducts, setDeletedProducts] = useState<TProduct[]>([]);
  const [categories, setCategories] = useState<Tcategory[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<"Delete" | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async (page: number) => {
      try {
        const response = await apisphp.get(`list/products?page=${page}`);
        setProducts(response.data.data);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        setLoading(true)
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      } finally {
        setLoading(false)
      }
    };

    const fetchDeletedProducts = async () => {
      try {
        const response = await apisphp.get("getDeletedProducts");
        setDeletedProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching deleted products:", error);
        toast.error("Error fetching deleted products");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await apisphp.get("getall/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      }
    };

    fetchCategories();
    fetchProducts(currentPage);
    fetchDeletedProducts(); // Fetch deleted products on initial load
  }, [currentPage]);

  const getCategoryName = (cat_id: number) => {
    const category = categories.find((cat) => cat.id === cat_id);
    return category ? category.name : "Unknown Category";
  };

  const openLightbox = (images: string[], index: number) => {
    setSelectedImages(images);
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % selectedImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + selectedImages.length) % selectedImages.length
    );
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apisphp.delete(`delete/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, deleted_at: new Date() } : product
        )
      );
      setDeletedProducts((prevDeleted) => [
        ...prevDeleted,
        products.find((product) => product.id === id)!
      ]);

      // Hiển thị thông báo
      toast.success("Sản phẩm đã được xóa thành công!");

      // Tải lại trang sau khi xóa
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Lỗi khi xóa sản phẩm!");
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const response = await apisphp.post(`restore/products/${id}`);
      setDeletedProducts((prevDeleted) =>
        prevDeleted.filter((product) => product.id !== id)
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, deleted_at: null } : product
        )
      );

      // Hiển thị thông báo
      toast.success("Sản phẩm đã được khôi phục thành công!");

      // Tải lại trang sau khi khôi phục
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Lỗi khi khôi phục sản phẩm!");
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
    <div className="min-h-screen bg-gray-50 py-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Danh Sách Sản Phẩm</h2>
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
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">STT</th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Hình Ảnh</th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Tên Sản Phẩm</th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                  <th className="px-2 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">Số Lượng</th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Mô Tả</th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Danh Mục</th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product, index) => {
                  let images: string[] = [];
                  if (typeof product.image_description === "string") {
                    try {
                      images = JSON.parse(product.image_description);
                    } catch (error) {
                      console.error("Error parsing image_description:", error);
                    }
                  } else if (Array.isArray(product.image_description)) {
                    images = product.image_description;
                  }

                  const isDeleted = product.deleted_at !== null;

                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-gray-50 transition-colors ${isDeleted ? "bg-gray-200" : ""}`}
                    >
                      <td className="px-2 py-2 whitespace-nowrap text-center">{index + 1}</td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div
                          className="cursor-pointer"
                          onClick={() => openLightbox(images, 0)}
                        >
                          {images.length > 0 ? (
                            <img
                              src={`http://127.0.0.1:8000/storage/${images[0]}`}
                              alt="Product image"
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          ) : (
                            <span>No Image</span>
                          )}
                        </div>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap max-w-60 truncate">{product.name}</td>
                      <td className="px-2 py-2 whitespace-nowrap">{product.price}</td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">{product.total_quatity}</td>
                      <td className="px-2 py-2 whitespace-nowrap max-w-64 truncate">{product.description}</td>
                      <td className="px-2 py-2 whitespace-nowrap">{getCategoryName(product.category_id)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-center">
                        <div className="flex justify-center gap-2">
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="px-4 py-2 bg-green-500 w-24 text-white font-semibold rounded-lg shadow-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                          >
                            Cập Nhật
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-4 py-2 bg-red-500 w-24 text-white font-semibold rounded-lg shadow-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Sản phẩm đã xóa */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800">Sản Phẩm Đã Xóa</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Tên Sản Phẩm</th>
                    <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {deletedProducts.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 whitespace-nowrap text-center">{index + 1}</td>
                      <td className="px-2 py-2 whitespace-nowrap max-w-60 truncate">{product.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleRestore(product.id)}
                          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                          Khôi phục
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <Modal
          isOpen={isLightboxOpen}
          onRequestClose={closeLightbox}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
        >
          <div className="relative">
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 text-white text-2xl font-bold"
            >
              &times;
            </button>
            <button
              onClick={goToPreviousImage}
              className="absolute top-1/2 left-2 text-white text-2xl font-bold transform -translate-y-1/2"
            >
              &lt;
            </button>
            <img
              src={`http://127.0.0.1:8000/storage/${selectedImages[currentImageIndex]}`}
              alt="Product image"
              className="max-w-full max-h-screen"
            />
            <button
              onClick={goToNextImage}
              className="absolute top-1/2 right-2 text-white text-2xl font-bold transform -translate-y-1/2"
            >
              &gt;
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ProductList;
