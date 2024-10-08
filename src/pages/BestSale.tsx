import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

type Product = {
  pro_id: number;
  name: string;
  image_product: string;
  price: number;
  price_sale: number;
};

const BestSale = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch dữ liệu từ db.json (khi sử dụng json-server hoặc endpoint tương tự)
    fetch("http://localhost:3000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Best Seller</h2>
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
              <SwiperSlide key={product.pro_id}>
                <li className="min-w-[300px]">
                  <a href={`/detail/${product.pro_id}`} className="group block overflow-hidden">
                    <img
                      src={product.image_product}
                      alt={product.name}
                      className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                    />
                    <div className="relative bg-white pt-3">
                      <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                        {product.name}
                      </h3>
                      <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>
                        <span className="tracking-wider text-gray-900">
                          ${product.price_sale}
                        </span>
                        <span className="text-gray-400 line-through ml-2">
                          ${product.price}
                        </span>
                      </p>
                    </div>
                  </a>
                  <div className="btn-add-to-carts">
                    <div className="Add to cart border border-[#d8d6d6] p-2 text-[#979292] mt-[20px]">
                      <a href="#" className="button">Add to cart</a>
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
