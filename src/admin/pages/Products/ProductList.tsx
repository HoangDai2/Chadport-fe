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
import { CgChevronRight } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Line } from "react-icons/ri";
import { VscSaveAs } from "react-icons/vsc";
import { TiCancelOutline } from "react-icons/ti";
import { FaUndo } from "react-icons/fa";
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
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<any[]>([]); // Dùng kiểu dữ liệu phù hợp với response từ API
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [sizes, setSizes] = useState<Size[]>([]); // Thêm state để lưu sizes
  const [colors, setColors] = useState<Color[]>([]); // Thêm state để lưu colors
  const [expandedProductId, setExpandedProductId] = useState<number | null>(
    null
  );

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [editVariantId, setEditVariantId] = useState(null);

  useEffect(() => {
    setLoading(true)
    const fetchProducts = async (page: number) => {
      try {
        const response = await apisphp.get(`list/products?page=${page}`);
        const sortedProducts = response.data.data.sort((a: any, b: any) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        setProducts(sortedProducts);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      } finally {
        setLoading(false);
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

  // call data size và màu
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
    setLoading(true)
    try {
      const response = await apisphp.delete(`delete/products/${id}`);
      setProducts((prevProducts: any) =>
        prevProducts.map((product: any) =>
          product.id === id ? { ...product, deleted_at: new Date() } : product
        )
      );
      setDeletedProducts((prevDeleted) => [
        ...prevDeleted,
        products.find((product: any) => product.id === id)!,
      ]);

      // cập nhất danh sách mới nhất
      const responsessss = await apisphp.get(`list/products`);
      setProducts(responsessss.data.data)

      // Hiển thị thông báo
      toast.success("Sản phẩm đã được xóa thành công!");


    } catch (error) {
      toast.error("Lỗi khi xóa sản phẩm!");
    } finally {
      setLoading(false)
    }
  };

  // phần khôi phục lại sản phẩm đã xóa
  const handleRestore = async (id: string) => {
    setLoading(true)
    try {
      const response = await apisphp.post(`restore/products/${id}`);
      setDeletedProducts((prevDeleted: any) =>
        prevDeleted.filter((product: any) => product.id !== id)
      );
      setProducts((prevProducts: any) =>
        prevProducts.map((product: any) =>
          product.id === id ? { ...product, deleted_at: null } : product
        )
      );

      // Hiển thị thông báo
      toast.success("Sản phẩm đã được khôi phục thành công!");

      // cập nhất danh sách mới nhất
      const responsessss = await apisphp.get(`list/products`);
      setProducts(responsessss.data.data)

    } catch (error) {
      toast.error("Lỗi khi khôi phục sản phẩm!");
    } finally {
      setLoading(false)
    }
  };

  /**
 * Bật hoặc tắt chọn một sản phẩm cụ thể theo ID.
 * Nếu sản phẩm đã được chọn, nó sẽ bị xóa khỏi danh sách đã chọn.
 * Nếu sản phẩm chưa được chọn, nó sẽ được thêm vào danh sách đã chọn.
 * 
 * @param {string} id - ID của sản phẩm cần bật/tắt chọn.
 */
  const handleCheckboxChange = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id]
    );
  };

  /**
 * Bật hoặc tắt chọn tất cả sản phẩm trong bảng.
 * Nếu tất cả sản phẩm đã được chọn, nó sẽ bỏ chọn tất cả.
 * Nếu không phải tất cả sản phẩm được chọn, nó sẽ chọn tất cả.
 */
  const handleSelectAll = () => {
    if (selectedProducts.length === deletedProducts.length) {
      setSelectedProducts([]); // Bỏ chọn tất cả
    } else {
      setSelectedProducts(deletedProducts.map((product) => product.id)); // Chọn tất cả
    }
  };

  /**
   * Khôi phục tất cả các sản phẩm đã chọn theo ID.
   * Gửi yêu cầu API để khôi phục từng sản phẩm được chọn và cập nhật danh sách sản phẩm.
   * Đồng thời, đặt lại danh sách đã chọn sau khi khôi phục thành công.
   * 
   * @async
   */
  const handleRestoreAll = async () => {
    if (selectedProducts.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một sản phẩm!");
      return;
    }

    setLoading(true);
    try {
      // Gửi yêu cầu khôi phục tất cả sản phẩm đã chọn
      await Promise.all(
        selectedProducts.map((id) => apisphp.post(`restore/products/${id}`))
      );

      // Cập nhật danh sách sản phẩm
      setDeletedProducts((prevDeleted) =>
        prevDeleted.filter((product) => !selectedProducts.includes(product.id))
      );
      setProducts((prevProducts: any) =>
        prevProducts.map((product: any) =>
          selectedProducts.includes(product.id)
            ? { ...product, deleted_at: null }
            : product
        )
      );

      toast.success("Hoàn tác tất cả sản phẩm thành công!");

      // Reset danh sách đã chọn
      setSelectedProducts([]);

      // Cập nhật danh sách sản phẩm từ server
      const response = await apisphp.get(`list/products`);
      setProducts(response.data.data);
    } catch (error) {
      toast.error("Lỗi khi khôi phục các sản phẩm!");
    } finally {
      setLoading(false);
    }
  };
  // end khôi phục

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

  // hàm này xử lí edit biến thể
  const handleUpdateVariant = ({ variantId, updatedFields }: any) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === variantId ? { ...variant, ...updatedFields } : variant
      )
    );
  };

  const handleSave = async (variantId: any) => {
    const variantToSave = variants.find((v) => v.id === variantId);
    if (!variantToSave.color_id || !variantToSave.size_id || variantToSave.quantity < 1) {
      toast.error("Vui lòng nhập đầy đủ thông tin hợp lệ!");
      return;
    }
    try {
      await apisphp.put(`/variants/${variantId}`, variantToSave);
      await fetchVariants(variantToSave.product_id);
      toast.success("Cập nhật thành công");
      setEditVariantId(null);
    } catch (error) {
      console.error("Error saving variant:", error);
    }
  };


  const selectedVariantCancel = async () => {
    setSelectedVariant(null);
  };
  // end hưng chỉnh sửa

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

          {/* table sản phẩm chính và biến thể  */}
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

                        className={`hover:bg-gray-50 transition-colors ${isDeleted ? "bg-gray-200" : ""
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
                                className="w-[100px] object-cover rounded-lg"
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
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === "active"
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
                        <td
                          onClick={() => handleRowClick(product.id)}
                          className="cursor-pointer h-[100px] px-4 py-2 border-gray-300 flex items-center justify-center"
                        >
                          <button
                            className={`text-gray-600 hover:text-gray-800 transform transition-transform duration-300 ${expandedProductId === product.id ? "rotate-90" : "rotate-0"
                              }`}
                          >
                            <CgChevronRight />
                          </button>
                        </td>
                      </tr>
                      {/* // start table variant */}
                      {expandedProductId === product.id && (
                        <tr
                          className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedProductId === product.id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                          <td colSpan={10} className="px-4 py-2 bg-gray-100">
                            <h3 className="font-semibold text-gray-700 mb-2">
                              Danh sách biến thể: {product.id}
                            </h3>
                            <table className="w-full border border-gray-300 border-collapse">
                              <thead>
                                <tr className="bg-gray-200 text-center">
                                  <th className="px-4 py-2">Id Variants</th>
                                  <th className="px-4 py-2">Color</th>
                                  <th className="px-4 py-2">Size</th>
                                  <th className="px-4 py-2">Quantity</th>
                                  <th className="px-4 py-2">Acction</th>
                                </tr>
                              </thead>
                              <tbody>
                                {variants.length > 0 ? (
                                  variants.map((variation) => (
                                    <tr key={variation.id} className="hover:bg-gray-300">
                                      <td className="px-4 py-2">{variation.id}</td>

                                      {/* cột màu */}
                                      <td className="px-4 py-2">
                                        {editVariantId === variation.id ? (
                                          <select
                                            value={variation.color_id || ""}
                                            onChange={(e) =>
                                              handleUpdateVariant(variation.id, { color_id: e.target.value })
                                            }
                                            className="block w-full py-1 px-2 border border-gray-300 rounded-md"
                                          >
                                            <option value="">Select Color</option>
                                            {colors.map((col) => (
                                              <option key={col.id} value={col.id}>
                                                {col.name}
                                              </option>
                                            ))}
                                          </select>
                                        ) : (
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
                                        )}
                                      </td>

                                      {/* cột size */}
                                      <td className="px-4 py-2">
                                        {editVariantId === variation.id ? (
                                          <select
                                            value={variation.size_id || ""}
                                            onChange={(e) =>
                                              handleUpdateVariant(variation.id, { size_id: e.target.value })
                                            }
                                            className="block w-full py-1 px-2 border border-gray-300 rounded-md"
                                          >
                                            <option value="">Select Size</option>
                                            {sizes.map((size) => (
                                              <option key={size.id} value={size.id}>
                                                {size.name}
                                              </option>
                                            ))}
                                          </select>
                                        ) : (
                                          variation.size
                                        )}
                                      </td>

                                      {/* cột số lượng */}
                                      <td className="px-4 py-2">
                                        {editVariantId === variation.id ? (
                                          <input
                                            type="number"
                                            value={variation.quantity}
                                            onChange={(e) => {
                                              const value = parseInt(e.target.value, 10);
                                              if (value > 0) {
                                                handleUpdateVariant(variation.id, { quantity: value });
                                              }
                                            }}
                                            className="block w-full py-1 px-2 border border-gray-300 rounded-md"
                                          />
                                        ) : (
                                          variation.quantity
                                        )}
                                      </td>

                                      {/* các núy save cancel edit */}
                                      <td className="px-4 py-2">
                                        {editVariantId === variation.id ? (
                                          <div className="flex space-x-2 justify-center">
                                            <button onClick={() => handleSave(variation.id)}
                                              className="border border-black inline-flex items-center justify-center gap-2 rounded-md w-28 h-10 px-4 py-2 text-sm text-gray-500 hover:text-white hover:bg-black transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                                            >
                                              <VscSaveAs />
                                              Save
                                            </button>

                                            <button
                                              onClick={() => setEditVariantId(null)}
                                              className=" border border-black inline-flex items-center justify-center gap-2 rounded-md w-28 h-10 px-4 py-2 text-sm text-red-500 hover:text-white hover:bg-red-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-red-500"
                                            >
                                              <TiCancelOutline />
                                              Cancel
                                            </button>

                                          </div>
                                        ) : (
                                          <button
                                            onClick={() => setEditVariantId(variation.id)}
                                            className="border border-black inline-flex items-center justify-center gap-2 rounded-md w-28 h-10 px-4 py-2 text-sm text-gray-500 hover:text-white hover:bg-black transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                                          >
                                            <CiEdit />
                                            Edit
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={5} className="px-4 py-2 text-center">
                                      Không có biến thể nào.
                                    </td>
                                  </tr>
                                )}

                              </tbody>
                            </table>
                            <td className="flex justify-end">
                              <div className="inline-flex rounded-lg border border-black bg-gray-100 p-1">
                                <Link to={`/admin/products/edit/${product.id}`}>
                                  <button
                                    className="inline-flex items-center justify-center gap-2 rounded-md w-28 h-10 px-4 py-2 text-sm text-gray-500 hover:text-white hover:bg-black transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                                  >
                                    <CiEdit />
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="inline-flex items-center justify-center gap-2 rounded-md w-28 h-10 px-4 py-2 text-sm text-red-500 hover:text-white hover:bg-red-500 transition duration-300 ease-in-out focus:ring-2 focus:ring-red-500"
                                >
                                  <RiDeleteBin2Line />
                                  Delete
                                </button>
                              </div>
                            </td>
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

          <hr />

          {/* Sản phẩm đã xóa */}
          <div className="mt-[100px] overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-800">Sản Phẩm Đã Xóa</h2>
            <div className="flex justify-end mr-[25px] mb-4">
              <button
                onClick={handleRestoreAll}
                className="border mt-[10px] border-black inline-flex items-center justify-center gap-2 rounded-md w-30 h-10 px-4 py-2 text-sm text-gray-500 hover:text-white hover:bg-black transition duration-300 ease-in-out focus:ring-2 focus:ring-black"
              >
                <FaUndo />
                Hoàn tác all
              </button>
            </div>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="bg-blue-50">
                  <th className="sticky inset-y-0 start-0 px-4 py-2">
                    <label htmlFor="SelectAll" className="sr-only">Select All</label>
                    <input
                      type="checkbox"
                      id="SelectAll"
                      className="size-5 rounded border-gray-300"
                      onChange={handleSelectAll}
                      checked={selectedProducts.length === deletedProducts.length}
                    />
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">#</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Image</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {deletedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      Không có sản phẩm nào đã xóa
                    </td>
                  </tr>
                ) : (
                  deletedProducts.map((product, index) => (
                    <tr key={index}>
                      <td className="sticky inset-y-0 start-0 bg-white px-4 py-2">
                        <label className="sr-only" htmlFor={`Row${index + 1}`}>
                          Row {index + 1}
                        </label>
                        <input
                          className="size-5 rounded border-gray-300"
                          type="checkbox"
                          id={`Row${index + 1}`}
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleCheckboxChange(product.id)}
                        />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{index + 1}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <img
                          src={`http://127.0.0.1:8000/storage/${product.image_product}`}
                          alt=""
                          className="w-[100px]"
                        />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.name}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <button
                          onClick={() => handleRestore(product.id)}
                          className="border border-black inline-flex items-center justify-center gap-2 rounded-md w-28 h-10 px-4 py-2 text-sm text-gray-500 hover:text-white hover:bg-black transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                        >
                          <FaUndo />
                          Hoàn tác
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
