import React, { useEffect, useState } from "react";
import logochartport from "../img/logochadport.png";
import { useNavigate } from "react-router-dom";
import TProduct from "../Types/TProduct";
import axios from "axios";
import Tcategory from "../Types/TCategories";

const Headerclient = () => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<TProduct[]>([]); // Khai báo kiểu dữ liệu cho sản phẩm
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
  const [categories, setCategories] = useState<Tcategory[]>([]); // Khai báo kiểu dữ liệu cho sản phẩm đã lọc
  const navigate = useNavigate();

  // Lấy dữ liệu sản phẩm từ API để làm chức năng tìm kiếm sản phẩm theo từ khóa
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
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
        const cate = await axios.get("http://localhost:3000/categories");
        setCategories(cate.data);
        // console.log(cate);
      } catch (error) {
        console.error("lỗi get products:", error);
      }
    };

    fetchCategories();
  }, []);

  // chức năng thích sản phẩm
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

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUserName(null);
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
                    <button onClick={handleSearchClick}>
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
            <div className="w-full mt-4 grid grid-cols-5 grid-rows-5 gap-4">
              <div className="row-span-4 col-span-1 flex flex-col">
                <p className="text-lg font-bold mb-2">Categories Suggestions</p>
                {/* show dữ liệu danh mục  */}
                {categories.map((cates) => (
                  <a href={`/categoriesnike/${cates.id}`}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-center items-center h-[90px]">
                        <img
                          src={cates.imageURL}
                          alt=""
                          className="w-[80px] h-[80px] rounded-full object-contain border-2 border-gray-300"
                        />
                      </div>
                      <div className="flex justify-center items-center h-[100px]">
                        {cates.name}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="col-span-4 row-span-4 flex flex-wrap gap-[6.5rem]">
                {/* show dữ liệu sản phẩm mà người dùng tìm kiếm */}
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <a href="" onClick={() => goToProductDetail(product.id)}>
                      <div key={index} className="flex flex-col items-center">
                        <img
                          src={product.image_product}
                          alt={product.name}
                          className="w-32 h-32 object-cover"
                        />
                        <p className="text-black mt-2 text-sm w-32 overflow-hidden whitespace-nowrap text-ellipsis">
                          {product.name}
                        </p>
                        <p className="text-black mt-1 text-sm">
                          ₫{product.price}
                        </p>
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-gray-500">No products found</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Headerclient;
