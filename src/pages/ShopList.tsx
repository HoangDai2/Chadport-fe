import React from 'react';

// Import images
import airJordan1LowSe1 from '../media/product/AIR+JORDAN+1+LOW+SE+1.jpg';
// import airJordan1LowSe2 from '../media/product/AIR+JORDAN+1+LOW+SE+2.png';
import airJordan1MidSe1 from '../media/product/AIR+JORDAN+1+MID+SE+1.jpg';
import blazerPhantomLow1 from '../media/product/BLAZER+PHANTOM+LOW+1.png';

const ShopList: React.FC = () => {
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

                    {/* Block Product Filter */}
                    <div className="block block-product-filter">
                      <div className="block-title">
                        <h2>Price</h2>
                      </div>
                      <div className="block-content">
                        <div id="slider-range" className="price-filter-wrap">
                          <div className="filter-item price-filter">
                            <div className="layout-slider">
                              <input id="price-filter" name="price" value="0;100" />
                            </div>
                            <div className="layout-slider-settings"></div>
                          </div>
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
                          <li className="product-item">
                            <a href="shop-details.html" className="product-image">
                              <img src={airJordan1LowSe1} alt="AIR JORDAN 1 LOW SE" />
                            </a>
                            <div className="product-content">
                              <h2 className="product-title">
                                <a href="shop-details.html">AIR JORDAN 1 LOW SE</a>
                              </h2>
                              <div className="rating small">
                                <div className="star star-5"></div>
                              </div>
                              <span className="price">
                                <del aria-hidden="true"><span>$150.00</span></del>
                                <ins><span>$100.00</span></ins>
                              </span>
                            </div>
                          </li>
                          <li className="product-item">
                            <a href="shop-details.html" className="product-image">
                              <img src={airJordan1MidSe1} alt="AIR JORDAN 1 MID SE" />
                            </a>
                            <div className="product-content">
                              <h2 className="product-title">
                                <a href="shop-details.html">AIR JORDAN 1 MID SE</a>
                              </h2>
                              <div className="rating small">
                                <div className="star star-0"></div>
                              </div>
                              <span className="price">$120.00</span>
                            </div>
                          </li>
                          <li className="product-item">
                            <a href="shop-details.html" className="product-image">
                              <img src={blazerPhantomLow1} alt="BLAZER PHANTOM LOW 1" />
                            </a>
                            <div className="product-content">
                              <h2 className="product-title">
                                <a href="shop-details.html">BLAZER PHANTOM LOW 1</a>
                              </h2>
                              <div className="rating small">
                                <div className="star star-5"></div>
                              </div>
                              <span className="price">
                                <del aria-hidden="true"><span>$200.00</span></del>
                                <ins><span>$180.00</span></ins>
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-9 col-lg-9 col-md-12 col-12">
                    <div className="products-topbar clearfix">
                      <div className="products-topbar-left">
                        <div className="products-count">Showing all 21 results</div>
                      </div>
                      <div className="products-topbar-right">
                        <div className="products-sort dropdown">
                          <span className="sort-toggle dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                            Default sorting
                          </span>
                          <ul className="sort-list dropdown-menu" x-placement="bottom-start">
                            <li className="active"><a href="#">Default sorting</a></li>
                            <li><a href="#">Sort by popularity</a></li>
                            <li><a href="#">Sort by average rating</a></li>
                            <li><a href="#">Sort by latest</a></li>
                            <li><a href="#">Sort by price: low to high</a></li>
                            <li><a href="#">Sort by price: high to low</a></li>
                          </ul>
                        </div>
                        <ul className="layout-toggle nav nav-tabs">
                          <li className="nav-item">
                            <a className="layout-grid nav-link active" data-toggle="tab" href="#layout-grid" role="tab">
                              <span className="icon-column">
                                <span className="layer first"><span></span><span></span><span></span></span>
                                <span className="layer middle"><span></span><span></span><span></span></span>
                                <span className="layer last"><span></span><span></span><span></span></span>
                              </span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="layout-list nav-link" data-toggle="tab" href="#layout-list" role="tab">
                              <span className="icon-column">
                                <span className="layer first"><span></span><span></span></span>
                                <span className="layer middle"><span></span><span></span></span>
                                <span className="layer last"><span></span><span></span><span></span></span>
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="layout-grid" role="tabpanel">
                        <div className="products-list grid">
                          <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                              <div className="product-item">
                                <div className="product-image">
                                  <a href="shop-details.html">
                                    <img src={airJordan1LowSe1} alt="AIR JORDAN 1 LOW SE" />
                                  </a>
                                </div>
                                <div className="products-content">
                                  <h2 className="product-title">
                                    <a href="shop-details.html">AIR JORDAN 1 LOW SE</a>
                                  </h2>
                                  <div className="rating small">
                                    <div className="star star-5"></div>
                                  </div>
                                  <span className="price">
                                    <del aria-hidden="true"><span>$150.00</span></del>
                                    <ins><span>$100.00</span></ins>
                                  </span>
                                  <div className="product-action">
                                    <a href="#" className="add-to-cart">
                                      <span className="icon-cart"></span>
                                    </a>
                                    <a href="#" className="add-to-wishlist">
                                      <span className="icon-heart"></span>
                                    </a>
                                    <a href="#" className="add-to-compare">
                                      <span className="icon-shuffle"></span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* More products go here */}
                          </div>
                        </div>
                      </div>
                      {/* List layout tab can be added here */}
                    </div>

                    <div className="pagination-wrapper clearfix">
                      <nav className="navigation pagination">
                        <div className="nav-links">
                          <a className="page-numbers prev" href="#">«</a>
                          <a className="page-numbers" href="#">1</a>
                          <span aria-current="page" className="page-numbers current">2</span>
                          <a className="page-numbers" href="#">3</a>
                          <a className="page-numbers" href="#">4</a>
                          <a className="page-numbers next" href="#">»</a>
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
