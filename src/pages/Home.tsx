import React, { useEffect, useState } from "react";

// Định nghĩa cấu trúc của sản phẩm khớp với db.json
export interface Product {
  pro_id: number;
  name: string;
  image_product: string;
  price: number;
  price_sale: number;
}

const Home = () => {
  // Đặt state để lưu trữ danh sách sản phẩm
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch sản phẩm từ file db.json (hoặc từ API mock json-server)
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data)) // Đảm bảo dữ liệu trả về được cast về mảng Product
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <section className="section section-padding">
      <div className="section-container">
        {/* Block sản phẩm */}
        <div className="block block-products">
          <div className="block-title">
            <h2>PRODUCTS</h2>
          </div>
          <div className="products-grid">
            {/* Lặp qua danh sách sản phẩm */}
            {products.map((product) => (
              <a
                key={product.pro_id} // Dùng pro_id làm key
                href={`shop-details/${product.pro_id}`}
                className="group relative block overflow-hidden"
                style={{ border: "1px solid #e1dbdb" }}
              >
                <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
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
                  <img
                    src={product.image_product} // Hiển thị ảnh từ trường image_product
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="relative bg-white p-6">
                  <p className="text-gray-700">
                    ${product.price_sale} {/* Hiển thị giá sale */}
                    <span className="text-gray-400 line-through">${product.price}</span> {/* Giá gốc */}
                  </p>

                  <h3 className="mt-1.5 text-lg font-medium text-gray-900 max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {product.name} {/* Hiển thị tên sản phẩm */}
                  </h3>
                  <form className="mt-4 flex gap-4">
                    <button className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105">
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
