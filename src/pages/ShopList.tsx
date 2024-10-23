import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TProduct from "../Types/TProduct";
const ShopList = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const navigate = useNavigate();

  // Fetch product data from API
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data: TProduct[]) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Navigate to product detail page
  const goToProductDetail = (id: number) => {
    navigate(`/shop-details/${id}`);
  };

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">Shop_List</h1>
              </div>
              <div className="breadcrumbs">
                <a href="index.html">Home</a>
                <span className="delimiter"></span>
                <a href="shop-grid-left.html">ShopList</a>
                <span className="delimiter"></span>Nike
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

                    {/* Block Products */}
                    <div className="block block-products">
                      <div className="block-title">
                        <h2>Feature Product</h2>
                      </div>
                      <div className="block-content">
                        <ul className="products-list">
                          {products.slice(0, 3).map((product) => (
                            <li key={product.id} className="product-item">
                              <a
                                onClick={() => goToProductDetail(product.id)}
                                className="product-image"
                              >
                                <img
                                  src={product.image_product}
                                  alt={product.name}
                                />
                              </a>
                              <div className="product-content">
                                <h2 className="product-title">
                                  <a
                                    onClick={() =>
                                      goToProductDetail(product.id)
                                    }
                                  >
                                    {product.name}
                                  </a>
                                </h2>
                                <span className="price">
                                  <del aria-hidden="true">
                                    <span>${product.price}</span>
                                  </del>
                                  <ins>
                                    <span>${product.price_sale}</span>
                                  </ins>
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                    <div className="products-topbar clearfix">
                      <div className="products-topbar-left">
                        <div className="products-count">
                          Showing all {products.length} results
                        </div>
                      </div>
                      <div className="products-topbar-right">
                        <div className="products-sort dropdown">
                          <span
                            className="sort-toggle dropdown-toggle"
                            data-toggle="dropdown"
                            aria-expanded="true"
                          >
                            Default sorting
                          </span>
                          <ul
                            className="sort-list dropdown-menu"
                            x-placement="bottom-start"
                          >
                            <li className="active">
                              <a href="#">Default sorting</a>
                            </li>
                            <li>
                              <a href="#">Sort by popularity</a>
                            </li>
                            <li>
                              <a href="#">Sort by average rating</a>
                            </li>
                            <li>
                              <a href="#">Sort by latest</a>
                            </li>
                            <li>
                              <a href="#">Sort by price: low to high</a>
                            </li>
                            <li>
                              <a href="#">Sort by price: high to low</a>
                            </li>
                          </ul>
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
                            {products.map((product) => {
                              // Giới hạn độ dài tên sản phẩm
                              const maxLength = 25;
                              const productName =
                                product.name.length > maxLength
                                  ? product.name.substring(0, maxLength) + "..."
                                  : product.name;

                              return (
                                <div
                                  key={product.id}
                                  className="col-xl-4 col-lg-4 col-md-4 col-sm-6"
                                >
                                  <div className="product-item">
                                    <div className="product-image">
                                      <a
                                        onClick={() =>
                                          goToProductDetail(product.id)
                                        }
                                      >
                                        <img
                                          src={product.image_product}
                                          alt={product.name}
                                        />
                                      </a>
                                    </div>
                                    <div className="products-content">
                                      <h2 className="product-title">
                                        <a
                                          onClick={() =>
                                            goToProductDetail(product.id)
                                          }
                                        >
                                          {productName}
                                        </a>
                                      </h2>
                                      <span className="price">
                                        <del aria-hidden="true">
                                          <span>${product.price}</span>
                                        </del>
                                        <ins>
                                          <span>${product.price_sale}</span>
                                        </ins>
                                      </span>
                                      <div className="product-action">
                                        <a href="#" className="add-to-cart">
                                          <span className="icon-cart"></span>
                                        </a>

                                        <a href="#" className="add-to-compare">
                                          <span className="icon-shuffle"></span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pagination-wrapper clearfix">
                      <nav className="navigation pagination">
                        <div className="nav-links">
                          <a className="page-numbers prev" href="#">
                            «
                          </a>
                          <a className="page-numbers" href="#">
                            1
                          </a>
                          <span
                            aria-current="page"
                            className="page-numbers current"
                          >
                            2
                          </span>
                          <a className="page-numbers" href="#">
                            3
                          </a>
                          <a className="page-numbers" href="#">
                            4
                          </a>
                          <a className="page-numbers next" href="#">
                            »
                          </a>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopList;
