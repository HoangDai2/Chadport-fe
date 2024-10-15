import React from "react";

const Checkout = () => {
  return (
    <>
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
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="billing_first_name"
                                      defaultValue=""
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
                                      name="billing_last_name"
                                      defaultValue=""
                                    />
                                  </span>
                                </p>
                                <p className="form-row form-row-wide validate-required">
                                  <label>
                                    Country / Region{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <select
                                      name="billing_country"
                                      className="country-select custom-select"
                                    >
                                      <option value={""}>
                                        Select a country / region…
                                      </option>
                                      <option value="AF">Afghanistan</option>
                                      <option value="AX">Åland Islands</option>
                                      <option value="AL">Albania</option>
                                      <option value="DZ">Algeria</option>
                                      <option value="AS">American Samoa</option>
                                      <option value="AD">Andorra</option>
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
                                      name="billing_address_1"
                                      placeholder="House number and street name"
                                      defaultValue=""
                                    />
                                  </span>
                                </p>
                                <p className="form-row address-field form-row-wide">
                                  <label>
                                    Ward &nbsp;
                                    <span className="optional">(optional)</span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="text"
                                      className="input-text"
                                      name="billing_address_2"
                                      placeholder="Ward"
                                      defaultValue=""
                                    />
                                  </span>
                                </p>

                                <p className="form-row form-row-wide validate-required validate-phone">
                                  <label>
                                    Phone{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="tel"
                                      className="input-text"
                                      name="billing_phone"
                                      defaultValue=""
                                    />
                                  </span>
                                </p>
                                <p className="form-row form-row-wide validate-required validate-email">
                                  <label>
                                    Email address{" "}
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper">
                                    <input
                                      type="email"
                                      className="input-text"
                                      name="billing_email"
                                      defaultValue=""
                                      autoComplete="off"
                                    />
                                  </span>
                                </p>
                              </div>
                            </div>
                            {/* <div className="account-fields">
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
                                    <span className="required" title="required">
                                      *
                                    </span>
                                  </label>
                                  <span className="input-wrapper password-input">
                                    <input
                                      type="password"
                                      className="input-text"
                                      name="account_password"
                                      defaultValue=""
                                      autoComplete="off"
                                    />
                                    <span className="show-password-input" />
                                  </span>
                                </p>
                                <div className="clear" />
                              </div>
                            </div> */}
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
                              <div className="review-order-title">Product</div>
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
                                    defaultChecked="checked"
                                  />
                                  <label htmlFor="payment_method_bacs">
                                    MOMO
                                  </label>
                                  <div className="payment-box">
                                    <p>
                                      Make your payment directly into our bank
                                      account. Please use your Order ID as the
                                      payment reference. Your order will not be
                                      shipped until the funds have cleared in
                                      our account.
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
                              </ul>
                              <div className="form-row place-order">
                                <div className="terms-and-conditions-wrapper">
                                  <div className="privacy-policy-text" />
                                </div>
                                <button type="submit" className="button ">
                                  Place order
                                </button>
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
    </>
  );
};
export default Checkout;
