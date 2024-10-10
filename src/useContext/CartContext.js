import React, { createContext, useState } from "react";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingProductIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingProductIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
