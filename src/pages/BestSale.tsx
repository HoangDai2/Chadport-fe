import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import TProduct from "../Types/TProduct";
import instance from "../Service";
import { Link } from "react-router-dom";

const BestSale = ({
  addToCart,
  addToWishlist,
}: {
  addToCart: (product: TProduct) => void;
  addToWishlist: (product: TProduct) => void;
}) => {
  const [products, setProducts] = useState<TProduct[]>([]);
  useEffect(() => {
    instance
      .get("products")
      .then((res) => res.data)
      .then((data: TProduct[]) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Best Seller
        </h2>
        <div className="relative mt-[30px]">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <li className="min-w-[300px]">
                  <button
                    onClick={() => addToWishlist(product)}
                    className="absolute end-0 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
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
                  <a
                    href={`shop-details/${product.id}`}
                    className="group block overflow-hidden"
                  >
                    <Link to={`shop-details/${product.id}`}>
                      <img
                        src={product.image_product}
                        alt={product.name}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="relative bg-white pt-3">
                      <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
                        {product.name}
                      </h3>
                      <p className="mt-2">
                        {/* <span className="sr-only"> Regular Price </span> */}
                        <span className="tracking-wider text-gray-900">
                          ${product.price_sale}
                        </span>
                        <span className="text-gray-400 line-through ml-2">
                          ${product.price}
                        </span>
                      </p>
                    </div>
                  </a>
                  <div className="btn-add-to-carts  flex justify-center items-center h-full mt-2">
                    <div className="block w-[50%] rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105">
                      <button
                        onClick={() => addToCart(product)}
                        className="button"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BestSale;
