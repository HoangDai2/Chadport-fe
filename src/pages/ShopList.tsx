import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TProduct from "../Types/TProduct";
import apisphp from "../Service/api";

const ShopList = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [sortOption, setSortOption] = useState<string>("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch product data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apisphp.get(`shop/products?page=${currentPage}`);
        setProducts(response.data.data); // Sản phẩm trên trang hiện tại
        setTotalPages(response.data.last_page); // Tổng số trang
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  // Điều hướng đến trang chi tiết sản phẩm
  const goToProductDetail = (id: number) => {
    navigate(`/shop-details/${id}`);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Sắp xếp sản phẩm
  const sortProducts = (option: string) => {
    let sortedProducts = [...products];

    switch (option) {
      case "price-low-to-high":
        sortedProducts.sort((a, b) => a.price_sale - b.price_sale);
        break;
      case "price-high-to-low":
        sortedProducts.sort((a, b) => b.price_sale - a.price_sale);
        break;
      default:
        sortedProducts = products; // Sắp xếp mặc định
    }

    setProducts(sortedProducts);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    sortProducts(option);
  };

  // Xử lý phân trang
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
                <a href="/">Home</a>
                <span className="delimiter"></span>
                <a href="/shop-grid-left">ShopList</a>
                <span className="delimiter"></span>Nike
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="row">
                  {/* Sidebar: Brand and Feature Product */}
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
                              <a href="#">
                                Nike <span className="count">9</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Adidas <span className="count">4</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Balenciaga <span className="count">3</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Puma <span className="count">6</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Converse <span className="count">2</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Vans <span className="count">4</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* sản phẩm sidebar */}
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
                                  src={`http://127.0.0.1:8000/storage/${product.image_product}`}
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
                                <span className="price flex justify-center items-center space-x-6 ">
                                  <del className="text-sm text-gray-500 ">
                                    <span style={{ fontSize: "10px" }}>
                                      {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(product.price)}
                                    </span>
                                  </del>

                                  <ins className="text-2xl font-bold text-red-600">
                                    <span
                                      style={{
                                        fontSize: "15px",
                                        color: "#d63838",
                                      }}
                                    >
                                      {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(product.price_sale)}
                                    </span>
                                  </ins>
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Main Content: Product List */}
                  <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                    <div className="products-topbar clearfix">
                      <div className="products-topbar-left">
                        <div className="products-count">
                          Showing page {currentPage} of {totalPages}
                        </div>
                      </div>
                      <div className="products-topbar-right">
                        <div className="products-sort dropdown">
                          <span
                            className="sort-toggle dropdown-toggle"
                            onClick={toggleDropdown}
                          >
                            {sortOption === "default"
                              ? "Default sorting"
                              : sortOption}
                          </span>
                          <ul
                            className={`sort-list dropdown-menu ${
                              isDropdownOpen ? "show" : "hide"
                            }`}
                          >
                            <li
                              className={
                                sortOption === "default" ? "active" : ""
                              }
                              onClick={() => handleSortChange("default")}
                            >
                              <a href="#">Default sorting</a>
                            </li>
                            <li
                              className={
                                sortOption === "price-low-to-high"
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                handleSortChange("price-low-to-high")
                              }
                            >
                              <a href="#">Price: Low to High</a>
                            </li>
                            <li
                              className={
                                sortOption === "price-high-to-low"
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                handleSortChange("price-high-to-low")
                              }
                            >
                              <a href="#">Price: High to Low</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Product list */}
                    <div className="products-list grid">
                      <div className="row">
                        {products.map((product) => (
                          <div
                            key={product.id}
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-6"
                          >
                            <div className="product-item relative">
                              <div className="product-image">
                                <a
                                  onClick={() => goToProductDetail(product.id)}
                                >
                                  <img
                                    src={`http://127.0.0.1:8000/storage/${product.image_product}`}
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
                                    className="block text-ellipsis overflow-hidden whitespace-nowrap max-w-xs"
                                  >
                                    {product.name}
                                  </a>
                                </h2>

                                {/* Giá và giảm giá */}
                                <span className="price flex flex-col items-start space-y-2 text-left">
                                  <ins
                                    className="text-2xl font-bold text-red-600"
                                    style={{ color: "#d63838" }}
                                  >
                                    <span style={{ fontSize: "25px" }}>
                                      {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(product.price_sale)}
                                    </span>
                                  </ins>
                                  <del className="text-sm text-gray-500">
                                    <span style={{ fontSize: "15px" }}>
                                      {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(product.price)}
                                    </span>
                                  </del>
                                </span>
                              </div>

                              {/* Hiển thị % giảm giá  */}
                              <div className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 text-xs font-bold">
                                {product.price && product.price_sale && (
                                  <span>
                                    {Math.round(
                                      ((product.price - product.price_sale) /
                                        product.price) *
                                        100
                                    )}
                                    %
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center mt-4">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                          <li
                            className={`page-item ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link rounded-pill shadow-sm"
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>
                          </li>
                          {Array.from({ length: totalPages }, (_, index) => (
                            <li
                              key={index}
                              className={`page-item ${
                                currentPage === index + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link rounded-pill shadow-sm"
                                onClick={() => handlePageChange(index + 1)}
                              >
                                {index + 1}
                              </button>
                            </li>
                          ))}
                          <li
                            className={`page-item ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link rounded-pill shadow-sm"
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
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
