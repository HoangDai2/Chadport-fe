import React, { useEffect, useState } from "react";

type CartItem = {
  id: string;
  product: {
    title: string;
    name: string;
    status: string;
    col_id: number;
    size_id: number;
    brand_id: number;
    description: string;
    quantity: number;
    image_product: string;
    price: number;
    price_sale: number;
    type: string;
    date_create: string;
    date_update: string;
  };
};

const ShopCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/cart")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        return response.json();
      })
      .then((data) => {
        setCartItems(data);
        setQuantity(data.map(() => 1));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const delOneCart = (cartId: string) => {
    fetch(`http://127.0.0.1:8000/cart/${cartId}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.id !== cartId)
          );
        } else {
          console.error("Error deleting item from cart");
        }
      })
      .catch((error) => console.error("Error deleting item:", error));
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
      (total, item, index) =>
        total + (item.product.price || 0) * quantity[index],
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
                                <th className="py-3 px-4">Description</th>
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
                                  <td className="py-3 px-4">
                                    <img
                                      src={item.product.image_product}
                                      alt=""
                                      className="w-16 h-16 object-cover"
                                    />
                                  </td>
                                  <td className="py-3 px-4">
                                    $
                                    {Number(item.product.price || 0).toFixed(2)}
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
                                      item.product.price * quantity[index]
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
                        <ul className="mb-4">
                          {cartItems.map((item, index) => (
                            <li
                              key={index}
                              className="flex justify-between mb-2"
                            >
                              <span>
                                {item.product.name} (x{quantity[index]})
                              </span>
                              <span>
                                $
                                {(item.product.price * quantity[index]).toFixed(
                                  2
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
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
