import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TProduct from "../Types/TProduct";

const ShopDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<TProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<TProduct[]>([]);

  // interface Product {
  //   id: number;
  //   title: string;
  //   price: number;
  //   description: string;
  //   category: string;
  //   image: string;
  //   rating: {
  //     rate: number;
  //     count: number;
  //   };
  // }

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);
  // Fetch danh sách sản phẩm liên quan
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data))
      // .then(() => console.log(relatedProducts))
      .catch((error) =>
        console.error("Error fetching related products:", error)
      );
  }, []);
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div id="primary" className="content-area">
            <div id="title" className="page-title">
              <div className="section-container">
                <div className="content-title-heading">
                  <h1 className="text-title-heading">{product.title}</h1>
                </div>
                <div className="breadcrumbs">
                  <a href="index.html">Home</a>
                  <span className="delimiter" />
                  <a href="shop-grid-left.html">Shop</a>
                  <span className="delimiter" />
                  {product.title}
                </div>
              </div>
            </div>
            <div id="content" className="site-content" role="main">
              <div
                className="shop-details "
                data-product_layout_thumb="scroll"
                data-zoom_scroll="true"
                data-zoom_contain_lens="true"
                data-zoomtype="inner"
                data-lenssize={200}
                data-lensshape="square"
                data-lensborder
                data-bordersize={2}
                data-bordercolour="#f9b61e"
                data-popup="false"
              >
                <div className="product-top-info">
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
                                  data-columns4={5}
                                  data-columns3={4}
                                  data-columns2={4}
                                  data-columns1={4}
                                  data-columns={4}
                                  data-nav="true"
                                  data-vertical='"true"'
                                  data-verticalswiping='"true"'
                                >
                                  <div className="img-item slick-slide">
                                    <span className="img-thumbnail-scroll">
                                      <img
                                        width={600}
                                        height={600}
                                        src={product.image_product}
                                      />
                                    </span>
                                  </div>
                                  <div className="img-item slick-slide">
                                    <span className="img-thumbnail-scroll">
                                      <img
                                        width={600}
                                        height={600}
                                        src={product.image_product}
                                      />
                                    </span>
                                  </div>
                                  <div className="img-item slick-slide">
                                    <span className="img-thumbnail-scroll">
                                      <img
                                        width={600}
                                        height={600}
                                        src={product.image_product}
                                      />
                                    </span>
                                  </div>
                                  <div className="img-item slick-slide">
                                    <span className="img-thumbnail-scroll">
                                      <img
                                        width={600}
                                        height={600}
                                        src={product.image_product}
                                      />
                                    </span>
                                  </div>
                                  <div className="img-item slick-slide">
                                    <span className="img-thumbnail-scroll">
                                      <img
                                        width={600}
                                        height={600}
                                        src={product.image_product}
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-10">
                              <div className="scroll-image main-image">
                                <div className="scroll-image main-image">
                                  <img
                                    src={product.image_product}
                                    width={900}
                                    height={900}
                                    alt={product.title}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="product-info col-lg-5 col-md-12 col-12 ">
                          <h1 className="title">{product.title}</h1>
                          <span className="price">
                            <del aria-hidden="true">
                              <span>${product.price}</span>
                            </del>
                            <ins>
                              <span>${product.price}</span>
                            </ins>
                          </span>
                          <div className="rating">
                            <div className="star star-5" />
                            <div className="review-count">
                              (3<span> reviews</span>)
                            </div>
                          </div>
                          <div className="description">
                            <p>{product.description}</p>
                          </div>
                          <div className="variations">
                            <table cellSpacing={0}>
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
                                        <span className="color-1" />
                                      </li>
                                      <li>
                                        <span className="color-2" />
                                      </li>
                                      <li>
                                        <span className="color-3" />
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
                                  step={1}
                                  min={0}
                                  name="quantity"
                                  defaultValue={1}
                                  title="Qty"
                                  size={4}
                                  inputMode="numeric"
                                  autoComplete="off"
                                />
                                <button type="button" className="minus">
                                  -
                                </button>
                              </div>
                              <div className="btn-add-to-cart">
                                <a
                                  href="/shopcart"
                                  className="button"
                                  tabIndex={0}
                                >
                                  Add to cart
                                </a>
                              </div>
                            </div>
                            <div
                              className="btn-quick-buy"
                              data-title="Wishlist"
                            >
                              <button className="product-btn">
                                Buy It Now
                              </button>
                            </div>
                            <div className="btn-wishlist" data-title="Wishlist">
                              <button className="product-btn">
                                Add to wishlist
                              </button>
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
                              <i className="fa fa-facebook" />
                              Facebook
                            </a>
                            <a
                              href="#"
                              title="Twitter"
                              className="share-twitter"
                            >
                              <i className="fa fa-twitter" />
                              Twitter
                            </a>
                            <a
                              href="#"
                              title="Pinterest"
                              className="share-pinterest"
                            >
                              <i className="fa fa-pinterest" />
                              Pinterest
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-tabs">
                  <div className="section-padding">
                    <div className="section-container p-l-r">
                      <div className="product-tabs-wrap">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#description"
                              role="tab"
                            >
                              Description
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#additional-information"
                              role="tab"
                            >
                              Additional information
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#reviews"
                              role="tab"
                            >
                              Reviews (1)
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div
                            className="tab-pane fade show active"
                            id="description"
                            role="tabpanel"
                          >
                            <p>{product.description}</p>
                            <p>
                              Nemo enim ipsam voluptatem quia voluptas sit
                              aspernatur aut odit aut fugit, sed quia
                              consequuntur magni dolores eos qui ratione
                              voluptatem sequi nesciunt. Neque porro quisquam
                              est, qui dolorem ipsum quia dolor sit amet,
                              consectetur, adipisci velit, sed quia non numquam
                              eius modi tempora incidunt ut labore et dolore
                              magnam aliquam quaerat voluptatem.
                            </p>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="additional-information"
                            role="tabpanel"
                          >
                            <table className="product-attributes">
                              <tbody>
                                <tr className="attribute-item">
                                  <th className="attribute-label">Color</th>
                                  <td className="attribute-value">
                                    Black, Blue, Green
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="reviews"
                            role="tabpanel"
                          >
                            <div id="reviews" className="product-reviews">
                              <div id="comments">
                                <h2 className="reviews-title">
                                  1 review for{" "}
                                  <span>Nike Air Force 1 '07 LV8</span>
                                </h2>
                                <ol className="comment-list">
                                  <li className="review">
                                    <div className="content-comment-container">
                                      <div className="comment-container">
                                        <img
                                          src="media/user.jpg"
                                          className="avatar"
                                          height={60}
                                          width={60}
                                        />
                                        <div className="comment-text">
                                          <div className="rating small">
                                            <div className="star star-5" />
                                          </div>
                                          <div className="review-author">
                                            Peter Capidal
                                          </div>
                                          <div className="review-time">
                                            January 12, 2022
                                          </div>
                                        </div>
                                      </div>
                                      <div className="description">
                                        <p>good</p>
                                      </div>
                                    </div>
                                  </li>
                                </ol>
                              </div>
                              <div id="review-form">
                                <div id="respond" className="comment-respond">
                                  <span
                                    id="reply-title"
                                    className="comment-reply-title"
                                  >
                                    Add a review
                                  </span>
                                  <form
                                    action="#"
                                    method="post"
                                    id="comment-form"
                                    className="comment-form"
                                  >
                                    <p className="comment-notes">
                                      <span id="email-notes">
                                        Your email address will not be
                                        published.
                                      </span>{" "}
                                      Required fields are marked{" "}
                                      <span className="required">*</span>
                                    </p>
                                    <div className="comment-form-rating">
                                      <label htmlFor="rating">
                                        Your rating
                                      </label>
                                      <p className="stars">
                                        <span>
                                          <a className="star-1" href="#">
                                            1
                                          </a>
                                          <a className="star-2" href="#">
                                            2
                                          </a>
                                          <a className="star-3" href="#">
                                            3
                                          </a>
                                          <a className="star-4" href="#">
                                            4
                                          </a>
                                          <a className="star-5" href="#">
                                            5
                                          </a>
                                        </span>
                                      </p>
                                    </div>
                                    <p className="comment-form-comment">
                                      <textarea
                                        id="comment"
                                        name="comment"
                                        placeholder="Your Reviews *"
                                        cols={45}
                                        rows={8}
                                        aria-required="true"
                                        required
                                        defaultValue={""}
                                      />
                                    </p>
                                    <div className="content-info-reviews">
                                      <p className="comment-form-author">
                                        <input
                                          id="author"
                                          name="author"
                                          placeholder="Name *"
                                          type="text"
                                          defaultValue={""}
                                          size={30}
                                          aria-required="true"
                                          required
                                        />
                                      </p>
                                      <p className="comment-form-email">
                                        <input
                                          id="email"
                                          name="email"
                                          placeholder="Email *"
                                          type="email"
                                          defaultValue={""}
                                          size={30}
                                          aria-required="true"
                                          required
                                        />
                                      </p>
                                      <p className="form-submit">
                                        <input
                                          name="submit"
                                          type="submit"
                                          id="submit"
                                          className="submit"
                                          defaultValue="Submit"
                                        />
                                      </p>
                                    </div>
                                  </form>
                                  {/* #respond */}
                                </div>
                              </div>
                              <div className="clear" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Related Products */}
                {/* {console.log(product)} */}
                <div className="product-related">
                  <div className="section-padding">
                    <div className="section-container p-l-r">
                      <div className="block block-products slider">
                        <div className="block-title">
                          <h2>Related Products</h2>
                        </div>
                        <div className="block-content">
                          <div className="content-product-list slick-wrap">
                            <div
                              className="products-list grid"
                              data-slidestoscroll="true"
                              data-dots="false"
                              data-nav={1}
                              data-columns4={1}
                              data-columns3={2}
                              data-columns2={3}
                              data-columns1={3}
                              data-columns1440={4}
                              data-columns={4}
                            >
                              <div className="slick-sliders">
                                {relatedProducts.map((relatedProduct) => (
                                  <div
                                    className="item-product slick-slider-item"
                                    key={relatedProduct.id}
                                  >
                                    <div className="items">
                                      <div className="products-entry clearfix product-wapper">
                                        <div className="products-thumb">
                                          <div className="product-lable">
                                            <div className="hot">Hot</div>
                                          </div>
                                          <div className="product-thumb-hover">
                                            <a
                                              href={`/shop-details/${relatedProduct.id}`}
                                            >
                                              <img
                                                width={600}
                                                height={600}
                                                src={
                                                  relatedProduct.image_product
                                                }
                                                className="post-image"
                                                alt={relatedProduct.title}
                                              />
                                              <img
                                                width={600}
                                                height={600}
                                                src={
                                                  relatedProduct.image_product
                                                }
                                                className="hover-image back"
                                                alt={relatedProduct.title}
                                              />
                                            </a>
                                          </div>
                                          <div className="product-button">
                                            <div
                                              className="cart_default"
                                              data-title="Add to cart"
                                            >
                                              <a
                                                rel="nofollow"
                                                href="#"
                                                className="product-btn"
                                              >
                                                Add to cart
                                              </a>
                                            </div>
                                            <div
                                              className=""
                                              data-title="Wishlist"
                                            >
                                              <button className="product-btn">
                                                Add to wishlist
                                              </button>
                                            </div>
                                            <div
                                              className="btn-compare"
                                              data-title="Compare"
                                            >
                                              <button className="product-btn">
                                                Compare
                                              </button>
                                            </div>
                                            <span
                                              className="product-quickview"
                                              data-title="Quick View"
                                            >
                                              <a
                                                href="#"
                                                className="quickview quickview-button"
                                              >
                                                Quick View{" "}
                                                <i className="icon-search" />
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                        <div className="products-content">
                                          <div className="contents text-center">
                                            <h3 className="product-title">
                                              <a
                                                href={`/shop-details/${relatedProduct.id}`}
                                              >
                                                {relatedProduct.title}
                                              </a>
                                            </h3>
                                            <div className="rating">
                                              <div className="star star-5" />
                                            </div>
                                            <span className="price">
                                              ${relatedProduct.price}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
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
      </div>
    </>
  );
};

export default ShopDetails;
