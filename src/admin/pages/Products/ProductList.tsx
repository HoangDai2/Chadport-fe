import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Color, Size, TProduct } from "../../../Types/TProduct";
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

  const [variants, setVariants] = useState<any[]>([]); // Dùng kiểu dữ liệu phù hợp với response từ API
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [sizes, setSizes] = useState<Size[]>([]); // Thêm state để lưu sizes
  const [colors, setColors] = useState<Color[]>([]); // Thêm state để lưu colors
  const [expandedProductId, setExpandedProductId] = useState<number | null>(
    null
  );

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSizes = await apisphp.get("/sizes");
        const responseColors = await apisphp.get("/colors");
        setSizes(responseSizes.data.data);
        setColors(responseColors.data.data);
        // console.log(responseSizes.data.data);
        // console.log(responseColors.data.data);
      } catch (error) {
        console.error("Error fetching sizes and colors:", error);
      }
    };
    fetchData();
  }, []);

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
        products.find((product) => product.id === id)!,
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

  // hưng chỉnh sửa
  const fetchVariants = async (productId: number) => {
    try {
      const res = await apisphp.get(`/productsvariants/${productId}`);
      const variantsWithProductId = res.data.variants.map((variant: any) => ({
        ...variant,
        product_id: productId, // Lưu product_id trong mỗi variant
      }));
      setVariants(variantsWithProductId); // Cập nhật variants với product_id
      // console.log(variantsWithProductId);
    } catch (error) {
      console.error("Error fetching product variants:", error);
    }
  };

  const handleRowClick = async (productId: number) => {
    if (expandedProductId === productId) {
      // Đóng lại, reset variants nếu đã mở
      setExpandedProductId(null);
      setVariants([]);
    } else {
      // Mở sản phẩm mới và lấy variants
      setExpandedProductId(productId);
      await fetchVariants(productId);
    }
  };
  const handleEdit = (variant: any) => {
    setSelectedVariant(variant);

    // console.log("variant", variant);
  };
  const handleSave = async () => {
    if (selectedVariant) {
      if (!selectedVariant.color_id) {
        toast.error("Cần chọn màu");
        return;
      }

      if (!selectedVariant.size_id) {
        toast.error("Cần chọn kích cỡ");
        return;
      }

      if (selectedVariant.quantity === 0 || selectedVariant.quantity < 1) {
        toast.error("Cần nhập số lượng lớn hơn 0");
        return;
      }
      try {
        const response = await apisphp.put(
          `/variants/${selectedVariant.id}`,
          selectedVariant
        );

        if (response.data) {
          // Cập nhật trực tiếp variant trong state variants
          // setVariants((prevVariants) =>
          //   prevVariants.map((variant) =>
          //     variant.id === selectedVariant.id
          //       ? { ...variant, ...selectedVariant } // Cập nhật biến thể đó
          //       : variant
          //   )
          // );
          await fetchVariants(selectedVariant.product_id);
          toast.success("Cập nhật thành công");
          setSelectedVariant(null);
        }
      } catch (error) {
        console.error("Error saving variant:", error);
      }
    }
  };

  const selectedVariantCancel = async () => {
    setSelectedVariant(null);
  };
  // end hưng chỉnh sửa

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              Danh Sách Sản Phẩm
            </h2>
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
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Hình Ảnh
                  </th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Tên Sản Phẩm
                  </th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Trạng Thái
                  </th>
                  <th className="px-2 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Số Lượng
                  </th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Mô Tả
                  </th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Danh Mục
                  </th>
                  <th className="px-2 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Thao Tác
                  </th>
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

                    <React.Fragment key={product.id}>
                      <tr
                        key={product.id}
                        onClick={() => handleRowClick(product.id)}
                        className={`hover:bg-gray-50 transition-colors ${
                          isDeleted ? "bg-gray-200" : ""
                        }`}
                      >
                        <td className="px-2 py-2 whitespace-nowrap text-center">
                          {index + 1}
                        </td>
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
                        <td className="px-2 py-2 whitespace-nowrap max-w-60 truncate">
                          {product.name}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          {product.price}
                        </td>
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
                        <td className="px-2 py-2 whitespace-nowrap">
                          {product.total_quatity}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap max-w-64 truncate">
                          {product.description}
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          {getCategoryName(product.category_id)}
                        </td>
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
                      {/* // start table variant */}
                      {expandedProductId === product.id && (
                        <tr>
                          <td colSpan={10} className="px-4 py-2 bg-gray-100">
                            <h3 className="font-semibold text-gray-700 mb-2">
                              Danh sách biến thể:{product.id}
                            </h3>
                            <table className="w-full border border-gray-300 border-collapse">
                              <thead>
                                <tr className="bg-gray-200 text-center">
                                  <th className="px-4 py-2">Id Variants</th>
                                  <th className="px-4 py-2">Color</th>
                                  <th className="px-4 py-2">Size</th>
                                  <th className="px-4 py-2">Quantity</th>
                                </tr>
                              </thead>
                              <tbody>
                                {variants.length > 0 ? (
                                  variants.map((variation) => (
                                    <tr
                                      key={variation.id}
                                      className="hover:bg-gray-300"
                                      onClick={() => handleEdit(variation)}
                                    >
                                      <td className="px-4 py-2">
                                        {variation.id}
                                      </td>
                                      <td className="px-4 py-2">
                                        <span
                                          style={{
                                            backgroundColor: variation.color,
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                            border: "1px solid #ccc",
                                          }}
                                        ></span>
                                      </td>
                                      <td className="px-4 py-2">
                                        {variation.size}
                                      </td>
                                      <td className="px-4 py-2">
                                        {variation.quantity}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={4}
                                      className="px-4 py-2 text-center"
                                    >
                                      Không có biến thể nào.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                    // end table variant

                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Sản phẩm đã xóa */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Sản Phẩm Đã Xóa
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      STT
                    </th>
                    <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Tên Sản Phẩm
                    </th>
                    <th className="px-4 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Thao Tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {deletedProducts.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 whitespace-nowrap text-center">
                        {index + 1}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap max-w-60 truncate">
                        {product.name}
                      </td>
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
          {/* edit vatiants */}
          {selectedVariant && (
            // console.log(selectedVariant),
            <div
              className="fixed inset-0 bg-gray-300 bg-opacity-75 flex justify-center items-center"
              onClick={() => setSelectedVariant(null)} // Đóng modal khi click ngoài
            >
              <div
                className="bg-white rounded-md shadow-lg p-6 max-w-2xl w-full relative"
                style={{ left: "10%" }} // Di chuyển modal sang bên phải
                onClick={(e) => e.stopPropagation()} // Ngăn chặn việc đóng modal khi click vào nội dung modal
              >
                <h3 className="text-lg font-medium">Edit Variant</h3>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <select
                      value={selectedVariant.color_id || ""}
                      onChange={(e) =>
                        setSelectedVariant({
                          ...selectedVariant,
                          color_id: e.target.value || null, // Nếu không chọn, set là null
                        })
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select Color</option>
                      {colors.map((col) => (
                        <option
                          key={col.id}
                          value={col.id}
                          style={{
                            backgroundColor:
                              selectedVariant.color === col.hex
                                ? "#5FAF32"
                                : "transparent",
                          }}
                        >
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Size
                    </label>
                    <select
                      value={selectedVariant.size_id || ""}
                      onChange={(e) =>
                        setSelectedVariant({
                          ...selectedVariant,
                          size_id: e.target.value || null, // Nếu không chọn, set là null
                        })
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select Size</option>
                      {sizes.map((size) => (
                        <option
                          key={size.id}
                          value={size.id}
                          style={{
                            backgroundColor:
                              selectedVariant.size === size.name
                                ? "#5FAF32"
                                : "transparent",
                          }}
                        >
                          {size.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={selectedVariant.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value > 0) {
                          setSelectedVariant({
                            ...selectedVariant,
                            quantity: value,
                          });
                        }
                      }}
                      min="1"
                      className="mt-1 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-4 justify-center items-center flex space-x-4">
                  <button
                    onClick={handleSave}
                    className=" text-white btn  font-bold py-2 px-4 rounded   bg-blue-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => selectedVariantCancel()}
                    className="bg-red-500 btn text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
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
