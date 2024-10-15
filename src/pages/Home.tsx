import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import TProduct from "../Types/TProduct";
import { ToastContainer } from "react-toastify";

const Home = ({
  addToCart,
  addToWishlist,
}: {
  addToCart: (product: TProduct) => void;
  addToWishlist: (product: TProduct) => void;
}) => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data: TProduct[]) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Hàm để thêm sản phẩm vào giỏ hàng và lưu vào localStorage
  // const addToCart = (product: TProduct) => {
  //   let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  //   cart.push(product);
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   alert(`${product.name} has been added to your cart!`);
  // };

  // Hàm chuyển hướng đến trang chi tiết sản phẩm

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
        <div className="block block-products">
          <div className="block-title">
            <h2>PRODUCTS</h2>
          </div>
          <div className="products-grid">
            {products.map((product) => (
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
                      src={product.image_product}
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
                        addToCart(product);
                      }}
                      className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                    >
                      Buy Now
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
