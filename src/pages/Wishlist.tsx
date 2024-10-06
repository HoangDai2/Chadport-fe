import React from "react";

const Wishlist = () => {
  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div id="title" className="page-title">
              <div className="section-container">
                <div className="content-title-heading">
                  <h1 className="text-title-heading">Wishlist</h1>
                </div>
                <div className="breadcrumbs">
                  <a href="index.html">Home</a>
                  <span className="delimiter" />
                  <a href="shop-grid-left.html">Shop</a>
                  <span className="delimiter" />
                  Shopping Cart
                </div>
              </div>
            </div>
            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">
                  <div className="shop-wishlist">
                    <table className="wishlist-items">
                      <tbody>
                        <tr className="wishlist-item">
                          <td className="wishlist-item-remove">
                            <span />
                          </td>
                          <td className="wishlist-item-image">
                            <a href="shop-details.html">
                              <img
                                width={600}
                                height={600}
                                src="media/product/W+NIKE+V2K+RUN+XX+1.png"
                                alt=""
                              />
                            </a>
                          </td>
                          <td className="wishlist-item-info">
                            <div className="wishlist-item-name">
                              <a href="shop-details.html">
                                AIR JORDAN 1 LOW SE
                              </a>
                            </div>
                            <div className="wishlist-item-price">
                              <span>$150.00</span>
                            </div>
                            <div className="wishlist-item-time">
                              June 6, 2022
                            </div>
                          </td>
                          <td className="wishlist-item-actions">
                            <div className="wishlist-item-stock">In stock</div>
                            <div className="wishlist-item-add">
                              <div className="" data-title="Add to cart">
                                <a
                                  rel="nofollow"
                                  href="#"
                                  className="product-btn button"
                                >
                                  Add to cart
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="wishlist-item">
                          <td className="wishlist-item-remove">
                            <span />
                          </td>
                          <td className="wishlist-item-image">
                            <a href="shop-details.html">
                              <img
                                width={600}
                                height={600}
                                src="media/product/AIR+JORDAN+1+LOW+SE+2.png"
                                alt=""
                              />
                            </a>
                          </td>
                          <td className="wishlist-item-info">
                            <div className="wishlist-item-name">
                              <a href="shop-details.html">
                                AIR JORDAN 1 LOW SE
                              </a>
                            </div>
                            <div className="wishlist-item-price">
                              <del aria-hidden="true">
                                <span>$150.00</span>
                              </del>
                              <ins>
                                <span>$100.00</span>
                              </ins>
                            </div>
                            <div className="wishlist-item-time">
                              June 6, 2022
                            </div>
                          </td>
                          <td className="wishlist-item-actions">
                            <div className="wishlist-item-stock">In stock</div>
                            <div className="wishlist-item-add">
                              <div className="" data-title="Add to cart">
                                <a
                                  rel="nofollow"
                                  href="#"
                                  className="product-btn button"
                                >
                                  Add to cart
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* #content */}
          </div>
          {/* #primary */}
        </div>
        {/* #main-content */}
      </div>
    </>
  );
};

export default Wishlist;
