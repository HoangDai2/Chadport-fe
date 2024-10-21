import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
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
// import "./libs/slick/css/slick.css";
// import "./libs/slick/css/slick-theme.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel";
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
import Profile from "./pages/Profile";
import Pay_done from "./pages/Pay_done";
import ProductUpdate from "./admin/pages/ProductUpdate";
import DetailUser from "./admin/pages/DetailUser";
function App() {
  const [user, setUser] = useState<[]>([]);
  const addToCart = (product: TProduct) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const isProductCart = cart.some(
      (item: TProduct) => item.pro_id === product.pro_id
    );

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
      (item: TProduct) => item.pro_id === product.pro_id
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
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const datauser = await axios.get("http://localhost:3000/users");
        setUser(datauser.data);
        console.log(datauser);
      } catch (error) {
        console.log("loi lay data user", error);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeaderClient />
                <Banner />
                <div style={{ padding: "70px", marginTop: "80px" }}>
                  <Category />
                </div>
                <Home addToCart={addToCart} addToWishlist={addToWishlist} />
                <ProductSale />
                <FooterClient />
              </>
            }
          />
          <Route path="/shoplist" element={<ShopList />} />
          <Route
            path="/shop-details/:id"
            element={
              <>
                <HeaderClient />
                <ShopDetails
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                />
                <FooterClient />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <HeaderClient />
                <Checkout />
                <FooterClient />
              </>
            }
          />
          <Route
            path="/shopcart"
            element={
              <>
                <HeaderClient />
                <ShopCart />
                <FooterClient />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <HeaderClient />
                <LoginRegister />
                <FooterClient />
              </>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pay_done" element={<Pay_done />} />
          <Route path="/billorder" element={<BillOrder />} />
          <Route path="/shopcart" element={<ShopCart />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route
            path="/wishlist"
            element={<Wishlist addToCart={addToCart} />}
          />

          <Route
            path="/profile"
            element={
              <>
                <HeaderClient />
                <Profile />
                <FooterClient />
              </>
            }
          />
        </Routes>
        <Routes>
          {/* Router admin */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<div>Welcome to Admin Dashboard</div>} />
            <Route path="listuser" element={<ListUser listuser={user} />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/add" element={<ProductAdd />} />
            <Route path="products/edit/:id" element={<ProductUpdate />} />
            <Route path="detailuser/:id" element={<DetailUser />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
