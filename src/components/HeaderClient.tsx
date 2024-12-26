import React, { useEffect, useState } from "react";
import logochartport from "../img/logochadport.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TProduct from "../Types/TProduct";
import Tcategory from "../Types/TCategories";
import apisphp from "../Service/api";
import { useUserContext } from "../pages/AuthClient/UserContext";
import CartData from "../Types/TCart";
const HeaderClientC = ({
  carCount,
  wishlisCount,
}: {
  carCount: number;
  wishlisCount: number;
}) => {
  const { user, setUser } = useUserContext();

  // console.log("Current user in header:", user);

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  // const [carCount, setCarCount] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<TProduct[]>([]); // Khai báo kiểu dữ liệu cho sản phẩm
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
  const [categories, setCategories] = useState<Tcategory[]>([]); // Khai báo kiểu dữ liệu cho sản phẩm đã lọc
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // Lưu các từ khóa vừa tìm
  const [cart, setCart] = useState<CartData[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // State lưu các item được chọn
  const navigate = useNavigate();

  // Lấy dữ liệu sản phẩm từ API để làm chức năng tìm kiếm sản phẩm theo từ khóa
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apisphp.get("list/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("lỗi get products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Lấy dữ liệu danh mục từ API để làm chức năng hiển thị ở tìm kiếm
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cate = await apisphp.get("getall/categories");
        setCategories(cate.data.data);
        // console.log(cate);
      } catch (error) {
        console.error("lỗi get products:", error);
      }
    };

    fetchCategories();
  }, []);

  // chức năng thích sản phẩm
  // useEffect(() => {
  //   const updateWishlistCount = () => {
  //     const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  //     setWishlistCount(wishlist.length);
  //   };
  //   updateWishlistCount();
  //   window.addEventListener("storage", updateWishlistCount);
  //   return () => {
  //     window.removeEventListener("storage", updateWishlistCount);
  //   };
  // }, []);

  // Hàm lấy và cập nhật số lượng sản phẩm trong giỏ hàng từ cơ sở dữ liệu
  // useEffect(() => {
  //   const fetchCartCount = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/carts");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch cart data");
  //       }
  //       const cartItems = await response.json();
  //       setCarCount(cartItems.length); // Đếm số lượng sản phẩm trong giỏ hàng
  //     } catch (error) {
  //       console.error("Error fetching cart count:", error);
  //     }
  //   };

  //   fetchCartCount();

  //   // Cập nhật số lượng sản phẩm mỗi khi có sự kiện thay đổi trong giỏ hàng
  //   window.addEventListener("storage", fetchCartCount);
  //   return () => {
  //     window.removeEventListener("storage", fetchCartCount);
  //   };
  // }, []);
  // hàm này để show tên người dùng sau khi đăng nhập và được lưu và sessionStoeage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.username || user.email);
    } else {
      setUserName(null);
    }
  }, []);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Xử lý logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };

  // hàm này xử lí ẩn hiện thanh tìm kiếm
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // hàm này xử lý chuyển hướng đến sản phẩm chi tiết
  const goToProductDetail = (id: number) => {
    navigate(`/shop-details/${id}`);
  };

  // Hàm này xử lý khi nhấn Enter
  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && searchTerm) {
      // Cập nhật trạng thái loading
      setLoading(true);

      // quản lí thanh tìm kiếm khi tìm kiếm được kết quả rồi thì sẽ ẩn thanh tìm kiếm đi
      setIsSearchOpen(false);

      // Lưu từ khóa vào localStorage
      saveSearchTerm(searchTerm);

      // tim kiếm xong thì sau 1s sẽ hiện ra kết quả
      setTimeout(() => {
        setLoading(false);
        navigate(`/searchresults?query=${searchTerm}`);
      }, 1000);
    }
  };

  // Hàm lưu từ khóa vào localStorage
  const saveSearchTerm = (term: string) => {
    const storedHistory = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    if (!storedHistory.includes(term)) {
      const updatedHistory = [...storedHistory, term];
      localStorage.setItem("recentSearches", JSON.stringify(updatedHistory));
      setRecentSearches(updatedHistory);
    }
  };

  // Lấy danh sách các từ khóa vừa tìm từ localStorage khi component được tải
  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedHistory);
  }, []);

  // Hàm xóa từ khóa tìm kiếm
  const handleDeleteSearchTerm = (term: string) => {
    const storedHistory = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    const updatedHistory = storedHistory.filter(
      (item: string) => item !== term
    );
    localStorage.setItem("recentSearches", JSON.stringify(updatedHistory)); // Lưu lại vào localStorage
    setRecentSearches(updatedHistory);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const isActive = (path: string) => {
    const location = useLocation();
    return location.pathname === path;
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // hàm này call data giỏ hàng của user
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        // console.log("Token:", token);
        if (!token) {
          console.log("Token not found");
          setLoading(false); // Set loading false khi không tìm thấy token
          return;
        }

        // Cấu hình header để thêm token vào yêu cầu
        const headers = {
          Authorization: `Bearer ${token}`, // Gửi token vào header Authorization
        };

        // Lấy dữ liệu giỏ hàng với header token
        const response = await apisphp.get("user/cart", { headers });
        console.log(response);

        setCart(response.data); // Lưu dữ liệu vào state cartData
        setLoading(false); // Dừng trạng thái loading sau khi lấy dữ liệu
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setLoading(false); // Dừng trạng thái loading khi có lỗi
      }
    };

    fetchCartData();
  }, []);

  return (
    <>
      <div
        className="header-desktop p-4 border-b"
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          zIndex: "999",
          backgroundColor: "white",
        }}
      >
        <div className="header-wrapper">
          <div className="section-padding">
            <div className="section-container p-l-r">
              <div className="row">
                <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 header-left mt-[20px]">
                  <div className="site-logo">
                    <a href="/">
                      <img
                        width="400"
                        height="79"
                        src={logochartport}
                        className="w-[150px] md:w-[120px] sm:w-[100px] xs:w-[80px]"
                        alt="Logo"
                      />
                    </a>
                  </div>
                </div>

                {/* Menu - Ẩn khi thanh tìm kiếm mở */}
                <div
                  className={`col-xl-6 col-lg-6 col-md-12 col-sm-12 text-center header-center mt-[30px] transition-all duration-500 ease-in-out ${
                    isSearchOpen
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                  }`}
                >
                  <div className="site-navigation">
                    <nav id="main-navigation">
                      <ul id="menu-main-menu" className="menu">
                        {/* home */}
                        <li
                          className={`level-0  ${
                            isActive("/") ? "current-menu-item" : ""
                          }`}
                        >
                          {" "}
                          <Link to="/" className="menu-item-text">
                            Home
                          </Link>
                        </li>

                        {/* list menu */}
                        <li
                          className={`level-0  ${
                            isActive("/shoplist") ? "current-menu-item" : ""
                          }`}
                        >
                          <a href="/shoplist">
                            <span className="menu-item-text">Shop</span>
                          </a>
                          <ul className="sub-menu " style={{ top: "111px" }}>
                            <li className="level-1 ">
                              <a href="/loginadmin">
                                <span className="menu-item-text">Admin</span>
                              </a>
                            </li>
                            <li className="level-1 ">
                              <a href="shop-grid-left.html">
                                <span className="menu-item-text">
                                  Adidas Shoes
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-left.html">
                                <span className="menu-item-text">
                                  Nike Shoes
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-left.html">
                                <span className="menu-item-text">Boost</span>
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-left.html">
                                <span className="menu-item-text">Sneaker</span>
                              </a>
                            </li>
                            <li>
                              <a href="shop-grid-left.html">
                                <span className="menu-item-text">
                                  Luxury Shoes
                                </span>
                              </a>
                            </li>
                          </ul>
                        </li>

                        {/* blog */}
                        <li
                          className={`level-0  ${
                            isActive("/blog") ? "current-menu-item" : ""
                          }`}
                        >
                          <a href="/blog">
                            <span className="menu-item-text">Blog</span>
                          </a>
                        </li>

                        {/* about */}
                        <li
                          className={`level-0  ${
                            isActive("/about") ? "current-menu-item" : ""
                          }`}
                        >
                          <a href="/about">
                            <span className="menu-item-text">About</span>
                          </a>
                        </li>

                        {/* contact */}
                        <li
                          className={`level-0  ${
                            isActive("/contact") ? "current-menu-item" : ""
                          }`}
                        >
                          <a href="/contact">
                            <span className="menu-item-text">Contact</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 header-right mt-[28px] md:ml-auto md:mr-0 ">
                  <div className="flex justify-end items-center space-x-4 gap-[15px]">
                    <button onClick={handleSearchClick}>
                      <i
                        className="fas fa-search text-lg ml-2"
                        style={{ fontSize: "25px" }}
                      ></i>
                    </button>
                    <div className="relative">
                      <a href="/wishlist">
                        <button>
                          <i
                            className="far fa-heart text-lg"
                            style={{ fontSize: "25px" }}
                          ></i>
                        </button>
                      </a>
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-black rounded-full">
                        {wishlisCount}
                      </span>
                    </div>

                    {/* phần Sidebar */}
                    <div>
                      {/* Nút mở sidebar */}
                      <button
                        onClick={toggleSidebar}
                        className="focus:outline-none"
                      >
                        <i
                          className="fa-solid fa-user text-lg"
                          style={{ fontSize: "25px" }}
                        ></i>
                      </button>

                      {/* Sidebar */}
                      <>
                        {/* Overlay */}
                        {isSidebarOpen && (
                          <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-1000"
                            onClick={toggleSidebar}
                          ></div>
                        )}

                        {/* Sidebar với lớp `custom-sidebar` */}
                        <div
                          className={`custom-sidebar ${
                            isSidebarOpen ? "open" : ""
                          }`}
                        >
                          {/* Thông tin người dùng */}
                          <div
                            className="flex items-center space-x-3 mb-6"
                            style={{ justifyContent: "space-around" }}
                          >
                            <a href="/profile" className="flex gap-[100px]">
                              <img
                                src={`http://127.0.0.1:8000${
                                  user ? user.image_user : "Ảnh"
                                }`}
                                alt={user ? user.firt_name : "User Avatar"}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-semibold">
                                  {user ? user.firt_name : "Guest"}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {user ? user.email : "guest@example.com"}
                                </div>
                              </div>
                            </a>
                          </div>
                          {/* Danh sách các mục menu */}
                          <ul className="space-y-2">
                            <li className="menu-item">
                              <i className="fa-solid fa-home mr-4"></i>
                              <span>Home</span>
                            </li>
                            <li className="menu-item">
                              <i className="fa-solid fa-box mr-4"></i>
                              <span>Products</span>
                            </li>
                            <li
                              className="menu-item cursor-pointer"
                              onClick={toggleSubmenu}
                            >
                              <i className="fa-solid fa-wallet mr-4"></i>
                              <span>Payments</span>
                              <i
                                className={` fa-solid fa-chevron-down ml-auto transition-transform duration-300 ${
                                  isSubmenuOpen ? "rotate-180" : ""
                                }`}
                              ></i>
                            </li>
                            {isSubmenuOpen && (
                              <ul
                                className={`text-left pl-8 mt-2 space-y-2 text-gray-500 text-sm transition-all duration-300 ease-in-out overflow-hidden ${
                                  isSubmenuOpen
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0 opacity-0"
                                }`}
                              >
                                <li className="submenu-item">Pay</li>
                                <li className="submenu-item">Get Paid</li>
                              </ul>
                            )}
                            <li className="menu-item">
                              <i className="fa-solid fa-user-friends mr-4"></i>
                              <span>Customers</span>
                            </li>
                            <li className="menu-item">
                              <i className="fa-solid fa-archive mr-4"></i>
                              <span>Resources</span>
                            </li>
                            <li className="menu-item relative">
                              <i className="fa-solid fa-bell mr-4"></i>
                              <span>Notifications</span>
                              <span className="notification-badge">5</span>
                            </li>
                            <li className="menu-item">
                              <i className="fa-solid fa-question-circle mr-4"></i>
                              <span>Support</span>
                            </li>
                            <li className="menu-item">
                              <i className="fa-solid fa-cog mr-4"></i>
                              <span>Settings</span>
                            </li>
                          </ul>

                          {/* login và logout */}
                          <div className="p-4">
                            {/* Kiểm tra trạng thái đăng nhập */}
                            {user ? (
                              <div className="mt-6 border-t border-gray-200 pt-4">
                                <button
                                  onClick={handleLogout}
                                  className="w-full px-4 py-2 border border-black text-black font-semibold rounded-lg hover:bg-gray-100 flex items-center justify-center"
                                >
                                  Logout
                                </button>
                              </div>
                            ) : (
                              <a href="/login">
                                <button className="w-full px-4 py-2 border border-black text-black font-semibold rounded-lg hover:bg-gray-100 flex items-center justify-center">
                                  Login
                                </button>
                              </a>
                            )}
                          </div>
                        </div>
                      </>
                    </div>

                    <div className="relative">
                      <a href="/shopcart">
                        <button>
                          <i
                            className="fas fa-shopping-bag text-lg"
                            style={{ fontSize: "25px" }}
                          ></i>
                        </button>
                      </a>
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-black rounded-full">
                        {carCount}
                      </span>
                      <div className="site-navigation justify-center items-center inline-flex">
                        {/* Nút 3 gạch hiển thị khi màn hình nhỏ */}
                        <div className="block relative md:hidden">
                          <button
                            className="text-black text-lg pb-4 absolute left-4"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                          >
                            <i className="fas fa-bars text-2xl"></i>
                          </button>

                          {/* Menu Di Động */}
                          <nav
                            className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${
                              isMenuOpen ? "translate-x-0" : "translate-x-full"
                            } lg:translate-x-0 lg:static lg:shadow-none`}
                            style={{
                              width: "30%",
                              maxWidth: "300px",
                            }}
                          >
                            <div className="p-6">
                              <button
                                className="text-black text-lg p-2 absolute top-2 right-2"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <i className="fas fa-times text-2xl"></i>
                              </button>
                              <ul className="space-y-4">
                                <li>
                                  <a
                                    href="/"
                                    className="block text-lg font-semibold"
                                  >
                                    Home
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="/shoplist"
                                    className="block text-lg font-semibold"
                                  >
                                    Shop
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="/about"
                                    className="block text-lg font-semibold"
                                  >
                                    About
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="/contact"
                                    className="block text-lg font-semibold"
                                  >
                                    Contact
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thanh tìm kiếm với gợi ý và sản phẩm */}
        {isSearchOpen && (
          <div
            className="absolute inset-0 z-50 bg-white flex flex-col items-center p-6 transition-all duration-500"
            style={{ height: "max-content" }}
          >
            <div className="w-full flex items-center justify-between">
              <div className="site-logo">
                <a href="/">
                  <img
                    width="400"
                    height="79"
                    src={logochartport}
                    style={{ width: "200px" }}
                  />
                </a>
              </div>

              {/* Thanh tìm kiếm */}
              <div className="flex items-center bg-gray-100 rounded-full w-full p-4 w-[1000px] h-[10px]">
                <i className="fas fa-search text-gray-500 ml-2"></i>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search"
                  className="bg-transparent outline-none text-gray-600 ml-4 w-full"
                  style={{ border: "none" }}
                />
              </div>

              {/* Nút Cancel */}
              <button
                onClick={handleSearchClick}
                className="text-black text-lg ml-4"
              >
                Cancel
              </button>
            </div>

            {/* Danh sách sản phẩm tìm kiếm */}
            <div className="grid grid-cols-5 grid-rows-5 gap-4">
              <div className="row-span-4">
                <p className="text-lg font-bold mb-2">Categories </p>
                {/* Hiển thị dữ liệu danh mục */}
                {Array.isArray(categories) &&
                  categories.map((cates) => (
                    <a href={`/categoriesnike/${cates.id}`} key={cates.id}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-[90px] flex justify-center items-center">
                          <img
                            src={cates.imageURL}
                            alt=""
                            className="w-[80px] h-[80px] rounded-full object-contain border-2 border-gray-300"
                          />
                        </div>
                        <div className="h-[100px] flex items-center">
                          <span className="text-left">{cates.name}</span>
                        </div>
                      </div>
                    </a>
                  ))}
              </div>

              <div className="col-span-4 row-span-4 flex justify-center">
                {/* Hiển thị dữ liệu sản phẩm mà người dùng tìm kiếm */}
                {Array.isArray(filteredProducts) &&
                filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <div
                      className="row-span-3 col-start-2 row-start-1 "
                      style={{
                        padding: "30px",
                        width: "210px",
                        height: "180px",
                      }}
                    >
                      <a
                        href="#"
                        onClick={() => goToProductDetail(product.id)}
                        key={index}
                      >
                        <div className="flex flex-col">
                          <img
                            src={`http://127.0.0.1:8000/storage/${product.image_product}`}
                            alt={product.name}
                            className="w-full h-32 object-cover"
                          />
                          <p className="text-black mt-2 text-sm w-full overflow-hidden whitespace-nowrap text-ellipsis">
                            {product.name}
                          </p>
                          <p className="text-black mt-1 text-sm">
                            ₫{product.price}
                          </p>
                        </div>
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-lg font-bold mb-2 col-span-4 text-center">
                    {recentSearches.length === 0 ? "No products found" : ""}
                  </p>
                )}

                {/* Hiển thị danh sách các từ khóa vừa tìm */}
                {recentSearches.length > 0 && filteredProducts.length === 0 && (
                  <div className="recent-searches mt-4 w-[100%]">
                    <p className="text-lg font-bold mb-2 mt-[-20px]">
                      Kết quả tìm kiếm gần đây
                    </p>
                    <ul>
                      {recentSearches.map((term, index) => (
                        <li
                          key={index}
                          className="mt-2 text-gray-500 flex justify-between items-center"
                        >
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              navigate(`/searchresults?query=${term}`);
                              setIsSearchOpen(false); // Ẩn thanh tìm kiếm sau khi nhấn
                            }}
                          >
                            {term}
                          </span>
                          <button
                            onClick={() => handleDeleteSearchTerm(term)}
                            className="text-black-500 hover:text-red-700 ml-4"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderClientC;
