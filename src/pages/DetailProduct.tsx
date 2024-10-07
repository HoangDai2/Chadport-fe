import React from "react";
import bannerpage from "../img/bannerpage.png";
import imgdetail from "../img/AIR+JORDAN+1+LOW+SE+1.jpg";
type Props = {};

const DetailProduct = (props: Props) => {
  return (
    <>
      <div className="banners-page w-[100%] ">
        <img
          src={bannerpage}
          alt=""
          style={{ objectFit: "cover", width: "100vw" }}
        />
        <div
          className="tiltle-detail"
          style={{ position: "absolute", top: "230px", left: "650px" }}
        >
          <div
            className="tiltle text-white"
            style={{ fontFamily: "'Headland One', serif", fontSize: "60px" }}
          >
            <p>Detail</p>
          </div>
          <div className="breadcrumbs text-white flex gap-[3px]">
            <a href="index.html">Home</a>-<span className="delimiter"></span>
            <a href="shop-grid-left.html">Shop</a>-
            <span className="delimiter"></span>Nike Air Force 1 '07 LV8
          </div>
        </div>
      </div>

      {/* nội dung phần chi tiết sản phẩm */}

      <div className="product-top-info mt-[50px]">
        <div className="section-padding">
          <div className="section-container p-l-r">
            <div className="row">
              <div className="product-images col-lg-7 col-md-12 col-12">
                <div className="row">
                  <div className="col-md-2">
                    <div className="content-thumbnail-scroll">
                      <div
                        className="image-thumbnail slick-carousel slick-vertical"
                        data-asnavfor=".image-additional"
                        data-centermode="true"
                        data-focusonselect="true"
                        data-columns4="5"
                        data-columns3="4"
                        data-columns2="4"
                        data-columns1="4"
                        data-columns="4"
                        data-nav="true"
                        data-vertical='"true"'
                        data-verticalswiping='"true"'
                      >
                        <div className="img-item slick-slide">
                          <span className="img-thumbnail-scroll">
                            <img
                              width="600"
                              height="600"
                              src={imgdetail}
                              alt=""
                            />
                          </span>
                        </div>
                        <div className="img-item slick-slide">
                          <span className="img-thumbnail-scroll">
                            <img
                              width="600"
                              height="600"
                              src={imgdetail}
                              alt=""
                            />
                          </span>
                        </div>
                        <div className="img-item slick-slide">
                          <span className="img-thumbnail-scroll">
                            <img
                              width="600"
                              height="600"
                              src={imgdetail}
                              alt=""
                            />
                          </span>
                        </div>
                        <div className="img-item slick-slide">
                          <span className="img-thumbnail-scroll">
                            <img
                              width="600"
                              height="600"
                              src={imgdetail}
                              alt=""
                            />
                          </span>
                        </div>
                        <div className="img-item slick-slide">
                          <span className="img-thumbnail-scroll">
                            <img
                              width="600"
                              height="600"
                              src={imgdetail}
                              alt=""
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="scroll-image main-image">
                      <div
                        className="image-additional slick-carousel"
                        data-asnavfor=".image-thumbnail"
                        data-fade="true"
                        data-columns4="1"
                        data-columns3="1"
                        data-columns2="1"
                        data-columns1="1"
                        data-columns="1"
                        data-nav="true"
                      >
                        <div className="img-item slick-slide">
                          <img
                            width="900"
                            height="900"
                            src={imgdetail}
                            alt=""
                            title=""
                          />
                        </div>
                        <div className="img-item slick-slide">
                          <img
                            width="900"
                            height="900"
                            src="media/product/detail-img-2.png"
                            alt=""
                            title=""
                          />
                        </div>
                        <div className="img-item slick-slide">
                          <img
                            width="900"
                            height="900"
                            src="media/product/detail-img-3.png"
                            alt=""
                            title=""
                          />
                        </div>
                        <div className="img-item slick-slide">
                          <img
                            width="900"
                            height="900"
                            src="media/product/detail-img-4.jpg"
                            alt=""
                            title=""
                          />
                        </div>
                        <div className="img-item slick-slide">
                          <img
                            width="900"
                            height="900"
                            src="media/product/detail-img-5.png"
                            alt=""
                            title=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="product-info col-lg-5 col-md-12 col-12 ">
                <h1 className="title">Nike Air Force 1 '07 LV8</h1>
                <span className="price">
                  <del aria-hidden="true">
                    <span>$100.00</span>
                  </del>
                  <ins>
                    <span>$90.00</span>
                  </ins>
                </span>
                <div className="rating">
                  <div className="star star-5"></div>
                  <div className="review-count">
                    (3<span> reviews</span>)
                  </div>
                </div>
                <div className="description">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
                <div className="variations">
                  <table>
                    <tbody>
                      <tr>
                        <td className="label">Size</td>
                        <td className="attributes">
                          <ul className="text">
                            <li>
                              <span>L</span>
                            </li>
                            <li>
                              <span>M</span>
                            </li>
                            <li>
                              <span>S</span>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="label">Color</td>
                        <td className="attributes">
                          <ul className="colors">
                            <li>
                              <span className="color-1"></span>
                            </li>
                            <li>
                              <span className="color-2"></span>
                            </li>
                            <li>
                              <span className="color-3"></span>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="buttons">
                  <div className="add-to-cart-wrap">
                    <div className="quantity">
                      <button type="button" className="plus">
                        +
                      </button>
                      <input
                        type="number"
                        className="qty"
                        step="1"
                        min="0"
                        max=""
                        name="quantity"
                        value="1"
                        title="Qty"
                        size={4}
                        placeholder=""
                      />
                      <button type="button" className="minus">
                        -
                      </button>
                    </div>
                    <div className="btn-add-to-cart">
                      <a href="#" className="button">
                        Add to cart
                      </a>
                    </div>
                  </div>
                  <div className="btn-quick-buy" data-title="Wishlist">
                    <button className="product-btn">Buy It Now</button>
                  </div>
                  <div className="btn-wishlist" data-title="Wishlist">
                    <button className="product-btn">Add to wishlist</button>
                  </div>
                  <div className="btn-compare" data-title="Compare">
                    <button className="product-btn">Compare</button>
                  </div>
                </div>
                <div className="product-meta">
                  <span className="sku-wrapper">
                    SKU: <span className="sku">D2300-3-2-2</span>
                  </span>
                  <span className="posted-in">
                    Category:{" "}
                    <a href="shop-grid-left.html" rel="tag">
                      Furniture
                    </a>
                  </span>
                  <span className="tagged-as">
                    Tags:{" "}
                    <a href="shop-grid-left.html" rel="tag">
                      Hot
                    </a>
                    ,{" "}
                    <a href="shop-grid-left.html" rel="tag">
                      Trend
                    </a>
                  </span>
                </div>
                <div className="social-share">
                  <a
                    href="#"
                    title="Facebook"
                    className="share-facebook"
                    target="_blank"
                  >
                    <i className="fa fa-facebook"></i>Facebook
                  </a>
                  <a href="#" title="Twitter" className="share-twitter">
                    <i className="fa fa-twitter"></i>Twitter
                  </a>
                  <a href="#" title="Pinterest" className="share-pinterest">
                    <i className="fa fa-pinterest"></i>Pinterest
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
