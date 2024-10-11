import React, { useEffect, useState } from "react";
import TProduct from "../Types/TProduct";
import { ToastContainer } from "react-toastify";

const Wishlist = ({
  addToCart,
}: {
  addToCart: (product: TProduct) => void;
}) => {
  const [wishlist, setWishlist] = useState<TProduct[]>([]);
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
  }, []);
  const removeFromWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <ToastContainer
            theme="light"
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
          />
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
                  Wishlist
                </div>
              </div>
            </div>
            <div id="content" className="site-content" role="main">
              <div className="section-padding">
                <div className="section-container p-l-r">
                  {wishlist.length > 0 ? (
                    <div className="shop-wishlist">
                      <table className="wishlist-items">
                        <tbody>
                          {wishlist.map((product) => (
                            <tr key={product.id} className="wishlist-item">
                              <td className="wishlist-item-remove">
                                <button
                                  onClick={() => removeFromWishlist(product.id)}
                                >
                                  <span role="img" aria-label="Remove">
                                    ❌
                                  </span>
                                </button>
                              </td>
                              <td className="wishlist-item-image">
                                <a href={`shop-details/${product.id}`}>
                                  <img
                                    width={600}
                                    height={600}
                                    src={product.image_product}
                                    alt={product.name}
                                  />
                                </a>
                              </td>
                              <td className="wishlist-item-info">
                                <div className="wishlist-item-name">
                                  <a href={`shop-details/${product.id}`}>
                                    {product.name}
                                  </a>
                                </div>
                                <div className="wishlist-item-price">
                                  <del aria-hidden="true">
                                    <span>${product.price}</span>
                                  </del>
                                  <ins>
                                    <span>${product.price_sale}</span>
                                  </ins>
                                </div>
                              </td>
                              <td className="wishlist-item-actions">
                                <div className="wishlist-item-stock">
                                  In stock
                                </div>
                                <div className="wishlist-item-add">
                                  <div className="" data-title="Add to cart">
                                    <button onClick={() => addToCart(product)}>
                                      <a
                                        rel="nofollow"
                                        href="#"
                                        className="product-btn button"
                                      >
                                        Add to cart
                                      </a>
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>Your wishlist is currently empty.</p>
                  )}
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
