import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./style/app.css";
import "./style/responsive.css";
import "./style/toast.css";
import "./style/Home.css"
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderClient from "./components/HeaderClient";
import FooterClient from "./components/FooterClient";
import Banner from "./components/Banner";
import Category from "./components/Category";
import ProductSale from "./components/ProductSale";
import Admin from "./admin/Admin";
import ListUser from "./admin/pages/ListUser";
import Home from "./pages/Home";
import ShopList from "./pages/ShopList";
import "./libs/feather-font/css/iconfont.css";
import './libs/icomoon-font/css/icomoon.css';
// import './libs/font-awesome/css/font-awesome.css';
import './libs/wpbingofont/css/wpbingofont.css';
import './libs/elegant-icons/css/elegant.css';
import './libs/slick/css/slick.css';
import './libs/slick/css/slick-theme.css';
import './libs/mmenu/css/mmenu.min.css';
import LoginRegister from "./pages/Login";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeaderClient />
              <Banner />
              <div className="content" style={{ padding: "70px" }}>
                <Category />
                <Home />
                <ProductSale />
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
