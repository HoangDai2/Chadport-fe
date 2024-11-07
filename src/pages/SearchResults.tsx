import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TProduct from "../Types/TProduct";
import apisphp from "../Service/api";
type Props = {};

const SearchResults = (props: Props) => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  // lấy dữ liệu sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apisphp.get("/list/products");
        setProducts(response.data.data);
        console.log(response);
      } catch (error) {
        console.error("lỗi get products:", error);
      }
    };

    fetchProducts();
  }, []);

  // hàm này sẽ xử lí lọc tự khóa tìm kiếm và cho ra kết quả khớp với từ khóa mà người dùng tìm
  useEffect(() => {
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [query, products]);

  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div id="title" className="page-title">
              <div className="section-container">
                <div className="content-title-heading">
                  <h1 className="text-title-heading">
                    Kết quả tìm kiếm cho: "{query}"
                  </h1>
                </div>
                <div className="breadcrumbs">
                  <a href="index.html">Home</a>
                  <span className="delimiter"></span>
                  <a href="shop-grid-left.html">ShopList</a>
                  <span className="delimiter"></span>
                  {query}
                </div>
              </div>
            </div>

            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-12 sidebar left-sidebar md-b-50">
                      {/* Block Product Categories */}
                      <div className="block block-product-cats">
                        <div className="block-title">
                          <h2>Brand</h2>
                        </div>
                        <div className="block-content">
                          <div className="product-cats-list">
                            <ul>
                              <li className="current">
                                <a href="shop-grid-left.html">
                                  Nike <span className="count">9</span>
                                </a>
                              </li>
                              <li>
                                <a href="shop-grid-left.html">
                                  Adidas <span className="count">4</span>
                                </a>
                              </li>
                              <li>
                                <a href="shop-grid-left.html">
                                  Balenciaga <span className="count">3</span>
                                </a>
                              </li>
                              <li>
                                <a href="shop-grid-left.html">
                                  Puma <span className="count">6</span>
                                </a>
                              </li>
                              <li>
                                <a href="shop-grid-left.html">
                                  Converse <span className="count">2</span>
                                </a>
                              </li>
                              <li>
                                <a href="shop-grid-left.html">
                                  Vans <span className="count">4</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                      <div className="products-topbar clearfix">
                        <div className="products-topbar-left">
                          <div className="products-count">
                            Showing all results for "{query}"
                          </div>
                        </div>
                      </div>

                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="layout-grid"
                          role="tabpanel"
                        >
                          <div className="products-list grid">
                            <div className="row">
                              {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                  <div
                                    key={product.id}
                                    className="col-xl-4 col-lg-4 col-md-6 col-12 product-item"
                                  >
                                    <div className="product-item-content">
                                      <img
                                        src={product.image_product}
                                        alt={product.name}
                                        className="w-100 h-auto"
                                      />
                                      <p>{product.name}</p>
                                      <p>₫{product.price}</p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p>Không tìm thấy sản phẩm nào.</p>
                              )}
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

export default SearchResults;
