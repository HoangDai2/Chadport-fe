import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "./style/app.css";
import "./style/responsive.css";
import "./style/toast.css";
import "./style/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TProduct, { Color, Size, TVariant } from "./Types/TProduct";
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./libs/slick/css/slick.css";
import "./libs/slick/css/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./libs/mmenu/css/mmenu.min.css";
import LoginRegister from "./pages/AuthClient/Login"; // Only one import
import ShopDetails from "./pages/ShopDetails";
import Wishlist from "./pages/Wishlist";
import ShopCart from "./pages/ShopCart";
import CartList from "./function/CartList";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import BillOrder from "./pages/BillOrder";
import MyAccountPage from "./pages/MyAccountPage";
import { toast } from "react-toastify";
import ProductList from "./admin/pages/Products/ProductList"; // Correcting the import path
import ProductAdd from "./admin/pages/Products/ProductAdd";
import Profile from "./pages/AuthClient/Profile";
import Pay_done from "./pages/Pay_done";
import ProductUpdate from "./admin/pages/Products/ProductUpdate";
import Headerclient from "./components/HeaderClient";
import PaymentSuccess from "./pages/Pay_done";
import DoneMomo from "./pages/Pay_done";
import CategoriesAdd from "./admin/pages/Categories/CategoriesAdd";
import CategoriesList from "./admin/pages/Categories/CategoriesList";
import CategoriesUpadate from "./admin/pages/Categories/CategoriesUpadate";
import Tcategory from "./Types/TCategories";
import createCategory from "./Service/categories";
import createProduct from "./Service/Product";
import { useNavigate } from "react-router-dom";
import CategoriesClient from "./pages/CategoriesClient/CategoriesClient";
import Orders from "./admin/pages/ListBill";
import SearchResults from "./pages/SearchResults";
import apisphp from "./Service/api";
import LoginAdmin from "./admin/pages/LoginAdmin";
import ProfileAdmin from "./admin/pages/ProfileAdmin";
import HeaderclientC from "./components/HeaderClient copy";
import HeaderClientC from "./components/HeaderClient copy";

// import LoginAdmin from "./admin/pages/LoginAdmin";
// import ProfileAdmin from "./admin/pages/ProfileAdmin";
import SizeForm from "./admin/pages/Variants/SizeForm";
import ColorForm from "./admin/pages/Variants/ColorForm";
import VariantForm from "./admin/pages/Variants/VariantsForm";

function App() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<TProduct[]>([]);
  const [user, setUser] = useState<[]>([]);
  const [category, setCategory] = useState<Tcategory[]>([]);
  const [carCount, setCarCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const fetchCartCount = async () => {
    try {
      const res = await fetch("http://localhost:3000/carts");
      const cartItems = await res.json();
      setCarCount(cartItems.length);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };
  useEffect(() => {
    fetchCartCount();
  }, []);
  const fetchWihsListCount = async () => {
    try {
      const res = await fetch("http://localhost:3000/wishlist");
      const wishlist = await res.json();
      setWishlistCount(wishlist.length);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };
  useEffect(() => {
    fetchWihsListCount();
  }, []);
  const addToWishlist = async (product: TProduct) => {
    try {
      const wishlistResponse = await fetch("http://localhost:3000/wishlist");
      const wishlistItems = await wishlistResponse.json();
      const isProductInwishlist = wishlistItems.some(
        (item: { product: TProduct }) => item.product.id === product.id
      );
      if (isProductInwishlist) {
        toast.info(`${product.name} đã có trong giỏ wishlist!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const response = await fetch("http://localhost:3000/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
      });

      if (response.ok) {
        setWishlistCount((prevCount) => prevCount + 1);
        toast.success(`${product.name} đã được thêm vào wishlist!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Có lỗi xảy ra khi thêm sản phẩm vào wishlist.", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Không thể kết nối đến server.", {
        position: "top-right",
        autoClose: 1000,
      });
      console.error("Error:", error);
    }
  };

  // add cart
  const addToCart = async (product: TProduct) => {
    try {
      // const cartResponse = await fetch("http://127.0.0.1:8000/api/user/cart");
      // const cartItems = await cartResponse.json();
      // const isProductInCart = cartItems.some(
      //   (item: { product: TProduct }) => item.product.id === product.id
      // );
      // if (isProductInCart) {
      //   toast.info(`${product.name} đã có trong giỏ hàng!`, {
      //     position: "top-right",
      //     autoClose: 1000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
      //   return;
      // }

      const response = await fetch(
        "http://127.0.0.1:8000/api/user/add_to_cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product }),
        }
      );

      if (response.ok) {
        setCarCount((prevCount) => prevCount + 1);
        toast.success(`${product.name} đã được thêm vào giỏ hàng!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Không thể kết nối đến server.", {
        position: "top-right",
        autoClose: 1000,
      });
      console.error("Error:", error);
    }
  };
  // call data user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const datauser = await apisphp.get("/user/getall");
        setUser(datauser.data.users);
      } catch (error) {
        console.log("loi lay data user", error);
      }
    };
    fetchUser();
  }, []);

  // hàm này sử lý thêm sản phẩm
  const handleAddProduct = (
    newShoe: TProduct,
    images: File[],
    imageProduct: File,
    variant: Array<{ quantity: number; color: string; size: string }>,
    sizes: Size[],
    colors: Color[]
  ) => {
    console.log("Dữ liệu sản phẩm:", newShoe);
    console.log("Hình ảnh sản phẩm:", images); // In ra danh sách các ảnh
    console.log("Hình ảnh sản phẩm:", imageProduct);
    console.log("Biến thể sản phẩm:", variant);
    (async () => {
      try {
        const formData = new FormData();

        // Chuyển đổi `variant` thành định dạng đúng
        const convertedVariants = variant.map((v) => ({
          size_id: sizes.filter((s) => s.name === v.size).map((s) => s.id), // Trích xuất mảng `id` của size
          color_id: colors.filter((c) => c.name === v.color).map((c) => c.id), // Trích xuất mảng `id` của color
          quantity: v.quantity,
        }));

        // Thêm các trường từ newShoe vào FormData
        Object.entries(newShoe).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });

        // Thêm ảnh chính vào FormData
        formData.append("image_product", imageProduct);

        // Thêm tất cả ảnh vào FormData
        images.forEach((image) => {
          formData.append("image_description[]", image); // Sử dụng array notation để gửi nhiều ảnh
        });

        formData.append("variants", JSON.stringify(convertedVariants)); // Đảm bảo gửi JSON
        console.log("Variants gửi đi:", JSON.stringify(convertedVariants));

        // Kiểm tra FormData
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": ", pair[1]); // Kiểm tra từng mục trong FormData
        }

        const newProduct = await createProduct(formData);
        setProduct((prev) => [...prev, newProduct]);
        // navigate("/admin/products"); // Điều hướng sau khi thêm thành công
        // window.location.reload(); // Tải lại trang nếu cần thiết
      } catch (error) {
        console.error("Error adding product:", error);
      }
    })();
  };

  // hàm này sẽ xử lí sửa sản phẩm
  const handleEditProduct = async (product: FormData) => {
    try {
      const { data } = await apisphp.post(
        `update/products/${product.get("id")}`, // Lấy `id` từ `FormData`
        product,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
          "http://127.0.0.1:8000/api/getall/categories"
        );
        setCategory(responses.data.data);
        console.log(responses);
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
                <HeaderClient
                  carCount={carCount}
                  wishlisCount={wishlistCount}
                />
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
                <HeaderClient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
                <ShopList />
                <FooterClient />
              </>
            }
          />
          <Route
            path="/shop-details/:id"
            element={
              <>
                <HeaderClient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
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
                <HeaderClient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
                <Checkout />
                <FooterClient />
              </>
            }
          />
          <Route
            path="/shopcart"
            element={
              <>
                <HeaderClient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
                <ShopCart />
                <FooterClient />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <HeaderClient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
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
                <Headerclient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
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
                <Headerclient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
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
                <Headerclient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
                <Wishlist addToCart={addToCart} />
                <FooterClient />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <HeaderClient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
                <div style={{ marginTop: "100px" }}>
                  <Profile />
                </div>
                <FooterClient />
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <HeaderClient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
                <About />
                <FooterClient />
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <HeaderClient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
                <About />
                <FooterClient />
              </>
            }
          />

          <Route
            path="/categoriesnike/:id"
            element={
              <>
                <HeaderClient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
                <CategoriesClient />
                <FooterClient />
              </>
            }
          />
          <Route
            path="/searchresults"
            element={
              <>
                <HeaderClient
                  wishlisCount={wishlistCount}
                  carCount={carCount}
                />
                <SearchResults />
                <FooterClient />
              </>
            }
          />
          {/* <Route
            path="/loginadmin"
            element={
              <>
                <LoginAdmin />
              </>
            }
          /> */}
        </Routes>
        <Routes>
          <Route path="loginadmin" element={<LoginAdmin />} />
          {/* <Route path="loginadmin" element={<LoginAdmin />} /> */}

        </Routes>
        <Routes>
          {/* Router admin */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<div>Welcome to Admin Dashboard</div>} />
            <Route path="listuser" element={<ListUser listuser={user} />} />
            <Route path="orders" element={<Orders />} />
            {/* <Route path="profileadmin" element={<ProfileAdmin />} /> */}
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
            <Route path="size" element={<SizeForm />} />
            <Route path="color" element={<ColorForm />} />
            <Route path="size" element={<SizeForm />} />
            <Route path="color" element={<ColorForm />} />
            {/* <Route path="variants" element={<VariantForm />} /> */}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
