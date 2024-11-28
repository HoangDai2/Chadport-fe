import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import TProduct from "../Types/TProduct";
import { toast, ToastContainer } from "react-toastify";
import apisphp from "../Service/api";
// import { addToCart } from "../Types/cartUtils";
// import { useDispatch } from 'react-redux';
// const dispatch = useDispatch();
// const handleAddToCart = (product: TProduct) => {
//   addToCart(product, dispatch);
// };
const Home = ({
  addToCart,
  addToWishlist,
}: {
  addToCart: (product: TProduct) => void;
  addToWishlist: (product: TProduct) => void;
}) => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apisphp.get("list/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      }
    };

    fetchProducts();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Hiển thị 4 sản phẩm
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="section section-padding">
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
      <div className="section-container">
        <div className="block-title">
          <h2>PRODUCTS</h2>
        </div>
        {/* <div className="block block-products">
          <div className="products-grid">
            {products.slice(0, 8).map((product) => (
              // console.log(product),
              <div
                key={product.id}
                className="group relative block overflow-hidden"
                style={{ border: "1px solid #e1dbdb" }}
                // onClick={() => goToProductDetail(product.id)} // Thêm sự kiện onClick để điều hướng
              >
                <button
                  onClick={() => addToWishlist(product)}
                  className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
                >
                  <span className="sr-only">Wishlist</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>

                <div className="h-64 w-full overflow-hidden sm:h-72">
                  <Link to={`/shop-details/${product.id}`}>
                    <img
                      src={`http://127.0.0.1:8000/storage/${product.image_product}`}
                      alt={product.name}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  </Link>
                </div>

                <div className="relative bg-white p-6">
                  <p className="text-gray-700">
                    ${product.price_sale}
                    <span className="text-gray-400 line-through">
                      ${product.price}
                    </span>
                  </p>

                  <h3 className="mt-1.5 text-lg font-medium text-gray-900 max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {product.name}
                  </h3>

                  <form className="mt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // Ngăn không cho sự kiện click vào product card xảy ra
                        // addToCart(product);
                      }}
                      className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                    >
                      Add to Cart
                    </button>

                    <Link
                      to={`/shop-details/${product.id}`}
                      type="button"
                      className="block w-full rounded bg-gray-900 px-4 py-4 text-sm font-medium text-white transition hover:scale-105"
                    >
                      Buy Now
                    </Link>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div> */}
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
                {products.map((product) => (
                  <div
                    className="item-product slick-slider-item"
                    key={product.id}
                  >
                    <div className="items">
                      <div className="products-entry clearfix product-wapper">
                        <div className="products-thumb">
                          <div className="product-lable">
                            <div className="hot">Hot</div>
                          </div>
                          <a href={`/shop-details/${product.id}`}>
                            <img
                              width={600}
                              height={600}
                              src={`http://127.0.0.1:8000/storage/${product.image_product}`}
                              className="post-image"
                              alt={product.name}
                            />
                          </a>
                          <div className="product-button">
                            <div
                              className="cart_default"
                              data-title="Add to cart"
                            >
                              <a
                                onClick={() => {
                                  addToCart(product);
                                }}
                                rel="nofollow"
                                // href="#"
                                className="product-btn"
                              >
                                Add to cart
                              </a>
                            </div>
                            <div className="" data-title="Wishlist">
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
                            <span
                              className="product-quickview"
                              data-title="Quick View"
                            >
                              <a
                                href="#"
                                className="quickview quickview-button"
                              >
                                Quick View <i className="icon-search" />
                              </a>
                            </span>
                          </div>
                        </div>
                        <div className="products-content">
                          <div className="contents text-center">
                            <h3 className="product-title">
                              <a
                                href={`/shop-details/${product.id}`}
                                className="block text-ellipsis overflow-hidden whitespace-nowrap max-w-xs"
                              >
                                {product.name}
                              </a>
                            </h3>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button className="slick-next" onClick={onClick}>
      →
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button className="slick-prev" onClick={onClick}>
      ←
    </button>
  );
};

export default Home;
