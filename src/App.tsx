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
import Headerclient from "./components/HeaderClient";
import PaymentSuccess from "./pages/Pay_done";
import DoneMomo from "./pages/Pay_done";
import CategoriesAdd from "./admin/pages/CategoriesAdd";
import CategoriesList from "./admin/pages/CategoriesList";
import CategoriesUpadate from "./admin/pages/CategoriesUpadate";
import Tcategory from "./Types/TCategories";
import createCategory from "./Service/categories";
import createProduct from "./Service/Product";
import { useNavigate } from "react-router-dom";
import CategoriesClient from "./pages/CategoriesClient/CategoriesClient";
import Orders from "./admin/pages/ListBill";
import SearchResults from "./pages/SearchResults";
import apisphp from "./Service/api";
function App() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<TProduct[]>([]);
  const [user, setUser] = useState<[]>([]);
  const [category, setCategory] = useState<Tcategory[]>([]);
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
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const datauser = await axios.get("http://localhost:3000/users");
        setUser(datauser.data);
        // console.log(datauser);
      } catch (error) {
        console.log("loi lay data user", error);
      }
    };
    fetchUser();
  }, []);

  // hàm này sử lý thêm sản phẩm
  const handleAddProduct = (newShoe: TProduct, images: File[]) => {
    (async () => {
      try {
        console.log(newShoe, images);

        // Gọi hàm createProduct với dữ liệu đã bao gồm image_description
        const newProduct = await createProduct(newShoe, images);
        setProduct([...product, newProduct]);

        // Điều hướng sau khi thêm thành công
        // navigate("/admin/products");
        // window.location.reload();
      } catch (error) {
        console.error("Error adding product:", error);
      }
    })();
  };

  // hàm này sẽ xử lí sửa sản phẩm
  const handleEditProduct = async (product: TProduct) => {
    try {
      const { data } = await instance.put(`/products/${product.id}`, product);

      if (data && data.id) {
        setProduct((prevProducts) =>
          prevProducts.map((item) => (item.id === data.id ? data : item))
        );
        navigate("/admin/products");
      } else {
        console.error("Dữ liệu trả về không hợp lệ:", data);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  // phần này là CRUD danh mục admin
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const responses = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        setCategory(responses.data.data);
        // console.log(responses);
      } catch (error) {
        console.error("Error fetching shoes:", error);
      }
    };
    fetchCategory();
  }, []);
  const handleAddCategory = async (newCategory: Tcategory): Promise<void> => {
    try {
      const addedCategory = await createCategory(newCategory);
      setCategory([...category, addedCategory]); // Cập nhật danh mục
      toast.success("Thêm danh mục sản phẩm thành công!");
    } catch (error) {
      toast.error("Lỗi khi thêm danh mục!");
      console.error("Lỗi khi thêm danh mục:", error);
    }
  };

  const handleEditCategory = async (categoryss: Tcategory) => {
    // console.log(categoryss);

    try {
      // Kiểm tra xem id của danh mục có hợp lệ không
      if (!categoryss.id) {
        console.error("ID danh mục không hợp lệ");
        return;
      }

      // Gửi yêu cầu PUT để chỉnh sửa danh mục
      const { data } = await apisphp.put(`/categories/${categoryss.id}`, {
        name: categoryss.name,
        status: categoryss.status,
        imageURL: categoryss.imageURL,
      });

      // Kiểm tra dữ liệu trả về
      if (data && data.data && data.data._id) {
        toast.success("Danh mục đã được cập nhật thành công!");
        setCategory(data.data);
        console.log("123");

        navigate("/admin/categorieslist", { replace: true });
      } else {
        console.error("Dữ liệu trả về không hợp lệ:", data);
      }
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa danh mục:", error);
    }
  };

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
          <Route
            path="/shoplist"
            element={
              <>
                <HeaderClient />
                <ShopList />
                <FooterClient />
              </>
            }
          />
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
          <Route
            path="/pay_done"
            element={
              <>
                <Headerclient />
                <div style={{ padding: "70px", marginTop: "80px" }}>
                  <Pay_done />
                </div>
                <FooterClient />
              </>
            }
          />
          <Route
            path="/billorder"
            element={
              <>
                <Headerclient />
                <div style={{ padding: "70px", marginTop: "80px" }}>
                  <BillOrder />
                </div>
                <FooterClient />
              </>
            }
          />
          <Route path="/shopcart" element={<ShopCart />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route
            path="/wishlist"
            element={
              <>
                <Headerclient />
                <Wishlist addToCart={addToCart} />
                <FooterClient />
              </>
            }
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

          <Route
            path="/about"
            element={
              <>
                <HeaderClient />
                <About />
                <FooterClient />
              </>
            }
          />

          <Route
            path="/categoriesnike/:id"
            element={
              <>
                <HeaderClient />
                <CategoriesClient />
                <FooterClient />
              </>
            }
          />
          <Route
            path="/searchresults"
            element={
              <>
                <HeaderClient />
                <SearchResults />
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
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<ProductList />} />
            <Route
              path="products/add"
              element={
                <ProductAdd onAdd={handleAddProduct} categories={category} />
              }
            />
            <Route
              path="products/edit/:id"
              element={
                <ProductUpdate
                  onEdit={handleEditProduct}
                  categories={category}
                />
              }
            />

            <Route
              path="categorieslist"
              element={<CategoriesList listcategories={category} />}
            />
            <Route
              path="categories/add"
              element={<CategoriesAdd onAddCategory={handleAddCategory} />}
            />
            <Route
              path="categories/edit/:id"
              element={
                <CategoriesUpadate onEditCategory={handleEditCategory} />
              }
            />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
