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
// import "bootstrap-icons/font/bootstrap-icons.css";

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
        console.log(response);
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

  const handleDelete = async (id: number) => {
    try {
      await apisphp.delete(`/delete/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      setMessage("Product deleted successfully!");
      setCurrentAction("Delete");
      toast.success("Product deleted successfully!");
      setTimeout(() => setMessage(null), 4000);
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error deleting product!");
      setCurrentAction(null);
      toast.error("Error deleting product");
      setTimeout(() => setMessage(null), 4000);
    }
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
    <section className="conten_admin">
      <div className="header_table">
        <h2>Danh Sách Người Dùng</h2>
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
                <th className="px-2 py-2 font-medium text-gray-900">
                  Image Product
                </th>
                <th className="px-2 py-2 font-medium text-gray-900">
                  Image Description
                </th>
                <th className="px-2 py-2 font-medium text-gray-900">Name</th>
                <th className="px-2 py-2 font-medium text-gray-900">Price</th>
                <th className="px-2 py-2 font-medium text-gray-900">Status</th>
                <th className="px-2 py-2 font-medium text-gray-900">
                  Quantity
                </th>
                <th className="px-2 py-2 font-medium text-gray-900">
                  Description
                </th>
                <th className="px-2 py-2 font-medium text-gray-900">
                  Categories
                </th>
                <th className="px-2 py-2 font-medium text-gray-900">Action</th>
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
                  <tr key={product.id} className="border-b">
                    <td className="px-2 py-2 text-gray-900 truncate max-w-xs">
                      {index + 1}
                    </td>
                    <td className="px-2 py-2 text-gray-700 truncate max-w-[500px]">
                      <img
                        src={`http://127.0.0.1:8000/storage/${product.image_product}`}
                        alt=""
                      />
                    </td>
                    <td
                      className="px-2 py-2 cursor-pointer"
                      onClick={() => openLightbox(images, 0)}
                    >
                      {images.length > 0 ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${images[0]}`}
                          alt="Product image"
                          className="w-36"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className="px-2 py-2 text-gray-700 truncate max-w-[100px]">
                      {product.name}
                    </td>
                    <td className="px-2 py-2 text-gray-700">{product.price}</td>
                    <td className="px-2 py-2 text-gray-700">
                      {product.status}
                    </td>
                    <td className="px-2 py-2 text-gray-700">
                      {product.quantity}
                    </td>
                    <td className="px-2 py-2 text-gray-700 truncate max-w-xs">
                      {product.description}
                    </td>
                    <td className="px-2 py-2 text-gray-700">
                      {getCategoryName(product.category_id)}
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
                );
              })}
            </tbody>
          </table>
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
              className="absolute top-2 right-2 text-black text-2xl font-bold"
            >
              &times;
            </button>
            <button
              onClick={goToPreviousImage}
              className="absolute top-1/2 left-2 text-black text-2xl font-bold transform -translate-y-1/2"
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
              className="absolute top-1/2 right-2 text-black text-2xl font-bold transform -translate-y-1/2"
            >
              &gt;
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}

export default ProductList;
