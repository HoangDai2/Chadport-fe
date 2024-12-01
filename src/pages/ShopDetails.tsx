import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TProduct from "../Types/TProduct";
import instance from "../Service";
import { ToastContainer } from "react-toastify";
import apisphp from "../Service/api";
import CommentSection from "./Comments/CommentSection";

const ShopDetails = ({
  addToCart,
  addToWishlist,
}: {
  addToCart: (product: TProduct) => void;
  addToWishlist: (product: TProduct) => void;
}) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<TProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Function to handle size change
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  // Function to handle color change
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  const navigate = useNavigate();
  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }

    if (!product?.id) {
      console.error("Product ID is missing");
      return;
    }

    const productDetails = {
      ...product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    };

    addToCart(productDetails);
    navigate("/checkout", { state: { product: productDetails } });
  };

  // State để quản lý số lượng sản phẩm
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await apisphp.get(`/showdetail/products/${id}`);
        const fetchedProduct = res.data;
        // console.log(fetchedProduct, "fet");

        let images: string[] = [];
        if (typeof fetchedProduct.image_description === "string") {
          try {
            images = JSON.parse(fetchedProduct.image_description);
          } catch (error) {
            console.error("Error parsing image_description:", error);
          }
        } else if (Array.isArray(fetchedProduct.image_description)) {
          images = fetchedProduct.image_description;
        }

        setProduct({ ...fetchedProduct, image_description: images });
        setMainImage(fetchedProduct.image_product); // Đặt ảnh chính ban đầu
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);
  // console.log(product);
  // start hung test details
  useEffect(() => {
    const testDetailsFetch = async () => {
      try {
        // Gọi API để lấy chi tiết sản phẩm
        const res = await apisphp.get(`/showdetail/products/${id}`);
        const fetchedProduct = res.data;

        // Kiểm tra nếu mảng `products` đã có sản phẩm với cùng `id`
        setRelatedProducts((prevProducts) => {
          // Kiểm tra xem sản phẩm có tồn tại trong mảng chưa
          const existingProduct = prevProducts.find(
            (product) => product.id === fetchedProduct.id
          );

          if (existingProduct) {
            // Nếu sản phẩm đã có, không thêm vào mà giữ nguyên mảng cũ
            return prevProducts;
          } else {
            // Nếu sản phẩm chưa có, thêm sản phẩm vào mảng
            return [...prevProducts, fetchedProduct];
          }
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false); // Đảm bảo loading được tắt sau khi lấy dữ liệu xong
      }
    };

    if (id) {
      testDetailsFetch();
    }
  }, [id]); // Chạy lại khi id thay đổi
  console.log("relatedProducts", relatedProducts);

  // end hung test details

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
                                                alt={`Additional image ${
                                                  index + 1
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
                              <span style={{ fontSize: "30px" }}>
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(product.price_sale)}
                              </span>
                            </ins>
                          </span>
                          {/* star sản phẩm chính */}
                          <div className="rating text-left">
                            <div className="star star-5" />
                            <div className="review-count">
                              (3<span> reviews</span>)
                            </div>
                          </div>

                          {/* mổ tả sản phẩm chính */}
                          <div className="description text-left">
                            <p>{product.description}</p>
                          </div>

                          {/* Size selection */}
                          <div className="mb-3">
                            <label className="block text-sm text-left font-medium text-gray-700">
                              Size:
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {[
                                ...new Set(
                                  product.variants
                                    ?.map((variant) => variant.size?.name)
                                    .filter(Boolean)
                                ),
                              ].map((size) => (
                                <button
                                  key={size}
                                  className={`px-4 py-2 rounded-md border text-sm font-semibold transition-colors duration-300 
                                        ${
                                          selectedSize === size
                                            ? "bg-black text-white "
                                            : "bg-white text-gray-700 border-gray-300"
                                        }
                                        hover:bg-primary hover:text-black`}
                                  onClick={() => handleSizeChange(size || "")}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Color selection */}
                          <div className="mb-3">
                            <label className="block text-sm text-left font-medium text-gray-700">
                              Color:
                            </label>
                            <div className="flex gap-2">
                              {[
                                ...new Set(
                                  product.variants
                                    ?.map((variant) => variant.color?.name)
                                    .filter(Boolean)
                                ),
                              ].map((color) => {
                                const hex = product.variants?.find(
                                  (variant) => variant.color?.name === color
                                )?.color?.hex;
                                return (
                                  <button
                                    key={color}
                                    className={`w-8 h-8 rounded-full border transition-all duration-300
                                          ${
                                            selectedColor === color
                                              ? "border-blue-500 ring-2 ring-black"
                                              : "border-transparent"
                                          }
                                          ${
                                            hex ? `bg-[${hex}]` : "bg-gray-300"
                                          }`}
                                    onClick={() =>
                                      handleColorChange(color || "")
                                    }
                                    style={{ backgroundColor: hex || "#ccc" }}
                                  />
                                );
                              })}
                            </div>
                          </div>

                          <div className="buttons">
                            <div className="add-to-cart-wrap">
                              {/* số lượng tăng giảm */}
                              <div className="quantity">
                                <button
                                  type="button"
                                  className="plus"
                                  onClick={handleIncrement}
                                >
                                  +
                                </button>
                                <input
                                  type="number"
                                  className="qty"
                                  step={1}
                                  min={1}
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
                              <div className="btn-add-to-cart">
                                <a
                                  onClick={() => {
                                    // Kiểm tra nếu chưa chọn size và color
                                    if (!selectedSize || !selectedColor) {
                                      alert("Please select size and color");
                                      return;
                                    }

                                    // Tìm variant phù hợp với size và color đã chọn
                                    const selectedVariant =
                                      product.variants?.find(
                                        (variant) =>
                                          variant.size?.name === selectedSize &&
                                          variant.color?.hex === selectedColor
                                      );

                                    if (!selectedVariant) {
                                      alert("Variant not found!");
                                      return;
                                    }

                                    // Thêm vào giỏ hàng với thông tin variant
                                  }}
                                  href="#"
                                  className="button"
                                  tabIndex={0}
                                >
                                  Add to cart
                                </a>
                              </div>
                            </div>
                            <div
                              className="btn-quick-buy"
                              data-title="Wishlist"
                            >
                              <button
                                className="product-btn"
                                onClick={handleBuyNow}
                              >
                                Buy It Now
                              </button>
                            </div>
                            <div className="btn-wishlist btn" data-title="">
                              <button
                                className="product-btn"
                                onClick={() => addToWishlist(product)}
                              >
                                Add to wishlist
                              </button>
                            </div>
                            <div className="btn-compare" data-title="Compare">
                              <button className="product-btn">Compare</button>
                            </div>
                          </div>

                          <div className="product-meta">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Products */}
                <div className="product-related">
                  <div className="section-padding">
                    <div className="section-container p-l-r">
                      <div className="block block-products slider">
                        <div className="block-title">
                          <h2>Related Products</h2>
                        </div>
                        <div className="block-content">
                          <div className="content-product-list slick-wrap">
                            <div
                              className="products-list grid"
                              data-slidestoscroll="true"
                              data-dots="false"
                              data-nav={1}
                              data-columns4={1}
                              data-columns3={2}
                              data-columns2={3}
                              data-columns1={3}
                              data-columns1440={4}
                              data-columns={4}
                            >
                              <div className="slick-sliders">
                                {relatedProducts.map((relatedProduct) => (
                                  <div
                                    className="item-product slick-slider-item"
                                    key={relatedProduct.id}
                                  >
                                    <div className="items">
                                      <div className="products-entry clearfix product-wapper">
                                        <div className="products-thumb">
                                          <div className="product-lable">
                                            <div className="hot">Hot</div>
                                          </div>
                                          <a
                                            href={`/shop-details/${relatedProduct.id}`}
                                          >
                                            <img
                                              width={600}
                                              height={600}
                                              src={`http://127.0.0.1:8000/storage/${product.image_product}`}
                                              className="post-image"
                                              alt={relatedProduct.name}
                                            />
                                          </a>
                                          <div className="product-button">
                                            <div
                                              className="cart_default"
                                              data-title="Add to cart"
                                            >
                                              <a
                                                onClick={() => {
                                                  addToCart(relatedProduct);
                                                }}
                                                rel="nofollow"
                                                // href="#"
                                                className="product-btn"
                                              >
                                                Add to cart
                                              </a>
                                            </div>
                                            <div
                                              className=""
                                              data-title="Wishlist"
                                            >
                                              <button
                                                className="product-btn"
                                                onClick={() =>
                                                  addToWishlist(relatedProduct)
                                                }
                                              >
                                                Add to wishlist
                                              </button>
                                            </div>
                                            <div
                                              className="btn-compare"
                                              data-title="Compare"
                                            >
                                              <button className="product-btn">
                                                Compare
                                              </button>
                                            </div>
                                            <span
                                              className="product-quickview"
                                              data-title="Quick View"
                                            >
                                              <a
                                                href="#"
                                                className="quickview quickview-button"
                                              >
                                                Quick View{" "}
                                                <i className="icon-search" />
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="products-content">
                                          <div className="contents text-center">
                                            <h3 className="product-title">
                                              <a
                                                href={`/shop-details/${relatedProduct.id}`}
                                              >
                                                {relatedProduct.name}
                                              </a>
                                            </h3>
                                            <div className="rating">
                                              <div className="star star-5" />
                                            </div>
                                            <span className="tracking-wider text-2xl font-semibold text-gray-900">
                                              {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                              }).format(product.price)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                {/* <p>{product.name}</p> */}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
