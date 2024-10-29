import React, { useEffect, useState } from "react";

type CartItem = {
  cart_id: string;
  pro_id: number;
  total_money: number;
  description: string;
  date_create: string;
  date_update: string;
};

const ShopCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState<number[]>([]);

  useEffect(() => {
    // Fetch data from db.json
    fetch("http://localhost:3000/carts")
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
        setQuantity(data.map(() => 1)); // Default quantity to 1 for each item
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const delOneCart = (cartId: string) => {
    const updatedCart = cartItems.filter((item) => item.cart_id !== cartId);
    setCartItems(updatedCart);
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
      (total, item, index) => total + item.total_money * quantity[index],
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
                                  key={item.cart_id}
                                  className="border-b hover:bg-gray-50"
                                >
                                  <td className="py-3 px-4">{item.description}</td>
                                  <td className="py-3 px-4">
                                    ${Number(item.total_money || 0).toFixed(2)}
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
                                      item.total_money * quantity[index]
                                    ).toFixed(2)}
                                  </td>
                                  <td className="py-3 px-4">
                                    <button
                                      onClick={() => delOneCart(item.cart_id)}
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
                                {item.description} (x{quantity[index]})
                              </span>
                              <span>
                                $
                                {(item.total_money * quantity[index]).toFixed(2)}
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



// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCartItems, removeItem } from "../Types/cartSlice";
// import { RootState, AppDispatch } from "../Types/store";

// const ShopCart: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { items: cartItems, status, error } = useSelector((state: RootState) => state.cart);
//   const [quantity, setQuantity] = useState<number[]>([]);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchCartItems());
//     }
//   }, [dispatch, status]);

//   useEffect(() => {
//     setQuantity(cartItems.map(() => 1));
//   }, [cartItems]);

//   const delOneCart = (productId: number) => {
//     dispatch(removeItem(productId));
//   };

//   const handleUp = (index: number) => {
//     setQuantity((prevQuantity) => {
//       const newQuantity = [...prevQuantity];
//       newQuantity[index] = Math.min(newQuantity[index] + 1, 10);
//       return newQuantity;
//     });
//   };

//   const handleDown = (index: number) => {
//     setQuantity((prevQuantity) => {
//       const newQuantity = [...prevQuantity];
//       newQuantity[index] = Math.max(newQuantity[index] - 1, 1);
//       return newQuantity;
//     });
//   };

//   const getTotal = () => {
//     return cartItems.reduce(
//       (total, item, index) => total + item.total_money * quantity[index],
//       0
//     );
//   };

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (status === "failed") {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div id="site-main" className="site-main bg-gray-100 min-h-screen">
//       <div id="main-content" className="main-content">
//         <div id="primary" className="content-area mx-auto py-12">
//           <div id="title" className="page-title mb-6">
//             <h1 className="text-3xl font-bold text-center">Shopping Cart</h1>
//           </div>
//           <div id="content" className="site-content" role="main">
//             <div className="section-padding">
//               <div className="section-container p-4">
//                 <div className="shop-cart bg-white shadow-lg rounded-lg overflow-hidden">
//                   <div className="row">
//                     <div className="col-xl-8 col-lg-12 col-md-12 col-12 p-4">
//                       <form className="cart-form">
//                         <div className="table-responsive">
//                           <table className="cart-items table w-full text-left border-collapse">
//                             <thead className="bg-gray-200">
//                               <tr>
//                                 <th className="py-3 px-4">Description</th>
//                                 <th className="py-3 px-4">Price</th>
//                                 <th className="py-3 px-4">Quantity</th>
//                                 <th className="py-3 px-4">Subtotal</th>
//                                 <th className="py-3 px-4">Action</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {cartItems.map((item, index) => (
//                                 <tr
//                                   key={item.pro_id}
//                                   className="border-b hover:bg-gray-50"
//                                 >
//                                   <td className="py-3 px-4">
//                                     <span>{item.description}</span>
//                                   </td>
//                                   <td className="py-3 px-4">
//                                     ${(item.total_money / quantity[index]).toFixed(2)}
//                                   </td>
//                                   <td className="py-3 px-4">
//                                     <div className="flex items-center justify-center">
//                                       <button
//                                         type="button"
//                                         onClick={() => handleDown(index)}
//                                         className="bg-gray-300 rounded px-2 hover:bg-gray-400"
//                                       >
//                                         -
//                                       </button>
//                                       <input
//                                         type="number"
//                                         value={quantity[index]}
//                                         readOnly
//                                         className="mx-2 w-12 text-center border rounded"
//                                       />
//                                       <button
//                                         type="button"
//                                         onClick={() => handleUp(index)}
//                                         className="bg-gray-300 rounded px-2 hover:bg-gray-400"
//                                       >
//                                         +
//                                       </button>
//                                     </div>
//                                   </td>
//                                   <td className="py-3 px-4">
//                                     ${(item.total_money).toFixed(2)}
//                                   </td>
//                                   <td className="py-3 px-4">
//                                     <button
//                                       onClick={() => delOneCart(item.pro_id)}
//                                       className="text-red-500 hover:text-red-700"
//                                     >
//                                       Remove
//                                     </button>
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </form>
//                     </div>
//                     <div className="col-xl-4 col-lg-12 col-md-12 col-12 p-4">
//                       <div className="cart-totals bg-gray-100 p-4 rounded-lg shadow">
//                         <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
//                         <ul className="mb-4">
//                           {cartItems.map((item, index) => (
//                             <li key={index} className="flex justify-between mb-2">
//                               <span>{item.description} (x{quantity[index]})</span>
//                               <span>${(item.total_money).toFixed(2)}</span>
//                             </li>
//                           ))}
//                         </ul>
//                         <div className="flex justify-between mb-2">
//                           <span>Total:</span>
//                           <span>${getTotal().toFixed(2)}</span>
//                         </div>
//                         <a
//                           href="/checkout"
//                           className="block text-center bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition"
//                         >
//                           Proceed to Checkout
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopCart;
