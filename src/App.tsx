import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
// import "./libs/font-awesome/css/font-awesome.css";
import "./libs/wpbingofont/css/wpbingofont.css";
import "./libs/elegant-icons/css/elegant.css";
import "./libs/slick/css/slick.css";
import "./libs/slick/css/slick-theme.css";
import "./libs/mmenu/css/mmenu.min.css";
import LoginRegister from "./pages/Login";
import ShopDetails from "./pages/ShopDetails";
import Wishlist from "./pages/Wishlist";
import ShopCart from "./pages/ShopCart";
import CartList from "./function/CartList";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import BillOrder from "./pages/BillOrder";
import MyAccountPage from "./pages/MyAccountPage";
function App() {
  const navigate = useNavigate();
  const [product, setProducts] = useState<TProduct[]>([]);

  // hàm lấy dữ liệu để show ra màn hình
  const Getdata = async () => {
    try {
      const { data } = await instance.get("/products");
      console.log(data);

      setProducts(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  };
  useEffect(() => {
    Getdata();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeaderClient />
              <Banner />
              <div
                className="content"
                style={{ padding: "70px", marginTop: "120px" }}
              >
                <Category />
                <BestSale />
                <Home />
                <ProductSale />
                <CartList />
              </div>
              <FooterClient />
            </>
          }
        />
        <Route
          path="/shoplist"
          element={
            <>
              <HeaderClient />
              <div className="content" style={{ padding: "70px" }}>
                <ShopList />
              </div>
              <FooterClient />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <HeaderClient />
              <div className="content" style={{ padding: "70px" }}>
                <LoginRegister />
              </div>
              <FooterClient />
            </>
          }
        />
        <Route
          path="shop-details/:id"
          element={
            <>
              <HeaderClient />
              <div className="content" style={{ padding: "70px" }}>
                <ShopDetails />
              </div>
              <FooterClient />
            </>
          }
        />
        <Route
          path="wishlist"
          element={
            <>
              <HeaderClient />
              <div className="content" style={{ padding: "70px" }}>
                <Wishlist />
              </div>
              <FooterClient />
            </>
          }
        />
        <Route
          path="checkout"
          element={
            <>
              <HeaderClient />
              <div className="content" style={{ padding: "70px" }}>
                <Checkout />
              </div>
              <FooterClient />
            </>
          }
        />
        <Route
          path="billorder"
          element={
            <>
              <HeaderClient />
              <div className="content" style={{ padding: "70px" }}>
                <BillOrder />
              </div>
              <FooterClient />
            </>
          }
        />
        <Route
          path="myaccount"
          element={
            <>
              <HeaderClient />
              <div className="content" style={{ padding: "70px" }}>
                <MyAccountPage />
              </div>
              <FooterClient />
            </>
          }
        />
        <Route
          path="shopcart"
          element={
            <>
              <HeaderClient />
              <ShopCart />
              <FooterClient />
            </>
          }
        />
        <Route
          path="about"
          element={
            <>
              <HeaderClient />
              <div className="content" style={{ marginTop: "120px" }}>
                <About />
              </div>
              <FooterClient />
            </>
          }
        />

        {/* Router admin */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<div>Welcome to Admin Dashboard</div>} />
          <Route path="listuser" element={<ListUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
