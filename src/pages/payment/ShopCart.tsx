import React, { useEffect, useState } from "react";
import apisphp from "../../Service/api";
import CartData from "../../Types/TCart";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ShopCart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // State lưu các item được chọn

  console.log(selectedItems);

  // call data cart của user
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        console.log("Token:", token);
        if (!token) {
          console.log("Token not found");
          setLoading(false); // Set loading false khi không tìm thấy token
          return;
        }

        // Cấu hình header để thêm token vào yêu cầu
        const headers = {
          Authorization: `Bearer ${token}`, // Gửi token vào header Authorization
        };

        // Lấy dữ liệu giỏ hàng với header token
        const response = await apisphp.get("user/cart", { headers });
        console.log(response);

        setCartData(response.data); // Lưu dữ liệu vào state cartData
        setLoading(false); // Dừng trạng thái loading sau khi lấy dữ liệu
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setLoading(false); // Dừng trạng thái loading khi có lỗi
      }
    };

    fetchCartData();
  }, []);

  // Kiểm tra cartData và cart_items trước khi render
  if (!cartData || !Array.isArray(cartData.cart_items)) {
    return <div>Giỏ hàng trống hoặc dữ liệu không hợp lệ!</div>;
  }

  // Hàm tính tổng tiền cho các sản phẩm đã chọn
  const calculateTotal = () => {
    if (!cartData || !cartData.cart_items) return 0;

    return cartData.cart_items.reduce((total, item) => {
      if (selectedItems.includes(item.cart_item_ids)) {
        return (
          total + parseFloat(item.product_sale_price || item.product_price)
        ); // Thêm giá sản phẩm đã chọn
      }
      return total;
    }, 0);
  };

  // hàn này xử lí chọn, bỏ chọn checkbox
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
  };

  // hàm này xử lí checked true false
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
        { cart_item_ids: selectedItems }, // Gửi mảng ID sản phẩm đã chọn
        { headers }
      );

      if (response.status === 200) {
        toast.success("Sản phẩm đã được chuyển sang thanh toán!");
        navigate("/checkout");
      } else {
        toast.error("Có lỗi khi chuyển sản phẩm.");
      }
    } catch (error) {
      console.error("Error submitting selected items:", error);
      toast.warning("Vui lòng chọn ít nhất một sản phẩm để tiếp tục!");
    }
  };

  // Hàm xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = async (productItemId: number) => {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        alert("Bạn cần đăng nhập để thực hiện hành động này");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`, // Gửi token vào header Authorization
      };

      // Gửi yêu cầu DELETE tới backend
      const response = await apisphp.delete("user/delete_product_cart", {
        headers,
        data: { product_item_id: productItemId }, // Truyền ID sản phẩm cần xóa
      });

      if (response.status === 200) {
        // Cập nhật lại giỏ hàng sau khi xóa sản phẩm
        setCartData((prevState) => ({
          ...prevState!,
          cart_items: prevState!.cart_items.filter(
            (item) => item.product_item_id !== productItemId
          ),
        }));
        // Hiển thị thông báo toast khi thêm thành công
        toast.success("Xóa sản phẩm thành công", {
          position: "top-right",
          autoClose: 3000, // Thời gian tự đóng (3 giây)
        });
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Lỗi khi xóa sản phẩm khỏi giỏ hàng");
    }
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
        <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex gap-8">
            {/* Phần giỏ hàng (Sản phẩm) */}
            <div className="flex-1 space-y-8">
              {/* Danh sách sản phẩm trong giỏ hàng */}
              <div className="space-y-8">
                {cartData.cart_items.length === 0 ? (
                  <div className="flex justify-center ">
                    Không có sản phẩm nào trong giỏ hàng
                  </div>
                ) : (
                  <ul>
                    {cartData.cart_items.map((item) => (
                      <li
                        key={item.product_item_id}
                        className="relative flex items-center justify-between gap-6 p-4 border-b border-gray-200"
                      >
                        {/* Biểu tượng đóng */}
                        <div
                          className="absolute top-[-16px] right-[-35px] p-2 cursor-pointer"
                          onClick={() => handleRemoveItem(item.product_item_id)} // Hàm xử lý xóa sản phẩm
                        >
                          <FaTimes />
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
                          <h3 className="text-sm text-gray-900">
                            {item.product_name}
                          </h3>
                          <dl className="mt-0.5 space-y-px text-xs text-gray-600">
                            <div>
                              <dt className="inline">Size:</dt>
                              <dt className="inline">{item.size.name}</dt>
                            </div>
                            <div>
                              <dt className="inline">Color:</dt>
                              <dd className="inline">{item.color.name}</dd>
                            </div>
                          </dl>
                        </div>

                        {/* Phần chỉnh sửa số lượng */}
                        <div className="flex items-center justify-center w-[80px]">
                          <input
                            type="number"
                            value={item.quantity}
                            className="w-full text-center bg-gray-100 border rounded"
                            readOnly
                          />
                        </div>

                        {/* Giá sản phẩm */}
                        <span className="w-[120px] text-right tracking-wider font-semibold text-green-600">
                          {isNaN(Number(item.product_sale_price))
                            ? "Giá không hợp lệ"
                            : new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(Number(item.product_sale_price))}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Phần thanh toán */}
            <div className="w-1/3 bg-gray-50 p-6 rounded-lg ">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Summary
              </h2>

              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-lg">
                  <p className="text-gray-600">Subtotal:</p>
                  <p className="font-semibold">$20.00</p>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-lg">
                  <p className="text-gray-600">Shipping:</p>
                  <p className="font-semibold">$5.00</p>
                </div>

                {/* Hiển thị tổng tiền cho các sản phẩm đã chọn */}
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">
                    Tổng tiền:{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(calculateTotal())}
                  </h3>
                </div>

                {/* Chọn Voucher */}
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

                {/* Nút thanh toán */}
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
        </div>
      </section>
    </>
  );
};

export default ShopCart;
