import React from "react";
import { useEffect, useState } from "react";
import instance from "../../Service";
import { useNavigate, useParams } from "react-router-dom";
import TProduct from "../../Types/TProduct";
import apisphp from "../../Service/api";
type Props = {};

const CategoriesClient = (props: Props) => {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  // Hàm lấy dữ liệu sản phẩm và danh mục từ API
  useEffect(() => {
    const fetchDataCategories = async () => {
      try {
        // đoạn này sẽ lấy sản phẩm thuộc danh mục
        const productResponse = await apisphp.get(`/products/category/${id}`);
        setProducts(productResponse.data.data);
        console.log(productResponse);

        //đoạn này sẽ lấy thông tin danh mục để hiển thị tên danh mục
        const categoryResponse = await apisphp.get(`/categories/${id}`);
        setCategoryName(categoryResponse.data.name);
        console.log(categoryResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchDataCategories();
    }
  }, [id]);

  const goToProductDetail = (id: number) => {
    navigate(`/shop-details/${id}`);
  };
  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div id="title" className="page-title">
              <div className="section-container">
                <div className="content-title-heading">
                  <h1 className="text-title-heading">{categoryName}</h1>
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
                          <ul className="products-list"></ul>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                      <div className="products-topbar clearfix">
                        <div className="products-topbar-left">
                          <div className="products-count">
                            Showing all results
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
                              {Array.isArray(products) &&
                              products.length === 0 ? (
                                <p>Không có sản phẩm nào</p>
                              ) : (
                                Array.isArray(products) &&
                                products.map((product) => {
                                  const maxLength = 25;
                                  const productName =
                                    product.name.length > maxLength
                                      ? product.name.substring(0, maxLength) +
                                        "..."
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
                                            <a>{productName}</a>
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
                                            <a
                                              href="#"
                                              className="add-to-compare"
                                            >
                                              <span className="icon-shuffle"></span>
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
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

export default CategoriesClient;
