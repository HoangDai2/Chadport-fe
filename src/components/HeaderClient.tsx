import React, { useEffect, useState } from "react";
import logochartport from "../img/logochadport.png";
import { useNavigate } from "react-router-dom";
const Headerclient = () => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(wishlist.length);
    };
    updateWishlistCount();
    window.addEventListener("storage", updateWishlistCount);
    return () => {
      window.removeEventListener("storage", updateWishlistCount);
    };
  }, []);
  useEffect(() => {
    const updatedCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCarCount(cart.length);
    };
    updatedCartCount();
    window.addEventListener("storage", updatedCartCount);
    return () => {
      window.removeEventListener("storage", updatedCartCount);
    };
  }, []);

  useEffect(() => {
    // Kiểm tra sessionStorage để lấy thông tin người dùng
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.username || user.email); // Hiển thị tên hoặc email của người dùng
    } else {
      setUserName(null); // Đặt userName là null nếu không có thông tin
    }
  }, []);

  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi sessionStorage
    sessionStorage.removeItem("user");
    setUserName(null); // Cập nhật state để hiển thị nút Login
    navigate("/login"); // Điều hướng đến trang login sau khi đăng xuất
  };
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
                        style={{ width: "200px" }}
                      />
                    </a>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 text-center header-center mt-[30px]">
                  <div className="site-navigation">
                    <nav id="main-navigation">
                      <ul id="menu-main-menu" className="menu">
                        <li className="level-0 menu-item">
                          <a href="/" className="menu-item-text">
                            Home
                          </a>
                        </li>
                        <li className="level-0 menu-item menu-item-has-children current-menu-item">
                          <a href="/shoplist">
                            <span className="menu-item-text">Shop</span>
                          </a>
                          <ul className="sub-menu " style={{ top: "111px" }}>
                            <li className="level-1 menu-item">
                              <a href="/admin">
                                <span className="menu-item-text">Admin</span>
                              </a>
                            </li>
                            <li className="level-1 menu-item">
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
                        <li className="level-0 menu-item mega-menu mega-menu-fullwidth align-center">
                          <a href="blog-grid-left.html">
                            <span className="menu-item-text">Blog</span>
                          </a>
                        </li>
                        <li className="level-0 menu-item">
                          <a href="/about">
                            <span className="menu-item-text">About</span>
                          </a>
                        </li>
                        <li className="level-0 menu-item">
                          <a href="page-contact.html">
                            <span className="menu-item-text">Contact</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 header-right mt-[28px]">
                  <div className="flex items-center space-x-4 gap-[15px]">
                    {userName ? (
                      <>
                        <span>{userName}</span>
                        <button onClick={handleLogout} className="ml-4">
                          Logout
                        </button>
                      </>
                    ) : (
                      <ul className="sub-menu " style={{ top: "111px" }}>
                      <li className="level-0 menu-item">
                      <a
                        href="/login"
                        className="text-black hover:text-gray-400"
                      >
                        Login
                      </a>
                      </li>
                      </ul>
                    )}
                    <button>
                      <i
                        className="fas fa-search text-lg"
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
                        {wishlistCount}
                      </span>
                    </div>
                    <div className="relative">
                      <a href="/profile">
                        <button>
                          <i
                            className="fa-solid fa-user text-lg"
                            style={{ fontSize: "25px" }}
                          ></i>
                        </button>
                      </a>
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-black rounded-full">
                        {wishlistCount}
                      </span>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headerclient;
