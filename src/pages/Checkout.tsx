import axios from "axios";
import React, { useState, useEffect } from "react";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderId, setOrderId] = useState(Date.now().toString());
  const [isProcessing, setIsProcessing] = useState(false);

  // Billing details state
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

  useEffect(() => {
    // Fetch cart data from db.json
    axios
      .get("http://localhost:3000/carts")
      .then((response) => setCartItems(response.data))
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.total_money,
      0
    );
  };

  const handlePayment = async () => {
    const total = calculateTotal();
    const paymentData = {
      ...billingDetails,
      amount: total,
      orderId,
      items: cartItems.map((item) => ({
        name: item.description,
        quantity: 1, // Assuming 1 per cart entry; adjust as needed
        price: item.total_money,
      })),
    };

    try {
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

    const total = calculateTotal();
    if (total < 50) {
      alert("Total order value must be over $50.");
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
                <a href="/">Home</a>
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
                              <input type="text" name="firstName" placeholder="First name" value={billingDetails.firstName} onChange={handleInputChange} required />
                              <input type="text" name="lastName" placeholder="Last name" value={billingDetails.lastName} onChange={handleInputChange} required />
                              <select name="country" value={billingDetails.country} onChange={handleInputChange} required>
                                <option value="">Select a country...</option>
                                {/* Add country options */}
                              </select>
                              <input type="text" name="address1" placeholder="Street address" value={billingDetails.address1} onChange={handleInputChange} required />
                              <input type="text" name="address2" placeholder="Ward (optional)" value={billingDetails.address2} onChange={handleInputChange} />
                              <input type="tel" name="phone" placeholder="Phone" value={billingDetails.phone} onChange={handleInputChange} required />
                              <input type="email" name="email" placeholder="Email" value={billingDetails.email} onChange={handleInputChange} required />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-5 col-md-12 col-12">
                        <div className="checkout-review-order">
                          <h2>Order Summary</h2>
                          <ul>
                            {cartItems.map((item, index) => (
                              <li key={index}>
                                <span>{item.description}</span>
                                <span>${item.total_money}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="order-total">
                            <strong>Total: ${calculateTotal().toFixed(2)}</strong>
                          </div>
                          <button type="submit" className="button">Place Order</button>
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
