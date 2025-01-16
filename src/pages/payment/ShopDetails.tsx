import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../../redux/cartSlice";
import apisphp from "../../Service/api";
import CommentSection from "../Comments/CommentSection";
import TProduct from "../../Types/TProduct";
import { BsBookmarkHeart } from "react-icons/bs";
import { useLoading } from "../Loadings/LoadinfContext";
import tablesize from "../../img/bang-size-giay-1024x571-1.jpg";
import TComments from "../../Types/TComments";

const ShopDetails = ({
  addToWishlist,
}: {
  addToWishlist: (product: TProduct) => void;
}) => {
  const { startLoading, stopLoading } = useLoading();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<TProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [availableColors, setAvailableColors] = useState<
    { id: string; name: string; hex: string }[]
  >([]);
  const [warehouse, setWarehouse] = useState<number>(0); // Số lượng tồn kho
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const token = localStorage.getItem("jwt_token");
  const [isOpen, setIsOpen] = useState(false); // State quản lý hiển thị modal
  // Hàm mở và đóng modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [comments, setComments] = useState<TComments[]>([]);
  // Lấy bình luận từ API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apisphp.get(`/commentsByProductId/${id}`);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [id]);

  // Tính tổng và trung bình số sao
  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return (totalRating / comments.length).toFixed(1); // Tính trung bình và làm tròn 1 chữ số thập phân
  };

  const averageRating = calculateAverageRating(); // Tính toán trung bình số sao
  const navigate = useNavigate();

  // Danh sách tất cả màu từ DB
  const allColors = [
    { id: "1", name: "Đỏ nhạt", hex: "#FF6B6B" },
    { id: "2", name: "Xanh nhạt", hex: "#6BCB77" },
    { id: "3", name: "Cam nhạt", hex: "#FFA500" },
    { id: "4", name: "Đen nhạt", hex: "#000000" },
    { id: "5", name: "Vàng nhạt", hex: "#FFFF00" },
    { id: "6", name: "Trắng", hex: "#FFFFFF" },
  ];

  // Cập nhật màu khi chọn size
  const handleSizeChange = (sizeId: string) => {
    setSelectedSize(sizeId);

    // Lọc màu theo size đã chọn
    const colorsForSelectedSize = product?.variants
      ?.filter((variant) => variant.size?.id === sizeId && variant.quantity > 0)
      .map((variant) => ({
        id: variant.color?.id,
        name: variant.color?.name,
        hex: variant.color?.hex,
      }));
    setAvailableColors(colorsForSelectedSize || allColors); // Nếu không có màu thì hiển thị tất cả
    setSelectedColor(null); // Reset màu khi đổi size
    setWarehouse(0); // Reset số lượng khi đổi Size
  };

  // Cập nhật màu được chọn
  const handleColorChange = (colorId: string) => {
    setSelectedColor(colorId);

    // Lọc số lượng dựa trên Size và Màu đã chọn
    const selectedVariant = product.variants.find(
      (variant) =>
        variant.size?.id === selectedSize && variant.color?.id === colorId
    );
    setWarehouse(selectedVariant ? selectedVariant.quantity : 0); // Cập nhật số lượng tồn kho
    setQuantity(1);
  };
  // hưng làm phần tăng giảm sl
  // const handleIncrement = () => {
  //   const selectedVariant = product?.variants.find(
  //     (variant) =>
  //       variant.size?.id === selectedSize && variant.color?.id === selectedColor
  //   );
  //   console.log(selectedVariant?.quantity);
  //   if (selectedVariant && quantity < selectedVariant.quantity) {
  //     setQuantity((prev) => prev + 1); // Tăng số lượng
  //   }
  // };
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      const token = localStorage.getItem("jwt_token");
      if (!token) return;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await apisphp.get("user/cart", { headers });
        setCartData(response.data.cart_items || []);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu giỏ hàng:", error.message);
      }
    };

    fetchCartData();
  }, []);

  const handleIncrement = () => {
    const selectedVariant = product?.variants.find(
      (variant) =>
        variant.size?.id === selectedSize && variant.color?.id === selectedColor
    );

    if (!selectedVariant) {
      console.log("Không tìm thấy biến thể sản phẩm.");
      return;
    }

    const cartItem = cartData.find(
      (item) =>
        item.product_item_id === selectedVariant.id &&
        item.size?.id === selectedSize &&
        item.color?.id === selectedColor
    );

    const cartQuantity = cartItem ? cartItem.quantity : 0;
    const totalCartdb = selectedVariant.quantity - cartQuantity;
    console.log(cartQuantity);
    console.log(totalCartdb);
    if (quantity < totalCartdb) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.warn("vượt quá số lượng tồn kho.");
    }
  };

  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const [mainImage, setMainImage] = useState<string | null>(null);

  const handleAddToCart = (event: any) => {
    event.preventDefault();

    if (!token) {
      setShowAlert(true);
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast.error("Bắt buộc phải chọn size và color", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (!product?.id) {
      console.error("Product ID is missing");
      return;
    }
    const selectedVariant = product.variants.find(
      (variant) =>
        variant.size?.id === selectedSize && variant.color?.id === selectedColor
    );

    if (!selectedVariant) {
      console.error("Variant not found for selected size and color");
      return;
    }
    // console.log(selectedVariant);
    if (selectedVariant.quantity === 0) {
      toast.warning("Sản phầm này đã hết");
      return;
    }

    const productDetails = {
      product_item_id: selectedVariant.id,
      quantity: quantity,
    };
    dispatch(addToCart(productDetails));
    // toast.success("Thêm vào giỏ hàng thành công!", {
    //   position: "top-right",
    //   autoClose: 3000,
    // });
  };

  const handleBuyNow = async (event: any) => {
    event.preventDefault();

    if (!token) {
      setShowAlert(true);
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast.error("Bắt buộc phải chọn size và color", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (!product?.id) {
      console.error("Product ID is missing");
      return;
    }
    const selectedVariant = product.variants.find(
      (variant) =>
        variant.size?.id === selectedSize && variant.color?.id === selectedColor
    );
    if (!selectedVariant) {
      console.error("Variant not found for selected size and color");
      return;
    }
    if (selectedVariant.quantity === 0) {
      toast.warning("Sản phầm này đã hết");
      return;
    }
    const productDetails = {
      product_item_id: selectedVariant.id,
      quantity: quantity,
      checked: 1,
    };

    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        toast.error("Bạn chưa đăng nhập", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await apisphp.post("/user/buynows", productDetails, {
        headers,
      });

      if (response.status === 200) {
        toast.success(
          "Thêm vào giỏ hàng thành công! Chuyển đến trang thanh toán",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        console.log("check tien", response);


        navigate("/checkout");
      } else {
        toast.error("Không thể thêm vào giỏ hàng, vui lòng thử lại", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error processing Buy It Now request", error);
      toast.error("Có lỗi xảy ra khi xử lý yêu cầu", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      startLoading();
      try {
        const res = await apisphp.get(`/showdetail/products/${id}`);
        const fetchedProduct = res.data;
        let images: string[] = [];
        if (typeof fetchedProduct.image_description === "string") {
          try {
            images = JSON.parse(fetchedProduct.image_description);
          } catch (error) {
            console.error("Error parsing image_description", error);
          }
        } else if (Array.isArray(fetchedProduct.image_description)) {
          images = fetchedProduct.image_description;
        }
        setProduct({ ...fetchedProduct, image_description: images });
        setMainImage(fetchedProduct.image_product);
        // console.log("123", res);
      } catch (error) {
        console.error("Error fetching product details", error);
      } finally {
        stopLoading();
      }
    };
    if (id) {
      fetchProductDetails();
    }
  }, [id]);
  // console.log(product);

  // giao diện hiện thị thông báo check login hay chưa để cho phép bình luận
  const renderAlert = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div
          className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-2xl shadow-2xl transform transition-transform duration-500 scale-100 animate-fade-in"
          style={{ maxWidth: "450px", width: "100%" }}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full shadow-lg mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 6h2v7h-2V6zm0 9h2v2h-2v-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Yêu cầu đăng nhập
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Bạn cần đăng nhập/đăng kí để thực hiện chức năng này. Vui lòng
              thực hiện để tiếp tục.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-all duration-200"
              onClick={() => setShowAlert(false)}
            >
              Đóng
            </button>
            <button
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-blue-600 shadow-lg transition-all duration-200"
              onClick={() => {
                setShowAlert(false);
                window.location.href = "/login"; // Điều hướng đến trang login
              }}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  // console.log(product);
  return (
    <>
      {showAlert && renderAlert()}
      {/* Đặt ToastContainer trong component để hiển thị các thông báo */}
      <div id="site-main" className="site-main">
        <ToastContainer
          theme="light"
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
        />
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div id="title" className="page-title">
              <div className="section-container">
                <div className="content-title-heading">
                  <h1
                    className="text-title-heading"
                    style={{ fontSize: "26px", fontWeight: "bold" }}
                  >
                    {product.name}
                  </h1>
                </div>
                <div className="breadcrumbs">
                  <a href="index.html">Home</a>
                  <span className="delimiter" />
                  <a href="shop-grid-left.html">Shop</a>
                  <span className="delimiter" />
                  {product.name}
                </div>
              </div>
            </div>
            <div id="content" className="site-content" role="main">
              <div
                className="shop-details "
                data-product_layout_thumb="scroll"
                data-zoom_scroll="true"
                data-zoom_contain_lens="true"
                data-zoomtype="inner"
                data-lenssize={200}
                data-lensshape="square"
                data-lensborder
                data-bordersize={2}
                data-bordercolour="#f9b61e"
                data-popup="false"
              >
                <div className="product-top-info">
                  <div className="section-padding">
                    <div className="section-container p-l-r">
                      <div className="row">
                        <div className="product-images col-lg-7 col-md-12 col-12">
                          <div className="row">
                            <div className="col-md-2">
                              <div className="content-thumbnail-scroll">
                                <div
                                  className="image-thumbnail slick-carousel slick-vertical"
                                  data-asnavfor=".image-additional"
                                  data-centermode="true"
                                  data-focusonselect="true"
                                  data-columns4={5}
                                  data-columns3={4}
                                  data-columns2={4}
                                  data-columns1={4}
                                  data-columns={4}
                                  data-nav="true"
                                  data-vertical="true"
                                  data-verticalswiping="true"
                                >
                                  <div className="product-gallery">
                                    {product.image_description &&
                                      Array.isArray(product.image_description) ? (
                                      product.image_description.map(
                                        (image, index) => (
                                          <div
                                            key={index}
                                            className="img-item slick-slide"
                                            onMouseEnter={() =>
                                              setMainImage(
                                                `http://127.0.0.1:8000/storage/${image}`
                                              )
                                            }
                                          >
                                            <span className="img-thumbnail-scroll">
                                              <img
                                                width={100}
                                                height={100}
                                                src={`http://127.0.0.1:8000/storage/${image}`}
                                                alt={`Additional image ${index + 1
                                                  }`}
                                              />
                                            </span>
                                          </div>
                                        )
                                      )
                                    ) : (
                                      <p>No additional images</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* ảnh sản phẩm chính */}
                            <div className="col-md-10">
                              <div className="scroll-image main-image">
                                <img
                                  src={`http://127.0.0.1:8000/storage/${product.image_product}`}
                                  width={900}
                                  height={900}
                                  alt={product.name}
                                  className="main-image animated-image"
                                />
                              </div>
                            </div>

                            {/* Description Additional information Reviews */}
                            <CommentSection />
                          </div>
                        </div>
                        <div className="product-info col-lg-5 col-md-12 col-12 ">
                          <h1 className="title text-left">{product.name}</h1>
                          {/* Giá gốc và giảm giá */}
                          <span className="price flex items-center space-x-6 text-left">
                            <del className="text-sm text-gray-500 ">
                              <span style={{ fontSize: "20px" }}>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(product.price)}
                              </span>
                            </del>

                            <ins className="text-2xl font-bold text-red-600">
                              <span
                                style={{ fontSize: "30px", color: "#d63838" }}
                              >
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(product.price_sale)}
                              </span>
                            </ins>
                          </span>

                          {/* star sản phẩm chính */}
                          <div className="rating text-left flex items-center gap-2">
                            {/* Hiển thị số sao trung bình */}
                            <span className="text-yellow-500 font-semibold text-lg">
                              ★ {averageRating}
                            </span>

                            {/* Hiển thị số lượng đánh giá */}
                            <span className="text-gray-500 text-sm">
                              ({comments.length} đánh giá)
                            </span>
                          </div>

                          {/* mổ tả sản phẩm chính */}
                          <div className="description text-left">
                            <p>{product.description}</p>
                          </div>
                          <div className="mb-3 ">
                            <div className="flex items-baseline justify-between">
                              {/* Hiển thị số lượng sản phẩm */}
                              <div className="flex  text-sm font-medium text-gray-700">
                                <label className="mr-2">Kho Hàng: {warehouse}</label>
                                {/* {selectedSize && selectedColor ? (
                                  <span
                                    className={`text-sm font-semibold ${warehouse > 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                      }`}
                                  >
                                    {warehouse > 0 ? "Còn hàng" : "Hết hàng"}
                                  </span>
                                ) : (
                                  <span className="text-gray-400"></span>
                                )} */}
                              </div>

                              {/* bảng hướng dẫn chọn size */}
                              <div>
                                {/* Nút bấm */}
                                <button
                                  onClick={toggleModal}
                                  className="relative text-black text-base font-medium cursor-pointer p-1 
                                            after:content-[''] after:block after:w-full after:h-[2px] after:bg-black 
                                            after:absolute after:bottom-[-2px] after:scale-x-100 after:transition-transform"
                                >
                                  Hướng dẫn chọn size
                                </button>

                                {/* Modal */}
                                {isOpen && (
                                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                    <div className="relative bg-white p-4 rounded-lg shadow-lg w-[50rem] w-full top-[55px]">
                                      {/* Nút đóng */}
                                      <button
                                        onClick={toggleModal}
                                        className="absolute top-2 right-2 text-gray-500 hover:text-black"
                                      >
                                        ✕
                                      </button>

                                      {/* Hình ảnh bảng size */}
                                      <img
                                        src={tablesize}
                                        alt="Size Guide"
                                        className="w-full h-auto rounded-md"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* // cỡ selection */}
                          <div className="mb-3 ">
                            <label className="block text-sm text-left font-medium text-gray-700">
                              Size:
                            </label>
                            <div className="flex flex-wrap gap-2 ">
                              {[
                                ...new Map(
                                  product.variants
                                    ?.filter((variant) => variant.size?.name)
                                    .map((variant) => [
                                      variant.size?.name,
                                      variant,
                                    ])
                                ).values(),
                              ].map((variant) => (
                                <button
                                  key={variant.size?.name}

                                  className={`px-4 py-2 rounded-md border text-sm font-semibold transition-colors duration-300 ${selectedSize === variant.size?.id
                                    ? "bg-black text-white"
                                    : "bg-white text-gray-700 border-gray-300"
                                    } hover:bg-primary hover:text-black`}
                                  onClick={() =>
                                    handleSizeChange(variant.size?.id || "")
                                  }
                                >
                                  {" "}
                                  {variant.size?.name}{" "}
                                </button>
                              ))}
                            </div>
                          </div>
                          {/*  // Color selection */}
                          <div className="mb-3">
                            <label className="block text-sm text-left font-medium text-gray-700">
                              Color:
                            </label>
                            <div className="flex gap-2">
                              {(selectedSize ? availableColors : []).map(
                                (color) => (
                                  <button
                                    key={color.id}

                                    className={`w-10 h-10 rounded-full border text-sm font-semibold transition-colors duration-300 ${selectedColor === color.id
                                      ? "border-black scale-110"
                                      : "border-gray-300"
                                      }`}

                                    style={{
                                      backgroundColor: color.hex,
                                      color:
                                        color.hex === "#FFFFFF"
                                          ? "black"
                                          : "white",
                                    }}
                                    onClick={() =>
                                      handleColorChange(color.id || "")
                                    }
                                  >

                                    {" "}
                                    { }{" "}
                                  </button>
                                )
                              )}
                            </div>
                          </div>

                          <div className="buttons ">
                            <div className="add-to-cart-wrap">
                              {/* lên */}
                              <div className="quantity">
                                <button
                                  type="button"
                                  className="plus"
                                  onClick={handleIncrement}
                                  disabled={
                                    !product?.variants.find(
                                      (variant) =>
                                        variant.size?.id === selectedSize &&
                                        variant.color?.id === selectedColor &&
                                        quantity < variant.quantity
                                    )
                                  }
                                  style={{
                                    display:
                                      quantity >=
                                        product?.variants.find(
                                          (variant) =>
                                            variant.size?.id === selectedSize &&
                                            variant.color?.id === selectedColor
                                        )?.quantity
                                        ? "none"
                                        : "inline-block",
                                  }}
                                >
                                  +
                                </button>
                                <input
                                  type="number"
                                  className="qty"
                                  step={1}
                                  min={1}
                                  readOnly
                                  name="quantity"
                                  value={quantity}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value) && value > 0) {
                                      setQuantity(value); // Cập nhật state quantity
                                    } else {
                                      setQuantity(1); // Đặt giá trị mặc định là 1 nếu người dùng nhập sai
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  className="minus"
                                  onClick={handleDecrement}
                                >
                                  -
                                </button>
                              </div>

                              {/* nút add cart */}
                              <div className="btn-add-to-carts">
                                <button
                                  onClick={handleAddToCart}
                                  className="button"
                                  tabIndex={0}
                                >
                                  Add to cart
                                </button>
                              </div>

                              {/* add to wishlist */}
                              <div className="ml-2">
                                <button
                                  className="btn-add-to-wishlist"
                                  onClick={() => addToWishlist(product)}
                                >
                                  <BsBookmarkHeart className="text-lg" />
                                </button>
                              </div>
                            </div>

                            {/* buy it now */}
                            <div
                              className="btn-quick-buy"
                              data-title="Buy it now"
                            >
                              <button
                                className="product-btn"
                                onClick={handleBuyNow}
                              >
                                Buy It Now
                              </button>
                            </div>
                          </div>

                          {/* <div className="product-meta">
                            <span className="sku-wrapper">
                              SKU: <span className="sku">D2300-3-2-2</span>
                            </span>
                            <span className="posted-in">
                              Category:{" "}
                              <a href="shop-grid-left.html" rel="tag">
                                Furniture
                              </a>
                            </span>
                            <span className="tagged-as">
                              Tags:{" "}
                              <a href="shop-grid-left.html" rel="tag">
                                Hot
                              </a>
                              ,{" "}
                              <a href="shop-grid-left.html" rel="tag">
                                Trend
                              </a>
                            </span>
                          </div>
                          <div className="social-share">
                            <a
                              href="#"
                              title="Facebook"
                              className="share-facebook"
                              target="_blank"
                            >
                              <i className="fa fa-facebook" />
                              Facebook
                            </a>
                            <a
                              href="#"
                              title="Twitter"
                              className="share-twitter"
                            >
                              <i className="fa fa-twitter" />
                              Twitter
                            </a>
                            <a
                              href="#"
                              title="Pinterest"
                              className="share-pinterest"
                            >
                              <i className="fa fa-pinterest" />
                              Pinterest
                            </a>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
