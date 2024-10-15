import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import "./style/app.css";
import "./style/responsive.css";
import "./style/toast.css";
import "./style/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TProduct from "./Types/TProduct";
import HeaderClient from "./components/HeaderClient";
import FooterClient from "./components/FooterClient";
import Banner from "./components/Banner";
import Category from "./components/Category";
import ProductSale from "./components/ProductSale";
import Admin from "./admin/Admin";
import ListUser from "./admin/pages/ListUser";
import BestSale from "./pages/BestSale";
import instance from "./Service";
import Home from "./pages/Home";
import ShopList from "./pages/ShopList";
import "./libs/feather-font/css/iconfont.css";
import "./libs/icomoon-font/css/icomoon.css";
import "./libs/wpbingofont/css/wpbingofont.css";
import "./libs/elegant-icons/css/elegant.css";
import "./libs/slick/css/slick.css";
import "./libs/slick/css/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./libs/mmenu/css/mmenu.min.css";
import LoginRegister from "./pages/Login"; // Only one import
import ShopDetails from "./pages/ShopDetails";
import Wishlist from "./pages/Wishlist";
import ShopCart from "./pages/ShopCart";
import CartList from "./function/CartList";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import BillOrder from "./pages/BillOrder";
import MyAccountPage from "./pages/MyAccountPage";
import { toast } from "react-toastify";
import ProductList from "./admin/pages/ProductList"; // Correcting the import path
import ProductAdd from "./admin/pages/ProductAdd";

function App() {
  const addToCart = (product: TProduct) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const isProductCart = cart.some((item: TProduct) => item.id === product.id);
    if (isProductCart) {
      toast.info(`${product.name} đã có trong giỏ hàng!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
      toast.success(`${product.name} đã được thêm vào giỏ hàng!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const addToWishlist = (product: TProduct) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isProductInWishlist = wishlist.some(
      (item: TProduct) => item.id === product.id
    );
    if (isProductInWishlist) {
      toast.info(`${product.name} đã có trong wishlist!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("storage"));
      toast.success(`${product.name} đã được thêm vào wishlist!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <HeaderClient />
      <div className="content" style={{ padding: "70px", marginTop: "120px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Category />
                <Home addToCart={addToCart} addToWishlist={addToWishlist} />
                <ProductSale />
              </>
            }
          />
          <Route path="/shoplist" element={<ShopList />} />
          <Route
            path="/shop-details/:id"
            element={
              <ShopDetails
                addToCart={addToCart}
                addToWishlist={addToWishlist}
              />
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shopcart" element={<ShopCart />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route
            path="/wishlist"
            element={<Wishlist addToCart={addToCart} />}
          />
          {/* Router admin */}
          <Route path="/admin" element={<Admin />}>
          <Route index element={<div>Welcome to Admin Dashboard</div>} />
          <Route path="listuser" element={<ListUser />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit" element={<ProductList />} />
          </Route>
        </Routes>
      </div>
      <FooterClient />
    </>
  );
}

export default App;
