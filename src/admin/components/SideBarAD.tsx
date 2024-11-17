import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

const SideBarAD = (props: Props) => {
  // Khai báo trạng thái mở rộng cho các mục quản lý trong menu
  const [openSections, setOpenSections] = useState<{
    orderManagement: boolean;
    productManagement: boolean;
    categoryManagement: boolean;
    userManagement: boolean;
  }>({
    // mặc định đóng cho 4 lựa chọn
    orderManagement: false,
    productManagement: false,
    categoryManagement: false,
    userManagement: false,
  });

  // Khai báo trạng thái cho đường dẫn đang được chọn
  const [activeLink, setActiveLink] = useState<string>("");

  // Hàm toggleSection để bật/tắt phần mở rộng của mục quản lý khi người dùng nhấn vào
  const toggleSection = (
    section:
      | "orderManagement"
      | "productManagement"
      | "categoryManagement"
      | "userManagement"
  ) => {
    setOpenSections((prevState) => ({
      ...prevState, // Sao chép lại trạng thái trước đó
      [section]: !prevState[section], // Đảo ngược trạng thái mở hoặc đóng cho mục được chọn
    }));
  };

  // Hàm handleLinkClick để cập nhật đường dẫn đang được chọn khi người dùng nhấn vào một liên kết
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar__logo">
          <i className="fa-solid fa-chart-line"></i>
          <p className="logo_txt">Dashboard</p>
        </div>

        <div className="lists">
          <ul className="space-y-2">
            <li>
              <a href="/admin">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>home</title>
                  <path
                    fill="black"
                    d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
                  />
                </svg>
                <span>Home</span>
              </a>
            </li>

            {/* Quản lí người dùng  */}
            <li>
              <a href="#" className="flex items-center justify-between">
                <svg
                  viewBox="0 0 640 512"
                  fill="currentColor"
                  width="30px"
                  {...props}
                >
                  <path d="M96 0C43 0 0 43 0 96v320c0 53 43 96 96 96h448c53 0 96-43 96-96V96c0-53-43-96-96-96H96zM64 96c0-17.7 14.3-32 32-32h448c17.7 0 32 14.3 32 32v320c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96zm159.8 80c0-26.5-21.5-48-48-48s-48 21.5-48 48 21.5 48 48 48 48-21.5 48-48zM96 309.3c0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6-7.5-4.1-16.2-6.4-25.3-6.4h-69.4c-29.4 0-53.3 23.9-53.3 53.3zM461.2 336h56.1c14.7 0 26.7-11.9 26.7-26.7 0-29.5-23.9-53.3-53.3-53.3h-69.4c-9.2 0-17.8 2.3-25.3 6.4 32.4 11.9 57.2 39.5 65.2 73.6zM372 289c-3.9-.7-7.9-1-12-1h-80c-4.1 0-8.1.3-12 1-26 4.4-47.3 22.7-55.9 47-2.7 7.5-4.1 15.6-4.1 24 0 13.3 10.7 24 24 24h176c13.3 0 24-10.7 24-24 0-8.4-1.4-16.5-4.1-24-8.6-24.3-29.9-42.6-55.9-47zm140-113c0-26.5-21.5-48-48-48s-48 21.5-48 48 21.5 48 48 48 48-21.5 48-48zm-192 80c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64z" />
                </svg>
                <button
                  onClick={() => toggleSection("userManagement")}
                  className="w-full text-left font-semibold"
                >
                  User Management
                </button>
                <svg
                  className={`transition-transform ${
                    openSections.userManagement ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>

              {openSections.userManagement && (
                <ul className="cursor-pointer mt-[10px] pl-[52px] space-y-1 text-sm text-gray-700 text-left">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-black rounded-full mr-2"></span>
                    <Link
                      to="/admin/listuser"
                      onClick={() => handleLinkClick("/admin/listuser")}
                      className={`text-[13px] ${
                        activeLink === "/admin/listuser"
                          ? "text-blue-500"
                          : "text-black"
                      }`}
                    >
                      List of users
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-black rounded-full mr-2"></span>
                    <Link
                      to="/admin/listuser1"
                      onClick={() => handleLinkClick("/admin/listuser1")}
                      style={{
                        fontSize: "13px",
                        color:
                          activeLink === "/admin/listuser1" ? "blue" : "black",
                      }}
                    >
                      User feedback
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* quản lí sản phẩm  */}
            <li>
              <a href="#" className="flex items-center justify-between">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  width="30px"
                  {...props}
                >
                  <defs>
                    <style />
                  </defs>
                  <path d="M464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H212V212h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zm52 132H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200zM424 712H296V584c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v128H104c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h128v128c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V776h128c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" />
                </svg>
                <button
                  onClick={() => toggleSection("productManagement")}
                  className="w-full text-left font-semibold"
                >
                  Product Management
                </button>
                <svg
                  className={`transition-transform ${
                    openSections.productManagement ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>

              {openSections.productManagement && (
                <ul className="cursor-pointer mt-[10px] pl-[52px] space-y-1 text-sm text-gray-700 text-left">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-black rounded-full mr-2"></span>
                    <Link
                      to="/admin/products"
                      onClick={() => handleLinkClick("/admin/products")}
                      className={`text-[13px] ${
                        activeLink === "/admin/products"
                          ? "text-blue-500"
                          : "text-black"
                      }`}
                    >
                      All Products
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-black rounded-full mr-2"></span>
                    <Link
                      to="/admin/products/add"
                      onClick={() => handleLinkClick("/admin/products/add")}
                      style={{
                        fontSize: "13px",
                        color:
                          activeLink === "/admin/products/add"
                            ? "blue"
                            : "black",
                      }}
                    >
                      Add Products
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* quản lí danh mục */}
            <li>
              <a href="#" className="flex items-center justify-between">
                <svg fill="none" viewBox="0 0 24 24" width="30px" {...props}>
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M9 1H1v8h8V6h2v14h4v3h8v-8h-8v3h-2V6h2v3h8V1h-8v3H9V1zm12 2h-4v4h4V3zm-4 14h4v4h-4v-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <button
                  onClick={() => toggleSection("categoryManagement")}
                  className="w-full text-left font-semibold"
                >
                  Portfolio Management
                </button>
                <svg
                  className={`transition-transform ${
                    openSections.categoryManagement ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>

              {openSections.categoryManagement && (
                <ul className="cursor-pointer mt-[10px] pl-[52px] space-y-1 text-sm text-gray-700 text-left">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-black rounded-full mr-2"></span>
                    <Link
                      to="/admin/categorieslist"
                      onClick={() => handleLinkClick("/admin/categorieslist")}
                      className={`text-[13px] ${
                        activeLink === "/admin/categorieslist"
                          ? "text-blue-500"
                          : "text-black"
                      }`}
                    >
                      All Categories
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-black rounded-full mr-2"></span>
                    <Link
                      to="/admin/categories/add"
                      onClick={() => handleLinkClick("/admin/categories/add")}
                      style={{
                        fontSize: "13px",
                        color:
                          activeLink === "/admin/categories/add"
                            ? "blue"
                            : "black",
                      }}
                    >
                      Add Categories
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* quản lí đơn hàng  */}
            <li>
              <a href="#" className="flex items-center justify-between">
                <svg width="30px" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M470.7 9.4c3 3.1 5.3 6.6 6.9 10.3s2.4 7.8 2.4 12.2V128c0 17.7-14.3 32-32 32s-32-14.3-32-32v-18.7L310.6 214.6c-11.8 11.8-30.8 12.6-43.5 1.7L176 138.1l-91.2 78.2c-13.4 11.5-33.6 9.9-45.1-3.5s-9.9-33.6 3.5-45.1l112-96c12-10.3 29.7-10.3 41.7 0l89.5 76.7L370.7 64H352c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c8.8 0 16.8 3.6 22.6 9.3l.1.1zM0 304c0-26.5 21.5-48 48-48h416c26.5 0 48 21.5 48 48v160c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V304zm48 112v48h48c0-26.5-21.5-48-48-48zm48-112H48v48c26.5 0 48-21.5 48-48zm368 112c-26.5 0-48 21.5-48 48h48v-48zm-48-112c0 26.5 21.5 48 48 48v-48h-48zm-96 80c0-35.3-28.7-64-64-64s-64 28.7-64 64 28.7 64 64 64 64-28.7 64-64z" />
                </svg>
                <button
                  onClick={() => toggleSection("orderManagement")}
                  className="w-full text-left font-semibold"
                >
                  Order Management
                </button>
                {/* Arrow icon that rotates when submenu is open */}
                <svg
                  className={`transition-transform ${
                    openSections.orderManagement ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>

              {/* Submenu Items with Bullet Points */}
              {openSections.orderManagement && (
                <ul className="cursor-pointer mt-[10px] pl-[52px] space-y-1 text-sm text-gray-700 text-left">
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-black rounded-full mr-2"></span>
                    <Link
                      to="/admin/orders"
                      onClick={() => handleLinkClick("/admin/orders")}
                      className={`text-[13px] ${
                        activeLink === "/admin/orders"
                          ? "text-blue-500"
                          : "text-black"
                      }`}
                    >
                      All orders
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-black rounded-full mr-2"></span>
                    <a
                      href="/admin/cancel-orders"
                      onClick={() => handleLinkClick("/admin/cancel-orders")}
                      style={{
                        fontSize: "13px",
                        color:
                          activeLink === "/admin/cancel-orders"
                            ? "blue"
                            : "black",
                      }}
                    >
                      Cancellation
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-black rounded-full mr-2"></span>
                    <a
                      href="/admin/returns"
                      onClick={() => handleLinkClick("/admin/returns")}
                      style={{
                        fontSize: "13px",
                        color:
                          activeLink === "/admin/returns" ? "blue" : "black",
                      }}
                    >
                      Returns/Refunds
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="w-1 h-1 bg-black rounded-full mr-2"></span>
                    <a
                      href="/admin/loginad"
                      onClick={() =>
                        handleLinkClick("/admin/shipping-settings")
                      }
                      style={{
                        fontSize: "13px",
                        color:
                          activeLink === "/admin/loginad" ? "blue" : "black",
                      }}
                    >
                      Shipping Settings
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a href="/admin/test">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>account-group</title>
                  <path
                    fill="black"
                    d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"
                  />
                </svg>
                <span>Communities</span>
              </a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>cog</title>
                  <path
                    fill="black"
                    d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                  />
                </svg>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>file-question</title>
                  <path
                    fill="black"
                    d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M13,3.5L18.5,9H13V3.5M12,11A3,3 0 0,1 15,14C15,15.88 12.75,16.06 12.75,17.75H11.25C11.25,15.31 13.5,15.5 13.5,14A1.5,1.5 0 0,0 12,12.5A1.5,1.5 0 0,0 10.5,14H9A3,3 0 0,1 12,11M11.25,18.5H12.75V20H11.25V18.5Z"
                  />
                </svg>
                <span>Support</span>
              </a>
            </li>
            <li>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>shield-check</title>
                  <path
                    fill="black"
                    d="M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z"
                  />
                </svg>
                <span>Privacy</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBarAD;
