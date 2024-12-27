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
  const [categories, setCategories] = useState<Tcategory[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<"Delete" | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async (page: number) => {
      try {
        const response = await apisphp.get(`list/products?page=${page}`);
        setProducts(response.data.data);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Danh Sách Sản Phẩm</h2>
          </div>

          {message && (
            <div
              className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ${
                currentAction === "Delete" ? "bg-green-500" : "bg-red-500"
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
                  <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Tên Sản Phẩm</th>
                  <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                  <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                  <th className="px-2 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">Số Lượng</th>
                  <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Mô Tả</th>
                  <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Danh Mục</th>
                  <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Thao Tác</th>
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

                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
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
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.status === "active"
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
                        <div className="flex justify-center">
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                          >
                            Cập Nhật
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
