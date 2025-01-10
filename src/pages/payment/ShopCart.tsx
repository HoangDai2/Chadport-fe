import React, { useEffect, useState } from "react";
import apisphp from "../../Service/api";
import CartData from "../../Types/TCart";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../Loadings/LoadinfContext";
import axios from "axios";

const ShopCart = ({ onClose }: any) => {
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selecIDCart, setSelecIDCart] = useState<number[]>([]);
  const [variants, setVariants] = useState<any[]>([]); // Lưu biến thể sản phẩm
  const [isDropdownOpen, setDropdownOpen] = useState({});
  // dropdow
  const [selectedSize, setSelectedSize] = useState(null); // Lưu size người dùng chọn
  const [selectedSizeId, setSelectedSizeId] = useState(null); // Lưu size người dùng chọn
  const [selectedColor, setSelectedColor] = useState(null); // Lưu color người dùng chọn
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Lưu lỗi nếu có
  // const [totalPrice, setTotalPrice] = useState(0);

  const allColors = [
    { id: "1", name: "Đỏ nhạt", hex: "#FF6B6B" },
    { id: "2", name: "Xanh nhạt", hex: "#6BCB77" },
    { id: "3", name: "Cam nhạt", hex: "#FFA500" },
    { id: "4", name: "Đen nhạt", hex: "#000000" },
    { id: "5", name: "Vàng nhạt", hex: "#FFFF00" },
    { id: "6", name: "Trắng", hex: "#FFFFFF" },
  ];
  const toggleDropdown = (itemId: number) => {
    setSelecIDCart((PrevselecIDCart) => {
      if (PrevselecIDCart.includes(itemId)) {
        return PrevselecIDCart.filter((item) => item !== itemId);
      } else {
        return [...PrevselecIDCart, itemId];
      }
    });
    if (!handleItemSelect) return;
    // console.log(selectedSizeId);
    // setDropdownOpen(!isDropdownOpen);
    setDropdownOpen((prevId) => (prevId === itemId ? null : itemId));
  };

  useEffect(() => {
    const fetchCartData = async () => {
      startLoading();
      try {
        const token = localStorage.getItem("jwt_token");
        if (!token) {
          console.log("Token not found");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await apisphp.get("user/cart", { headers });
        setCartData(response.data);

        // Gọi API để lấy biến thể cho mỗi sản phẩm trong giỏ hàng
        if (response.data.cart_items) {
          response.data.cart_items.forEach((item) => {
            fetchProductVariants(item.cart_item_ids); // Gọi API cho từng product_id
          });
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        stopLoading();
      }
    };

    fetchCartData();
  }, []);

  const fetchProductVariants = async (productId: Number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/getProductVariants/${productId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setVariants(data); // Lưu biến thể vào state
      // console.log(data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  if (!cartData || !Array.isArray(cartData.cart_items)) {
    return <div>Giỏ hàng trống hoặc dữ liệu không hợp lệ!</div>;
  }

  const calculateTotal = () => {
    return cartData.cart_items.reduce((total, item) => {
      if (selectedItems.includes(item.cart_item_ids)) {
        const itemPrice = parseFloat(
          item.product_sale_price || item.product_price
        );
        return total + itemPrice * item.quantity;
      }
      return total;
    }, 0);
  };

  const handleItemSelect = (itemId: number) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        // Nếu sản phẩm đã được chọn, bỏ chọn nó
        return prevSelectedItems.filter((item) => item !== itemId);
      } else {
        // Nếu sản phẩm chưa được chọn, chọn nó
        return [...prevSelectedItems, itemId];
      }
    });
    // console.log(itemId);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        toast.error("Bạn cần đăng nhập!");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await apisphp.post(
        "user/checkcart",
        { cart_item_ids: selectedItems },
        { headers }
      );
      // console.log(selectedItems);
      if (response.status === 200) {
        toast.success("Sản phẩm đã được chuyển sang thanh toán!");
        navigate("/checkout");
      } else {
        toast.error("Có lỗi khi chuyển sản phẩm.");
      }
      toast.success("Sản phẩm đã được chuyển sang thanh toán!");
      navigate("/checkout");
    } catch (error) {
      console.error("Error submitting selected items:", error);
      toast.warning("Vui lòng chọn ít nhất một sản phẩm để tiếp tục!");
    }
  };

  const handleRemoveItem = async (productItemId: number) => {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        alert("Bạn cần đăng nhập để thực hiện hành động này");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await apisphp.delete("user/delete_product_cart", {
        headers,
        data: { product_item_id: productItemId },
      });

      if (response.status === 200) {
        setCartData((prevState) => ({
          ...prevState!,
          cart_items: prevState!.cart_items.filter(
            (item) => item.product_item_id !== productItemId
          ),
        }));
        toast.success("Xóa sản phẩm thành công");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng");
    }
  };
  // cộng

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        toast.error("Bạn cần đăng nhập!");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await apisphp.post(
        "user/update_cart_quantity",
        { cart_item_ids: itemId, quantity: newQuantity },
        { headers }
      );

      // if (response.status === 200) {
      //   // setCartData((prevState) => ({
      //   //   ...prevState!,
      //   //   cart_items: prevState!.cart_items.map((item) =>
      //   //     item.cart_item_ids === itemId
      //   //       ? { ...item, quantity: newQuantity, }
      //   //       : item
      //   //   ),
      //   // }));
      //   console.log(cartData);
      //   toast.success("Cập nhật số lượng thành công");
      // } else {
      //   toast.error("Cập nhật số lượng that bai");
      // }
      if (response.status === 200) {
        // Cập nhật state của giỏ hàng và tổng tiền
        setCartData((prevState) => {
          const updatedCartItems = prevState!.cart_items.map((item) => {
            if (item.cart_item_ids === itemId) {
              const price = parseFloat(
                item.product_sale_price || item.product_price || "0"
              ); // Lấy giá sản phẩm, ưu tiên sale price nếu có
              const total = price * newQuantity; // Tính tổng tiền cho sản phẩm này

              console.log("Item Price:", price); // Log giá sản phẩm
              console.log("New Quantity:", newQuantity); // Log số lượng mới
              console.log("Total Price for Item:", total); // Log tổng tiền

              return {
                ...item,
                quantity: newQuantity,
                total_price: total, // Cập nhật total_price cho sản phẩm
              };
            }
            return item; // Trả lại sản phẩm không bị chỉnh sửa
          });
          localStorage.setItem("cart_items", JSON.stringify(updatedCartItems));

          return { ...prevState!, cart_items: updatedCartItems };
        });

        // toast.success("Cập nhật số lượng thành công");
      } else {
        toast.error("Cập nhật số lượng thất bại");
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      toast.error("Sản phẩm đạt tối đa");
    }
  };

  const handleSizeSelect = (variant: any) => {
    setSelectedSize(variant.size.name); // Lưu size
    setSelectedSizeId(variant.size_id); // Lưu variant id
    console.log(variant);
    setSelectedColor(null); // Đặt lại màu sắc khi thay đổi size
  };

  const handleColorSelect = (variant: any) => {
    setSelectedColor(variant);
    // console.log("color", variant);
  };

  // const handleConfirm = () => {
  //   if (selectedSize && selectedColor) {
  //     console.log("Selected Variant:", selectedColor);
  //   }
  //   setDropdownOpen(false);
  // };

  // const handleCancel = () => {
  //   setSelectedSize(null);
  //   setSelectedColor(null);
  //   setDropdownOpen(false);
  // };
  // dropdiow
  // console.log(variants);
  const handleConfirm = async (itemId: number, newQuantity: number) => {
    if (!selectedSize || !selectedColor) {
      alert("Vui lòng chọn size và màu sắc!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        toast.error("Bạn cần đăng nhập!");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Gửi yêu cầu API để cập nhật biến thể
      const resUpdatezC = await axios.post(
        "http://127.0.0.1:8000/api/user/updateSizeColor",
        {
          cart_item_id: selecIDCart[0], // ID của sản phẩm trong giỏ hàng
          size_id: selectedSizeId,
          color_id: selectedColor?.color_id || selectedColor, // ID của màu sắc
        },
        { headers }
      );

      await apisphp.post(
        "user/update_cart_quantity",
        { cart_item_ids: selecIDCart[0], quantity: 1 },
        { headers }
      );

      setCartData((prevState) => ({
        ...prevState!,
        cart_items: prevState!.cart_items.map((item) =>
          item.cart_item_ids === itemId
            ? { ...item, quantity: newQuantity }
            : item
        ),
      }));
      // Lấy lại danh sách giỏ hàng từ API

      const response = await axios.get("http://127.0.0.1:8000/api/user/cart", {
        headers,
      });
      setCartData(response.data);
      handleCancel();
      toast.success("Cập nhật thành công!");
      // console.log(response.status);

      if (onClose) {
        onClose(); // Đóng modal hoặc thực hiện hành động khác
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật biến thể: ", err);
      setError(err.response?.data?.message || "Có lỗi xảy ra!");
      toast.error(err.status === 401);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Đóng dropdown
    setDropdownOpen(null); // Đặt giá trị dropdownOpen thành null để đóng dropdown

    // Nếu cần hủy việc chọn item, có thể làm như sau:
    setSelecIDCart([]); // Hủy chọn tất cả các item (hoặc có thể giữ lại item đã chọn tùy theo logic của bạn)
  };

  return (
    <>
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />

      <div id="title" className="page-title bg-gray-50 py-6 mt-[120px]">
        <div className="section-container max-w-7xl mx-auto px-6">
          <div className="content-title-heading mb-4">
            <h1 className="text-title-heading" style={{ fontSize: "50px" }}>
              Giỏ_Hàng
            </h1>
          </div>
          <div className="breadcrumbs text-sm text-gray-600 font-inter">
            <a href="/" className="hover:text-blue-500">
              Home
            </a>
            <span className="delimiter mx-2">/</span>
            <a href="/shop-grid-left" className="hover:text-blue-500">
              Cart
            </a>
            <span className="delimiter mx-2">/</span>
            <span className="text-gray-900">Nike</span>
          </div>
        </div>
      </div>

      <section>
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex gap-8">
            {/* Phần giỏ hàng (Sản phẩm) */}
            <div className="flex-1 space-y-8 mt-4.5">
              {cartData.cart_items.length === 0 ? (
                <div className="flex justify-center">
                  Không có sản phẩm nào trong giỏ hàng
                </div>
              ) : (
                <ul className="space-y-4">
                  {cartData.cart_items.map((item) => (
                    <li
                      key={item.product_item_id}
                      className="relative flex items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
                      onClick={() => handleItemSelect(item.cart_item_ids)} // Gọi hàm chọn item
                    >
                      <div
                        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item.product_item_id);
                        }}
                      >
                        {/* <FaTimes /> */}x
                      </div>
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.cart_item_ids)}
                        onChange={() => handleItemSelect(item.cart_item_ids)}
                        className="h-5 w-5"
                      />
                      {/* Hình ảnh sản phẩm */}
                      <img
                        src={`http://127.0.0.1:8000/storage/${item.image_product}`}
                        className="h-20 w-20 rounded object-cover"
                      />
                      {/* Thông tin sản phẩm */}
                      <div className="flex-1 text-left">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {item.product_name.length > 50
                            ? item.product_name.slice(0, 30) + "..."
                            : item.product_name}
                        </h3>
                        <dl className="mt-1 text-xs text-gray-600 space-y-1">
                          <div>
                            <dt className="inline">Size:</dt>{" "}
                            <dd className="inline">{item.size.name}</dd>
                          </div>
                          <div className="flex">
                            <div>
                              <dt className="inline">Color:</dt>{" "}
                              <dd className="inline">{item.color.name}</dd>
                            </div>
                            <div className="relative  z-10 ">
                              <button
                                id="dropdownDefaultButton"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  toggleDropdown(item.cart_item_ids);
                                }}
                                className="focus:outline-none z-10 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                              >
                                <svg
                                  className={`w-2.5 h-2.5 ms-3 transition-transform duration-300 ${
                                    isDropdownOpen === item.cart_item_ids
                                      ? "transform rotate-180"
                                      : ""
                                  }`}
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 10 6"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 4 4 4-4"
                                  />
                                </svg>
                              </button>
                              {isDropdownOpen === item.cart_item_ids && (
                                <div
                                  className="fixed inset-0 bg-opacity-30 z-10"
                                  onClick={() => toggleDropdown(null)} // Đóng dropdown khi click vào overlay
                                ></div>
                              )}
                              {isDropdownOpen === item.cart_item_ids && (
                                <div className="absolute top-full left-20 z-20 bg-white text-center justify-center border-1 border-gray-400 rounded-lg shadow-sm w-44">
                                  <div className="py-2 z-20 text-sm text-gray-700 dark:text-gray-200">
                                    <div className="flex flex-wrap gap-2 justify-center text-center">
                                      {variants
                                        .map((variant) => variant.size.name)
                                        .filter(
                                          (value, index, self) =>
                                            self.indexOf(value) === index
                                        ) // Lọc unique size
                                        .map((size) => {
                                          // Tìm variant có size tương ứng
                                          const selectedVariant = variants.find(
                                            (variant) =>
                                              variant.size.name === size
                                          );

                                          return (
                                            <button
                                              key={size}
                                              className={`w-20 z-20 h-10 rounded-md border text-sm font-semibold transition-colors duration-300 ${
                                                size === selectedSize
                                                  ? "bg-blue-500 text-white"
                                                  : "bg-gray-100 hover:bg-gray-200"
                                              }`}
                                              onClick={(event) => {
                                                event.stopPropagation();
                                                // Nếu đã chọn size, thì bỏ chọn
                                                if (selectedSize === size) {
                                                  setSelectedSize(null); // Bỏ chọn size
                                                } else {
                                                  setSelectedSize(size); // Chọn size
                                                  handleSizeSelect(
                                                    selectedVariant
                                                  ); // Xử lý khi chọn size
                                                }
                                              }}
                                            >
                                              {size}
                                            </button>
                                          );
                                        })}
                                    </div>
                                    <div className="my-2 mx-auto w-full h-0.5 bg-gray-400"></div>

                                    {(selectedSize
                                      ? variants.filter(
                                          (variant) =>
                                            variant.size.name ===
                                              selectedSize &&
                                            variant.quantity > 0
                                        )
                                      : allColors
                                    ) // Nếu không có size, hiển thị tất cả màu sắc
                                      .map((variantOrColor) => {
                                        const color = selectedSize
                                          ? variantOrColor.color
                                          : variantOrColor;
                                        return (
                                          <button
                                            key={color.id}
                                            className={`w-10 h-10 rounded-full border text-center justify-center transition-all duration-300 ${
                                              selectedColor?.color.id ===
                                              color.id
                                                ? "w-12 h-12 border-4 border-blue-800"
                                                : "border-gray-400"
                                            }`}
                                            style={{
                                              backgroundColor: color.hex,
                                              color:
                                                color.hex === "#FFFFFF"
                                                  ? "black"
                                                  : "white",
                                            }}
                                            onClick={(e) => {
                                              e.stopPropagation();

                                              if (!selectedSize) {
                                                toast.error(
                                                  "Bạn cần chọn size trước khi chọn màu!"
                                                );
                                                return;
                                              }
                                              handleColorSelect(variantOrColor);
                                            }}
                                          ></button>
                                        );
                                      })}
                                  </div>

                                  <div className="flex justify-around mb-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCancel();
                                      }}
                                      className="text-gray-500 bg-gray-200 py-2 px-3 rounded-lg hover:bg-gray-300"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleConfirm(item.cart_item_ids, 1);
                                      }}
                                      className={`text-white bg-blue-500 px-3 py-2 rounded-lg hover:bg-red-300`}
                                      disabled={
                                        !selectedSize ||
                                        !selectedColor ||
                                        isLoading
                                      }
                                    >
                                      {isLoading
                                        ? "Đang cập nhật..."
                                        : "Confirm"}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </dl>
                      </div>

                      {/* Lên */}
                      <div className="w-[20px]"></div>
                      {/* trừ */}
                      <div className="w-[150px] mr-7">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(
                                item.cart_item_ids,
                                item.quantity - 1
                              );
                            }}
                            className="bg-gray-200 text-gray-700 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center"
                          >
                            -
                          </button>

                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.cart_item_ids,
                                parseInt(e.target.value) || 1 // Đảm bảo số lượng tối thiểu là 1
                              )
                            }
                            min="1"
                            readOnly
                            style={{
                              border: "2px solid #cccccc",
                              borderRadius: "8px",
                              padding: "4px",
                              width: "50px",
                              textAlign: "center",
                            }}
                          />

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(
                                item.cart_item_ids,
                                item.quantity + 1
                              );
                            }}
                            className="bg-gray-200 text-gray-700 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-[120px] mr-10 text-right font-semibold text-sm">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          parseFloat(
                            item.product_sale_price || item.product_price
                          )
                        )}
                      </div>
                      {/* Giá sản phẩm */}
                      <span className="w-[120px] text-right font-semibold text-green-600">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          parseFloat(
                            item.product_sale_price || item.product_price
                          ) * item.quantity
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Phần thanh toán */}
            <div className="w-1/3 border border-gray-300 rounded-lg shadow-sm flex flex-col justify-between p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <p className="text-gray-600">Subtotal:</p>
                  <p className="font-semibold">$20.00</p>
                </div>
                <div className="flex justify-between text-lg">
                  <p className="text-gray-600">Shipping:</p>
                  <p className="font-semibold">$5.00</p>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <label htmlFor="voucher" className="text-gray-600">
                    Voucher:
                  </label>
                  <input
                    type="text"
                    id="voucher"
                    className="w-32 p-2 border border-gray-300 rounded-md"
                    placeholder="Enter code"
                  />
                </div>
                <div className="flex justify-between text-lg">
                  <h3 className="text-xl text-right font-semibold">
                    Tổng tiền:{" "}
                  </h3>
                  <p className="font-semibold">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(calculateTotal())}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-black text-white py-2 rounded-lg mt-6 hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopCart;
