import React from "react";

const Checkout = () => {
  return (
    <>
      <div id="page" className="hfeed page-wrapper">
        <div id="site-main" className="site-main">
          <div id="main-content" className="main-content">
            <div id="primary" className="content-area">
              <div id="title" className="page-title">
                <div className="section-container">
                  <div className="content-title-heading">
                    <h1 className="text-title-heading">Checkout</h1>
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
                    <div className="shop-checkout">
                      <form
                        name="checkout"
                        method="post"
                        className="checkout"
                        action="#"
                        autoComplete="off"
                      >
                        <div className="row">
                          <div className="col-xl-8 col-lg-7 col-md-12 col-12">
                            <div className="customer-details">
                              <div className="billing-fields">
                                <h3>Billing details</h3>
                                <div className="billing-fields-wrapper">
                                  <p className="form-row form-row-first validate-required">
                                    <label>
                                      First name{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="billing_first_name"
                                      />
                                    </span>
                                  </p>
                                  <p className="form-row form-row-last validate-required">
                                    <label>
                                      Last name{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="billing_last_name"
                                      />
                                    </span>
                                  </p>
                                  <p className="form-row form-row-wide">
                                    <label>
                                      Company name{" "}
                                      <span className="optional">
                                        (optional)
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="billing_company"
                                      />
                                    </span>
                                  </p>
                                  <p className="form-row form-row-wide validate-required">
                                    <label>
                                      Country / Region{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <select
                                        name="billing_country"
                                        className="country-select custom-select"
                                      >
                                        <option>
                                          Select a country / region…
                                        </option>
                                        <option value="AF">Afghanistan</option>
                                        <option value="AX">
                                          Åland Islands
                                        </option>
                                        <option value="AL">Albania</option>
                                        <option value="DZ">Algeria</option>
                                        <option value="AS">
                                          American Samoa
                                        </option>
                                        <option value="AD">Andorra</option>
                                      </select>
                                    </span>
                                  </p>
                                  <p className="form-row address-field validate-required form-row-wide">
                                    <label>
                                      Street address{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="billing_address_1"
                                        placeholder="House number and street name"
                                      />
                                    </span>
                                  </p>
                                  <p className="form-row address-field form-row-wide">
                                    <label>
                                      Apartment, suite, unit, etc.&nbsp;
                                      <span className="optional">
                                        (optional)
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="billing_address_2"
                                        placeholder="Apartment, suite, unit, etc. (optional)"
                                      />
                                    </span>
                                  </p>
                                  <p className="form-row address-field validate-required form-row-wide">
                                    <label htmlFor="billing_city">
                                      Town / City{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="billing_city"
                                      />
                                    </span>
                                  </p>
                                  <p className="form-row address-field validate-required validate-state form-row-wide">
                                    <label>
                                      State / County{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <select
                                        name="billing_state"
                                        className="state-select custom-select"
                                      >
                                        <option>
                                          Select a state / county…
                                        </option>
                                        <option value="VN">
                                          Vinnytsia Oblast
                                        </option>
                                        <option value="VL">Volyn Oblast</option>
                                        <option value="DP">
                                          Dnipropetrovsk Oblast
                                        </option>
                                        <option value="DT">
                                          Donetsk Oblast
                                        </option>
                                        <option value="ZT">
                                          Zhytomyr Oblast
                                        </option>
                                      </select>
                                    </span>
                                  </p>
                                  <p className="form-row address-field validate-required validate-postcode form-row-wide">
                                    <label>
                                      Postcode / ZIP{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="text"
                                        className="input-text"
                                        name="billing_postcode"
                                      />
                                    </span>
                                  </p>
                                  <p className="form-row form-row-wide validate-required validate-phone">
                                    <label>
                                      Phone{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="tel"
                                        className="input-text"
                                        name="billing_phone"
                                      />
                                    </span>
                                  </p>
                                  <p className="form-row form-row-wide validate-required validate-email">
                                    <label>
                                      Email address{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper">
                                      <input
                                        type="email"
                                        className="input-text"
                                        name="billing_email"
                                        autoComplete="off"
                                      />
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="account-fields">
                                <p className="form-row form-row-wide">
                                  <label className="checkbox">
                                    <input
                                      className="input-checkbox"
                                      type="checkbox"
                                      name="createaccount"
                                      defaultValue={1}
                                    />
                                    <span>Create an account?</span>
                                  </label>
                                </p>
                                <div className="create-account">
                                  <p className="form-row validate-required">
                                    <label>
                                      Create account password{" "}
                                      <span
                                        className="required"
                                        title="required"
                                      >
                                        *
                                      </span>
                                    </label>
                                    <span className="input-wrapper password-input">
                                      <input
                                        type="password"
                                        className="input-text"
                                        name="account_password"
                                        autoComplete="off"
                                      />
                                      <span className="show-password-input" />
                                    </span>
                                  </p>
                                  <div className="clear" />
                                </div>
                              </div>
                            </div>
                            <div className="shipping-fields">
                              <p className="form-row form-row-wide ship-to-different-address">
                                <label className="checkbox">
                                  <input
                                    className="input-checkbox"
                                    type="checkbox"
                                    name="ship_to_different_address"
                                    defaultValue={1}
                                  />
                                  <span>Ship to a different address?</span>
                                </label>
                              </p>
                              <div className="shipping-address">
                                <p className="form-row form-row-first validate-required">
                                  <label>
                                    First name{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="shipping_first_name"
                                    />
                                  </span>
                                </p>
                                <p className="form-row form-row-last validate-required">
                                  <label>
                                    Last name{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="shipping_last_name"
                                    />
                                  </span>
                                </p>
                                <p className="form-row form-row-wide">
                                  <label>
                                    Company name{" "}
                                    <span className="optional">(optional)</span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="shipping_company"
                                    />
                                  </span>
                                </p>
                                <p className="form-row form-row-wide address-field validate-required">
                                  <label htmlFor="shipping_country">
                                    Country / Region{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <select
                                      name="billing_state"
                                      className="state-select custom-select"
                                    >
                                      <option>
                                        Select a country / region…
                                      </option>
                                      <option value="VN">
                                        Vinnytsia Oblast
                                      </option>
                                      <option value="VL">Volyn Oblast</option>
                                      <option value="DP">
                                        Dnipropetrovsk Oblast
                                      </option>
                                      <option value="DT">Donetsk Oblast</option>
                                      <option value="ZT">
                                        Zhytomyr Oblast
                                      </option>
                                    </select>
                                  </span>
                                </p>
                                <p className="form-row address-field validate-required form-row-wide">
                                  <label>
                                    Street address{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="shipping_address_1"
                                      placeholder="House number and street name"
                                    />
                                  </span>
                                </p>
                                <p className="form-row address-field form-row-wide">
                                  <label>
                                    Apartment, suite, unit, etc.{" "}
                                    <span className="optional">(optional)</span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="shipping_address_2"
                                      placeholder="Apartment, suite, unit, etc. (optional)"
                                    />
                                  </span>
                                </p>
                                <p className="form-row address-field validate-required form-row-wide">
                                  <label>
                                    Town / City{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="shipping_city"
                                    />
                                  </span>
                                </p>
                                <p className="form-row address-field validate-required validate-state form-row-wide">
                                  <label htmlFor="shipping_state">
                                    State / County{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <select
                                      name="billing_state"
                                      className="state-select custom-select"
                                    >
                                      <option>Select a state / county…</option>
                                      <option value="VN">
                                        Vinnytsia Oblast
                                      </option>
                                      <option value="VL">Volyn Oblast</option>
                                      <option value="DP">
                                        Dnipropetrovsk Oblast
                                      </option>
                                      <option value="DT">Donetsk Oblast</option>
                                      <option value="ZT">
                                        Zhytomyr Oblast
                                      </option>
                                    </select>
                                  </span>
                                </p>
                                <p className="form-row address-field validate-required validate-postcode form-row-wide">
                                  <label>
                                    Postcode / ZIP{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="shipping_postcode"
                                    />
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="additional-fields">
                              <p className="form-row notes">
                                <label>
                                  Order notes{" "}
                                  <span className="optional">(optional)</span>
                                </label>
                                <span className="input-wrapper">
                                  <textarea
                                    name="order_comments"
                                    className="input-text"
                                    placeholder="Notes about your order, e.g. special notes for delivery."
                                    rows={2}
                                    cols={5}
                                    defaultValue={""}
                                  />
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-5 col-md-12 col-12">
                            <div className="checkout-review-order">
                              <div className="checkout-review-order-table">
                                <div className="review-order-title">
                                  Product
                                </div>
                                <div className="cart-items">
                                  <div className="cart-item">
                                    <div className="info-product">
                                      <div className="product-thumbnail">
                                        <img
                                          width={600}
                                          height={600}
                                          src="media/product/AIR+JORDAN+1+MID+SE+1.jpg"
                                        />
                                      </div>
                                      <div className="product-name">
                                        AIR JORDAN 1 MID SE
                                        <strong className="product-quantity">
                                          QTY : 2
                                        </strong>
                                      </div>
                                    </div>
                                    <div className="product-total">
                                      <span>$300.00</span>
                                    </div>
                                  </div>
                                  <div className="cart-item">
                                    <div className="info-product">
                                      <div className="product-thumbnail">
                                        <img
                                          width={600}
                                          height={600}
                                          src="media/product/BLAZER+LOW+'77+VNTG+1.png"
                                        />
                                      </div>
                                      <div className="product-name">
                                        BLAZER LOW '77 VNTG
                                        <strong className="product-quantity">
                                          QTY : 1
                                        </strong>
                                      </div>
                                    </div>
                                    <div className="product-total">
                                      <span>$180.00</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="cart-subtotal">
                                  <h2>Subtotal</h2>
                                  <div className="subtotal-price">
                                    <span>$480.00</span>
                                  </div>
                                </div>
                                <div className="shipping-totals shipping">
                                  <h2>Shipping</h2>
                                  <div data-title="Shipping">
                                    <ul className="shipping-methods custom-radio">
                                      <li>
                                        <input
                                          type="radio"
                                          name="shipping_method"
                                          data-index={0}
                                          defaultValue="free_shipping"
                                          className="shipping_method"
                                        />
                                        <label>Free shipping</label>
                                      </li>
                                      <li>
                                        <input
                                          type="radio"
                                          name="shipping_method"
                                          data-index={0}
                                          defaultValue="flat_rate"
                                          className="shipping_method"
                                        />
                                        <label>Flat rate</label>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="order-total">
                                  <h2>Total</h2>
                                  <div className="total-price">
                                    <strong>
                                      <span>$480.00</span>
                                    </strong>
                                  </div>
                                </div>
                              </div>
                              <div id="payment" className="checkout-payment">
                                <ul className="payment-methods methods custom-radio">
                                  <li className="payment-method">
                                    <input
                                      type="radio"
                                      className="input-radio"
                                      name="payment_method"
                                      defaultValue="bacs"
                                    />
                                    <label htmlFor="payment_method_bacs">
                                      Direct bank transfer
                                    </label>
                                    <div className="payment-box">
                                      <p>
                                        Make your payment directly into our bank
                                        account. Please use your Order ID as the
                                        payment reference. Your order will not
                                        be shipped until the funds have cleared
                                        in our account.
                                      </p>
                                    </div>
                                  </li>
                                  <li className="payment-method">
                                    <input
                                      type="radio"
                                      className="input-radio"
                                      name="payment_method"
                                      defaultValue="cheque"
                                    />
                                    <label>Check payments</label>
                                    <div className="payment-box">
                                      <p>
                                        Please send a check to Store Name, Store
                                        Street, Store Town, Store State /
                                        County, Store Postcode.
                                      </p>
                                    </div>
                                  </li>
                                  <li className="payment-method">
                                    <input
                                      type="radio"
                                      className="input-radio"
                                      name="payment_method"
                                      defaultValue="cod"
                                    />
                                    <label>Cash on delivery</label>
                                    <div className="payment-box">
                                      <p>Pay with cash upon delivery.</p>
                                    </div>
                                  </li>
                                  <li className="payment-method">
                                    <input
                                      type="radio"
                                      className="input-radio"
                                      name="payment_method"
                                      defaultValue="paypal"
                                    />
                                    <label>PayPal</label>
                                    <div className="payment-box">
                                      <p>
                                        Pay via PayPal; you can pay with your
                                        credit card if you don’t have a PayPal
                                        account.
                                      </p>
                                    </div>
                                  </li>
                                </ul>
                                <div className="form-row place-order">
                                  <div className="terms-and-conditions-wrapper">
                                    <div className="privacy-policy-text" />
                                  </div>
                                  <a href="/billorder">
                                    <button
                                      type="submit"
                                      className="button alt"
                                    >
                                      Place order
                                    </button>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
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
      </div>
      {/* Back Top button */}
      <div className="back-top button-show">
        <i className="arrow_carrot-up" />
      </div>
      {/* Search */}
      <div className="search-overlay">
        <div className="close-search" />
        <div className="wrapper-search">
          <form
            role="search"
            method="get"
            className="search-from ajax-search"
            action="#"
          >
            <div className="search-box">
              <button id="searchsubmit" className="btn" type="submit">
                <i className="icon-search" />
              </button>
              <input
                id="myInput"
                type="text"
                autoComplete="off"
                name="s"
                className="input-search s"
                placeholder="Search..."
              />
              <div className="search-top">
                <div className="close-search">Cancel</div>
              </div>
              <div className="content-menu_search">
                <label>Suggested</label>
                <ul id="menu_search" className="menu">
                  <li>
                    <a href="#">Furniture</a>
                  </li>
                  <li>
                    <a href="#">Home Décor</a>
                  </li>
                  <li>
                    <a href="#">Industrial</a>
                  </li>
                  <li>
                    <a href="#">Kitchen</a>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Wishlist */}
      <div className="wishlist-popup">
        <div className="wishlist-popup-inner">
          <div className="wishlist-popup-content">
            <div className="wishlist-popup-content-top">
              <span className="wishlist-name">Wishlist</span>
              <span className="wishlist-count-wrapper">
                <span className="wishlist-count">2</span>
              </span>
              <span className="wishlist-popup-close" />
            </div>
            <div className="wishlist-popup-content-mid">
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
                          src="media/product/3.jpg"
                        />
                      </a>
                    </td>
                    <td className="wishlist-item-info">
                      <div className="wishlist-item-name">
                        <a href="shop-details.html">Chair Oak Matt Lacquered</a>
                      </div>
                      <div className="wishlist-item-price">
                        <span>$150.00</span>
                      </div>
                      <div className="wishlist-item-time">June 4, 2022</div>
                    </td>
                    <td className="wishlist-item-actions">
                      <div className="wishlist-item-stock">In stock</div>
                      <div className="wishlist-item-add">
                        <div data-title="Add to cart">
                          <a rel="nofollow" href="#" className="button">
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
                          src="media/product/4.jpg"
                        />
                      </a>
                    </td>
                    <td className="wishlist-item-info">
                      <div className="wishlist-item-name">
                        <a href="shop-details.html">
                          Pillar Dining Table Round
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
                      <div className="wishlist-item-time">June 4, 2022</div>
                    </td>
                    <td className="wishlist-item-actions">
                      <div className="wishlist-item-stock">In stock</div>
                      <div className="wishlist-item-add">
                        <div data-title="Add to cart">
                          <a rel="nofollow" href="#" className="button">
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="wishlist-popup-content-bot">
              <div className="wishlist-popup-content-bot-inner">
                <a className="wishlist-page" href="shop-wishlist.html">
                  Open wishlist page
                </a>
                <span className="wishlist-continue" data-url>
                  Continue shopping
                </span>
              </div>
              <div className="wishlist-notice wishlist-notice-show">
                Added to the wishlist!
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Compare */}
      <div className="compare-popup">
        <div className="compare-popup-inner">
          <div className="compare-table">
            <div className="compare-table-inner">
              <a
                href="#"
                id="compare-table-close"
                className="compare-table-close"
              >
                <span className="compare-table-close-icon" />
              </a>
              <div className="compare-table-items">
                <table id="product-table" className="product-table">
                  <thead>
                    <tr>
                      <th>
                        <a href="#" className="compare-table-settings">
                          Settings
                        </a>
                      </th>
                      <th>
                        <a href="shop-details.html">Chair Oak Matt Lacquered</a>{" "}
                        <span className="remove">remove</span>
                      </th>
                      <th>
                        <a href="shop-details.html">Zunkel Schwarz</a>{" "}
                        <span className="remove">remove</span>
                      </th>
                      <th>
                        <a href="shop-details.html">Namaste Vase</a>{" "}
                        <span className="remove">remove</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="tr-image">
                      <td className="td-label">Image</td>
                      <td>
                        <a href="shop-details.html">
                          <img
                            width={600}
                            height={600}
                            src="media/product/3.jpg"
                          />
                        </a>
                      </td>
                      <td>
                        <a href="shop-details.html">
                          <img
                            width={600}
                            height={600}
                            src="media/product/1.jpg"
                          />
                        </a>
                      </td>
                      <td>
                        <a href="shop-details.html">
                          <img
                            width={600}
                            height={600}
                            src="media/product/2.jpg"
                          />
                        </a>
                      </td>
                    </tr>
                    <tr className="tr-sku">
                      <td className="td-label">SKU</td>
                      <td>VN00189</td>
                      <td />
                      <td>D1116</td>
                    </tr>
                    <tr className="tr-rating">
                      <td className="td-label">Rating</td>
                      <td>
                        <div className="star-rating">
                          <span style={{ width: "80%" }} />
                        </div>
                      </td>
                      <td>
                        <div className="star-rating">
                          <span style={{ width: "100%" }} />
                        </div>
                      </td>
                      <td />
                    </tr>
                    <tr className="tr-price">
                      <td className="td-label">Price</td>
                      <td>
                        <span className="amount">$150.00</span>
                      </td>
                      <td>
                        <del>
                          <span className="amount">$150.00</span>
                        </del>{" "}
                        <ins>
                          <span className="amount">$100.00</span>
                        </ins>
                      </td>
                      <td>
                        <span className="amount">$200.00</span>
                      </td>
                    </tr>
                    <tr className="tr-add-to-cart">
                      <td className="td-label">Add to cart</td>
                      <td>
                        <div data-title="Add to cart">
                          <a href="#" className="button">
                            Add to cart
                          </a>
                        </div>
                      </td>
                      <td>
                        <div data-title="Add to cart">
                          <a href="#" className="button">
                            Add to cart
                          </a>
                        </div>
                      </td>
                      <td>
                        <div data-title="Add to cart">
                          <a href="#" className="button">
                            Add to cart
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr className="tr-description">
                      <td className="td-label">Description</td>
                      <td>
                        Phasellus sed volutpat orci. Fusce eget lore mauris
                        vehicula elementum gravida nec dui. Aenean aliquam
                        varius ipsum, non ultricies tellus sodales eu. Donec
                        dignissim viverra nunc, ut aliquet magna posuere eget.
                      </td>
                      <td>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                      </td>
                      <td>
                        The EcoSmart Fleece Hoodie full-zip hooded jacket
                        provides medium weight fleece comfort all year around.
                        Feel better in this sweatshirt because Hanes keeps
                        plastic bottles of landfills by using recycled
                        polyester.7.8 ounce fleece sweatshirt made with up to 5
                        percent polyester created from recycled plastic.
                      </td>
                    </tr>
                    <tr className="tr-content">
                      <td className="td-label">Content</td>
                      <td>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum. Sed ut perspiciatis unde omnis iste
                        natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                        inventore veritatis et quasi architecto beatae vitae
                        dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                        voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem
                        sequi nesciunt. Neque porro quisquam est, qui dolorem
                        ipsum quia dolor sit amet, consectetur, adipisci velit,
                        sed quia non numquam eius modi tempora incidunt ut
                        labore et dolore magnam aliquam quaerat voluptatem.
                      </td>
                      <td>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum. Sed ut perspiciatis unde omnis iste
                        natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                        inventore veritatis et quasi architecto beatae vitae
                        dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                        voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem
                        sequi nesciunt. Neque porro quisquam est, qui dolorem
                        ipsum quia dolor sit amet, consectetur, adipisci velit,
                        sed quia non numquam eius modi tempora incidunt ut
                        labore et dolore magnam aliquam quaerat voluptatem.
                      </td>
                      <td>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum. Sed ut perspiciatis unde omnis iste
                        natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                        inventore veritatis et quasi architecto beatae vitae
                        dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                        voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem
                        sequi nesciunt. Neque porro quisquam est, qui dolorem
                        ipsum quia dolor sit amet, consectetur, adipisci velit,
                        sed quia non numquam eius modi tempora incidunt ut
                        labore et dolore magnam aliquam quaerat voluptatem.
                      </td>
                    </tr>
                    <tr className="tr-dimensions">
                      <td className="td-label">Dimensions</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Loader */}
      {/* <div className="page-preloader">
          <div className="loader">
            <div />
            <div />
          </div>
        </div> */}
    </>
  );
};
export default Checkout;
