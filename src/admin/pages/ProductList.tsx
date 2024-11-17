import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TProduct } from "../../Types/TProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tcategory from "../../Types/TCategories";
import apisphp from "../../Service/api";
import Modal from "react-modal";
import "../style/Product.css"
import "bootstrap-icons/font/bootstrap-icons.css";


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
        const response = await apisphp.get("/categories");
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
    <section className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Product List</h2>
        <Link to="/admin/products/add" className="btn btn-success">
          Add New Product
        </Link>
      </div>

      {message && (
        <div
          className={`alert ${currentAction === "Delete" ? "alert-success" : "alert-danger"
            } alert-dismissible fade show`}
          role="alert"
        >
          {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <table className="table table-bordered table-hover table-responsive">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1 + (currentPage - 1) * 10}</td>
              <td>
                <img
                  src={product.image_product}
                  alt="Product"
                  className="img-thumbnail"
                  style={{ width: "80px", height: "80px" }}
                />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.status}</td>
              <td>{product.quantity}</td>
              <td>{getCategoryName(product.cat_id)}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="btn btn-success btn-sm"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Custom Pagination */}
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          {/* Previous Button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link rounded-pill shadow-sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {/* Page Number Buttons */}
          {Array.from({ length: lastPage }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
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
          <li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
            <button
              className="page-link rounded-pill shadow-sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === lastPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>


<<<<<<< HEAD
                return (
                  <tr key={product.id} className="border-b">
                    <td className="px-2 py-2 text-gray-900 truncate max-w-xs">
                      {index + 1}
                    </td>
                    <td className="px-2 py-2 text-gray-700 truncate max-w-[200px]">
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
=======
>>>>>>> 0ce1a5bfcf073422e097330bca357edeb053a436

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <Modal
          isOpen={isLightboxOpen}
          onRequestClose={closeLightbox}
          className="modal-dialog-centered modal-lg"
        >
          <div className="modal-content">
            <div className="modal-body">
              <button
                onClick={closeLightbox}
                className="btn-close position-absolute top-0 end-0 m-2"
                aria-label="Close"
              ></button>
              <img
                src={`http://127.0.0.1:8000/storage/${selectedImages[currentImageIndex]}`}
                alt="Product"
                className="img-fluid mx-auto d-block"
              />
              <div className="d-flex justify-content-between mt-2">
                <button className="btn btn-secondary" onClick={goToPreviousImage}>
                  &lt; Previous
                </button>
                <button className="btn btn-secondary" onClick={goToNextImage}>
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <ToastContainer />
    </section>
  );
}

export default ProductList;
