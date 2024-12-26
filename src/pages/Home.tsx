import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import TProduct from "../Types/TProduct";
import { toast, ToastContainer } from "react-toastify";
import apisphp from "../Service/api";
import { useLoading } from "./Loadings/LoadinfContext";
// import { addToCart } from "../Types/cartUtils";
// import { useDispatch } from 'react-redux';
// const dispatch = useDispatch();
// const handleAddToCart = (product: TProduct) => {
//   addToCart(product, dispatch);
// };
import NProgress from "nprogress"; // Import NProgress
import "nprogress/nprogress.css"; // Import CSS NProgress
const Home = ({
  addToWishlist,
}: {
  addToWishlist: (product: TProduct) => void;
}) => {
  const { startLoading, stopLoading } = useLoading();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Thêm trạng thái loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      startLoading();
      try {
        setLoading(true); // Bắt đầu loading
        NProgress.start(); // Hiển thị thanh loading trên đầu trang

        const response = await apisphp.get("list/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      } finally {
        stopLoading();
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
