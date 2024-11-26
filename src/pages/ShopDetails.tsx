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
                          <span className="price">
                            <del aria-hidden="true">
                              <span>${product.price}</span>
                            </del>
                            <ins>
                              <span>${product.price_sale}</span>
                            </ins>
                          </span>
                          <div className="rating">
                            <div className="star star-5" />
                            <div className="review-count">
                              (3<span> reviews</span>)
                            </div>
                          </div>
                          <div className="description text-left">
                            <p>{product.description}</p>
                          </div>
                          {/* Size selection */}
                          <div className="mb-3">
                            <label className="form-label">Size</label>
                            <div className="btn-group">
                              {/* Lọc ra các size duy nhất */}
                              {[
                                ...new Set(product.variants?.map((variant) => variant.size?.name).filter(Boolean)),
                              ].map((size) => (
                                <button
                                  key={size}
                                  className={`btn btn-outline-primary m-1 ${selectedSize === size ? "bg-primary text-white" : ""
                                    }`}
                                  onClick={() => handleSizeChange(size || "")}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                          {/* Color selection */}
                          <div className="mb-3">
                            <label className="form-label">Color</label>
                            <div className="btn-group">
                              {/* Lọc ra các màu duy nhất */}
                              {[
                                ...new Set(product.variants?.map((variant) => variant.color?.name).filter(Boolean)),
                              ].map((color) => {
                                const hex = product.variants?.find(
                                  (variant) => variant.color?.name === color
                                )?.color?.hex; // Lấy mã màu từ variant tương ứng
                                return (
                                  <button
                                    key={color}
                                    className="btn m-1"
                                    style={{
                                      backgroundColor: hex || "#ccc",
                                      borderColor: selectedColor === color ? "blue" : "#ccc", // Viền chỉ hiển thị khi chọn màu
                                      boxShadow: selectedColor === color ? "0 0 10px blue" : "none", // Tạo bóng khi chọn
                                    }}
                                    onClick={() => handleColorChange(color || "")}
                                  />
                                );
                              })}
                            </div>
                          </div>


                          <div className="buttons">
                            <div className="add-to-cart-wrap">
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
                              <div className="btn-add-to-cart">
                                <a
                                  onClick={() => {
                                    // Kiểm tra nếu chưa chọn size và color
                                    if (!selectedSize || !selectedColor) {
                                      alert("Please select size and color");
                                      return;
                                    }

                                    // Tìm variant phù hợp với size và color đã chọn
                                    const selectedVariant = product.variants?.find(
                                      (variant) =>
                                        variant.size?.name === selectedSize && variant.color?.hex === selectedColor
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
                                    key={relatedProduct.pro_id}
                                  >
                                    <div className="items">
                                      <div className="products-entry clearfix product-wapper">
                                        <div className="products-thumb">
                                          <div className="product-lable">
                                            <div className="hot">Hot</div>
                                          </div>
                                          <div className="product-thumb-hover">
                                            <a
                                              href={`/shop-details/${relatedProduct.pro_id}`}
                                            >
                                              <img
                                                width={600}
                                                height={600}
                                                src={
                                                  relatedProduct.image_product
                                                }
                                                className="post-image"
                                                alt={relatedProduct.name}
                                              />
                                              <img
                                                width={600}
                                                height={600}
                                                src={
                                                  relatedProduct.image_product
                                                }
                                                className="hover-image back"
                                                alt={relatedProduct.name}
                                              />
                                            </a>
                                          </div>
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
                                            <span className="price">
                                              ${relatedProduct.price}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
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
