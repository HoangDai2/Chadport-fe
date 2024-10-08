import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import imgSP from "../img/AIR+JORDAN+1+LOW+SE+1.jpg";
import "swiper/css";
import "swiper/css/navigation";

type Props = {};

const BetsSale = (props: Props) => {
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
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {[...Array(6)].map((_, index) => (
              <SwiperSlide key={index}>
                <li className="min-w-[300px]">
                  <a href="/detail" className="group block overflow-hidden">
                    <img
                      src={imgSP}
                      alt=""
                      className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                    />
                    <div className="relative bg-white pt-3">
                      <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                        Basic Tee
                      </h3>
                      <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>
                        <span className="tracking-wider text-gray-900">
                          £24.00 GBP
                        </span>
                      </p>
                    </div>
                  </a>
                  <div className="btn-add-to-carts">
                    <div className="Add to cart border border-[#d8d6d6] p-2 text-[#979292] mt-[20px]">
                      <a href="#" className="button">
                        Add to cart
                      </a>
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

export default BetsSale;
