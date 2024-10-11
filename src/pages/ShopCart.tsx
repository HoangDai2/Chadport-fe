import React, { useEffect, useState } from "react";
import TProduct from "../Types/TProduct";

const ShopCart = () => {
  const [cartItems, setCartItems] = useState<TProduct[]>([]);
  const [quantity, setQuantity] = useState<number[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
    setQuantity(storedCart.map(() => 1));
  }, []);
  const delOneCart = (productId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };
  const handleUp = (index: number) => {
    setQuantity((prevQuantity) => {
      const newQuantity = [...prevQuantity];
      newQuantity[index] = Math.min(newQuantity[index] + 1, 10);
      return newQuantity;
    });
  };

  const handleDown = (index: number) => {
    setQuantity((prevQuantity) => {
      const newQuantity = [...prevQuantity];
      newQuantity[index] = Math.max(newQuantity[index] - 1, 1);
      return newQuantity;
    });
  };
  const getTotal = () => {
    return cartItems.reduce(
      (total, item, index) => total + item.price_sale * quantity[index],
      0
    );
  };

  return (
    <div id="site-main" className="site-main bg-gray-100 min-h-screen">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area mx-auto py-12">
          <div id="title" className="page-title mb-6">
            <h1 className="text-3xl font-bold text-center">Shopping Cart</h1>
          </div>
          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-4">
                <div className="shop-cart bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="row">
                    <div className="col-xl-8 col-lg-12 col-md-12 col-12 p-4">
                      <form className="cart-form">
                        <div className="table-responsive">
                          <table className="cart-items table w-full text-left border-collapse">
                            <thead className="bg-gray-200">
                              <tr>
                                <th className="py-3 px-4">Product</th>
                                <th className="py-3 px-4">Price</th>
                                <th className="py-3 px-4">Quantity</th>
                                <th className="py-3 px-4">Subtotal</th>
                                <th className="py-3 px-4">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cartItems.map((item, index) => (
                                <tr
                                  key={item.id}
                                  className="border-b hover:bg-gray-50"
                                >
                                  <td className="py-3 px-4 flex items-center">
                                    <img
                                      src={item.image_product}
                                      alt={item.name}
                                      className="h-16 w-16 object-cover rounded"
                                    />
                                    <span className="ml-4">{item.name}</span>
                                  </td>
                                  <td className="py-3 px-4">
                                    ${item.price_sale.toFixed(2)}
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center justify-center">
                                      <button
                                        type="button"
                                        onClick={() => handleDown(index)}
                                        className="bg-gray-300 rounded px-2 hover:bg-gray-400"
                                      >
                                        -
                                      </button>
                                      <input
                                        type="number"
                                        value={quantity[index]}
                                        readOnly
                                        className="mx-2 w-12 text-center border rounded"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleUp(index)}
                                        className="bg-gray-300 rounded px-2 hover:bg-gray-400"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    $
                                    {(
                                      item.price_sale * quantity[index]
                                    ).toFixed(2)}
                                  </td>
                                  <td className="py-3 px-4">
                                    <button
                                      onClick={() => delOneCart(item.id)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </form>
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12 col-12 p-4">
                      <div className="cart-totals bg-gray-100 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
                        <div className="flex justify-between mb-2">
                          <span>Total:</span>
                          <span>${getTotal().toFixed(2)}</span>
                        </div>
                        <a
                          href="/checkout"
                          className="block text-center bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition"
                        >
                          Proceed to Checkout
                        </a>
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
  );
};

export default ShopCart;
