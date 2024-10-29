import axios from "axios";
import React, { useState, useEffect } from "react";

const Checkout = () => {
  const [orderId, setOrderId] = useState(Date.now().toString());
  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address1: "",
    address2: "",
    phone: "",
    email: "",
    paymentMethod: "momo",
  });

  // Tải dữ liệu giỏ hàng từ API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/carts");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.total_money, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    try {
      const paymentData = {
        ...billingDetails,
        amount: getTotal(),
        orderId,
        cartItems: cartItems.map((item) => ({
          productName: item.description,
          productQuantity: item.quantity,
          productPrice: item.total_money,
        })),
      };

      const response = await axios.post("http://localhost:3000/payment", paymentData);

      if (response.data && response.data.payUrl) {
        window.location.href = response.data.payUrl;
      }
    } catch (error) {
      console.error("Error during payment creation:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isProcessing) return;
    setIsProcessing(true);

    if (getTotal() < 50) {
      alert("Tổng giá trị đơn hàng phải lớn hơn 50$.");
      setIsProcessing(false);
      return;
    }

    if (billingDetails.paymentMethod === "momo") {
      await handlePayment();
    } else {
      console.log("Order placed:", billingDetails, cartItems);
    }

    setIsProcessing(false);
  };

  return (
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
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-xl-8 col-lg-7 col-md-12 col-12">
                        <div className="customer-details">
                          <div className="billing-fields">
                            <h3>Billing details</h3>
                            <div className="billing-fields-wrapper">
                              <p className="form-row form-row-first validate-required">
                                <label>
                                  First name <span className="required">*</span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="firstName"
                                    value={billingDetails.firstName}
                                    onChange={handleInputChange}
                                  />
                                </span>
                              </p>
                              <p className="form-row form-row-last validate-required">
                                <label>
                                  Last name <span className="required">*</span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="lastName"
                                    value={billingDetails.lastName}
                                    onChange={handleInputChange}
                                  />
                                </span>
                              </p>
                              <p className="form-row form-row-wide validate-required">
                                <label>
                                  Country / Region{" "}
                                  <span className="required">*</span>
                                </label>
                                <span className="input-wrapper">
                                  <select
                                    name="country"
                                    className="country-select custom-select"
                                    value={billingDetails.country}
                                    onChange={handleInputChange}
                                  >
                                    <option value={""}>
                                      Select a country / region…
                                    </option>
                                    <option value="AF">Afghanistan</option>
                                    <option value="AX">Åland Islands</option>
                                    <option value="AL">Albania</option>
                                    <option value="DZ">Algeria</option>
                                  </select>
                                </span>
                              </p>
                              <p className="form-row address-field validate-required form-row-wide">
                                <label>
                                  Street address{" "}
                                  <span className="required">*</span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="text"
                                    className="input-text"
                                    name="address1"
                                    placeholder="House number and street name"
                                    value={billingDetails.address1}
                                    onChange={handleInputChange}
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
                                    name="address2"
                                    placeholder="Ward"
                                    value={billingDetails.address2}
                                    onChange={handleInputChange}
                                  />
                                </span>
                              </p>
                              <p className="form-row form-row-wide validate-required validate-phone">
                                <label>
                                  Phone <span className="required">*</span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="tel"
                                    className="input-text"
                                    name="phone"
                                    value={billingDetails.phone}
                                    onChange={handleInputChange}
                                  />
                                </span>
                              </p>
                              <p className="form-row form-row-wide validate-required validate-email">
                                <label>
                                  Email address{" "}
                                  <span className="required">*</span>
                                </label>
                                <span className="input-wrapper">
                                  <input
                                    type="email"
                                    className="input-text"
                                    name="email"
                                    value={billingDetails.email}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                  />
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-5 col-md-12 col-12">
                        <div className="checkout-review-order">
                          <div className="checkout-review-order-table">
                            <div className="review-order-title">Product</div>
                            <div className="cart-items">
                              {cartItems.map((item) => (
                                <div key={item.cart_id} className="cart-item">
                                  <div className="info-product">
                                    <div className="product-name">
                                      {item.description}
                                      <div>Quantity: {item.quantity}</div>
                                    </div>
                                  </div>
                                  <div className="product-total">
                                    <span>${item.total_money.toFixed(2)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="cart-subtotal">
                              <h2>Subtotal</h2>
                              <div className="subtotal-price">
                                <span>${getTotal().toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="order-total">
                              <h2>Total</h2>
                              <div className="total-price">
                                <strong>
                                  <span>${getTotal().toFixed(2)}</span>
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
                                  name="paymentMethod"
                                  value="momo"
                                  checked={
                                    billingDetails.paymentMethod === "momo"
                                  }
                                  onChange={handleInputChange}
                                />
                                <label>MOMO</label>
                              </li>
                              <li className="payment-method">
                                <input
                                  type="radio"
                                  className="input-radio"
                                  name="paymentMethod"
                                  value="cod"
                                  checked={
                                    billingDetails.paymentMethod === "cod"
                                  }
                                  onChange={handleInputChange}
                                />
                                <label>Cash on delivery</label>
                              </li>
                            </ul>
                            <div className="form-row place-order">
                              <button type="submit" className="button">
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
        </div>
      </div>
    </div>
  );
};

export default Checkout;




// import axios from "axios";
// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";

// const Checkout = () => {
//   const [orderId, setOrderId] = useState(Date.now().toString());

//   const location = useLocation();
//   const [isProcessing, setIsProcessing] = useState(false);

//   const product = location.state?.product;
//   const [billingDetails, setBillingDetails] = useState({
//     firstName: "",
//     lastName: "",
//     country: "",
//     address1: "",
//     address2: "",
//     phone: "",
//     email: "",
//     paymentMethod: "momo",
//   });
//   const total = product ? product.price * product.quantity : 0;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setBillingDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handlePayment = async () => {
//     try {
//       // const orderInfo = "Thanh toán đơn hàng MoMo";
//       const paymentData = {
//         ...billingDetails,
//         amount: total,
//         orderId,
//         productName: product.name,
//         productQuantity: product.quantity,
//         productPrice: product.price,
//         productImage: product.image_product,
//       };

//       const response = await axios.post(
//         "http://localhost:3000/payment",
//         paymentData
//       );

//       if (response.data && response.data.payUrl) {
//         window.location.href = response.data.payUrl;
//       }
//     } catch (error) {
//       console.error("Error during payment creation:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isProcessing) return;
//     setIsProcessing(true);

//     if (total < 50) {
//       alert("Tổng giá trị đơn hàng phải lớn hơn 50$.");
//       setIsProcessing(false);
//       return;
//     }

//     if (billingDetails.paymentMethod === "momo") {
//       await handlePayment();
//     } else {
//       console.log("Order placed:", billingDetails, product);
//     }

//     setIsProcessing(false);
//   };
//   if (!product) {
//     return <div>No product found.</div>;
//   }

//   return (
//     <div id="site-main" className="site-main">
//       <div id="main-content" className="main-content">
//         <div id="primary" className="content-area">
//           <div id="title" className="page-title">
//             <div className="section-container">
//               <div className="content-title-heading">
//                 <h1 className="text-title-heading">Checkout</h1>
//               </div>
//               <div className="breadcrumbs">
//                 <a href="index.html">Home</a>
//                 <span className="delimiter" />
//                 <a href="shop-grid-left.html">Shop</a>
//                 <span className="delimiter" />
//                 Shopping Cart
//               </div>
//             </div>
//           </div>
//           <div id="content" className="site-content" role="main">
//             <div className="section-padding">
//               <div className="section-container p-l-r">
//                 <div className="shop-checkout">
//                   <form
//                     name="checkout"
//                     method="post"
//                     className="checkout"
//                     autoComplete="off"
//                     onSubmit={handleSubmit}
//                   >
//                     <div className="row">
//                       <div className="col-xl-8 col-lg-7 col-md-12 col-12">
//                         <div className="customer-details">
//                           <div className="billing-fields">
//                             <h3>Billing details</h3>
//                             <div className="billing-fields-wrapper">
//                               <p className="form-row form-row-first validate-required">
//                                 <label>
//                                   First name <span className="required">*</span>
//                                 </label>
//                                 <span className="input-wrapper">
//                                   <input
//                                     type="text"
//                                     className="input-text"
//                                     name="firstName"
//                                     value={billingDetails.firstName}
//                                     onChange={handleInputChange}
//                                   />
//                                 </span>
//                               </p>
//                               <p className="form-row form-row-last validate-required">
//                                 <label>
//                                   Last name <span className="required">*</span>
//                                 </label>
//                                 <span className="input-wrapper">
//                                   <input
//                                     type="text"
//                                     className="input-text"
//                                     name="lastName"
//                                     value={billingDetails.lastName}
//                                     onChange={handleInputChange}
//                                   />
//                                 </span>
//                               </p>
//                               <p className="form-row form-row-wide validate-required">
//                                 <label>
//                                   Country / Region{" "}
//                                   <span className="required">*</span>
//                                 </label>
//                                 <span className="input-wrapper">
//                                   <select
//                                     name="country"
//                                     className="country-select custom-select"
//                                     value={billingDetails.country}
//                                     onChange={handleInputChange}
//                                   >
//                                     <option value={""}>
//                                       Select a country / region…
//                                     </option>
//                                     <option value="AF">Afghanistan</option>
//                                     <option value="AX">Åland Islands</option>
//                                     <option value="AL">Albania</option>
//                                     <option value="DZ">Algeria</option>
//                                   </select>
//                                 </span>
//                               </p>
//                               <p className="form-row address-field validate-required form-row-wide">
//                                 <label>
//                                   Street address{" "}
//                                   <span className="required">*</span>
//                                 </label>
//                                 <span className="input-wrapper">
//                                   <input
//                                     type="text"
//                                     className="input-text"
//                                     name="address1"
//                                     placeholder="House number and street name"
//                                     value={billingDetails.address1}
//                                     onChange={handleInputChange}
//                                   />
//                                 </span>
//                               </p>
//                               <p className="form-row address-field form-row-wide">
//                                 <label>
//                                   Ward &nbsp;
//                                   <span className="optional">(optional)</span>
//                                 </label>
//                                 <span className="input-wrapper">
//                                   <input
//                                     type="text"
//                                     className="input-text"
//                                     name="address2"
//                                     placeholder="Ward"
//                                     value={billingDetails.address2}
//                                     onChange={handleInputChange}
//                                   />
//                                 </span>
//                               </p>
//                               <p className="form-row form-row-wide validate-required validate-phone">
//                                 <label>
//                                   Phone <span className="required">*</span>
//                                 </label>
//                                 <span className="input-wrapper">
//                                   <input
//                                     type="tel"
//                                     className="input-text"
//                                     name="phone"
//                                     value={billingDetails.phone}
//                                     onChange={handleInputChange}
//                                   />
//                                 </span>
//                               </p>
//                               <p className="form-row form-row-wide validate-required validate-email">
//                                 <label>
//                                   Email address{" "}
//                                   <span className="required">*</span>
//                                 </label>
//                                 <span className="input-wrapper">
//                                   <input
//                                     type="email"
//                                     className="input-text"
//                                     name="email"
//                                     value={billingDetails.email}
//                                     onChange={handleInputChange}
//                                     autoComplete="off"
//                                   />
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-xl-4 col-lg-5 col-md-12 col-12">
//                         <div className="checkout-review-order">
//                           <div className="checkout-review-order-table">
//                             <div className="review-order-title">Product</div>
//                             <div className="cart-items">
//                               <div className="cart-item">
//                                 <div className="info-product">
//                                   <div className="product-thumbnail">
//                                     <img
//                                       width={600}
//                                       height={600}
//                                       src={product.image_product}
//                                     />
//                                   </div>
//                                   <div className="product-name">
//                                     {product.name}
//                                     <strong className="product-quantity">
//                                       QTY : {product.quantity}
//                                     </strong>
//                                     <div>Size: {product.size}</div>
//                                     <div>Color: {product.color}</div>
//                                   </div>
//                                 </div>
//                                 <div className="product-total">
//                                   <span>${product.price}</span>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="cart-subtotal">
//                               <h2>Subtotal</h2>
//                               <div className="subtotal-price">
//                                 <span>${product.price * product.quantity}</span>
//                               </div>
//                             </div>
//                             <div className="order-total">
//                               <h2>Total</h2>
//                               <div className="total-price">
//                                 <strong>
//                                   <span>
//                                     ${product.price * product.quantity}
//                                   </span>
//                                 </strong>
//                               </div>
//                             </div>
//                           </div>
//                           <div id="payment" className="checkout-payment">
//                             <ul className="payment-methods methods custom-radio">
//                               {/* Payment Method MoMo */}
//                               <li className="payment-method">
//                                 <input
//                                   type="radio"
//                                   className="input-radio"
//                                   name="paymentMethod"
//                                   value="momo"
//                                   checked={
//                                     billingDetails.paymentMethod === "momo"
//                                   }
//                                   onChange={handleInputChange}
//                                 />
//                                 <label>MOMO</label>
//                                 <div className="payment-box">
//                                   <p>
//                                     Make your payment directly into our bank
//                                     account. Please use your Order ID as the
//                                     payment reference. Your order will not be
//                                     shipped until the funds have cleared in our
//                                     account.
//                                   </p>
//                                 </div>
//                               </li>

//                               {/* Payment Method COD */}
//                               <li className="payment-method">
//                                 <input
//                                   type="radio"
//                                   className="input-radio"
//                                   name="paymentMethod"
//                                   value="cod"
//                                   checked={
//                                     billingDetails.paymentMethod === "cod"
//                                   }
//                                   onChange={handleInputChange}
//                                 />
//                                 <label>Cash on delivery</label>
//                                 <div className="payment-box">
//                                   <p>Pay with cash upon delivery.</p>
//                                 </div>
//                               </li>
//                             </ul>
//                             {/* Submit button */}
//                             <div className="form-row place-order">
//                               <button type="submit" className="button">
//                                 Place order
//                               </button>
//                             </div>

//                             {/* Hiển thị mã QR MoMo nếu có */}
//                             {/* {qrCodeUrl && (
//                               <div className="qr-code">
//                                 <h3>Scan to pay with MoMo</h3>
//                                 <img src={qrCodeUrl} alt="MoMo QR Code" />
//                               </div>
//                             )} */}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
