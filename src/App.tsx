import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./style/app.css";
import "./style/responsive.css";
import "./style/toast.css";
import "./style/Home.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HeaderClient from "./components/HeaderClient";
import FooterClient from "./components/FooterClient";
import Banner from "./components/Banner";
import Category from "./components/Category";
import ProductSale from "./components/ProductSale";
import Admin from "./admin/Admin";
import ListUser from "./admin/pages/ListUser";
import Home from "./pages/Home";
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
