import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./style/app.css";
import "./style/responsive.css";
import "./style/toast.css";
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
import BetsSale from "./pages/BetsSale";
import DetailProduct from "./pages/DetailProduct";
import instance from "./Service";
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
                <BetsSale />
                <ProductSale />
              </div>
              <FooterClient />
            </>
          }
        />
        <Route
          path="/detail"
          element={
            <>
              <HeaderClient />
              <div className="content" style={{ marginTop: "120px" }}>
                <DetailProduct />
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
