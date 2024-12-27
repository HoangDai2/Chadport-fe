import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  FaHome,
  FaBookmark,
  FaUsers,
  FaGlobe,
  FaFileAlt,
  FaSitemap,
  FaLuggageCart,
} from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri";

import logo from "../../img/logochadport.png";
type Props = {};

const SideBarAD = (props: Props) => {
  // Lấy thông tin URL hiện tại
  const location = useLocation();

  // Trạng thái mở rộng cho các mục quản lý
  const [openSections, setOpenSections] = useState<{
    orderManagement: boolean;
    productManagement: boolean;
    categoryManagement: boolean;
    userManagement: boolean;
  }>({
    orderManagement: false,
    productManagement: false,
    categoryManagement: false,
    userManagement: false,
  });

  // Trạng thái active cho link được chọn
  const [activeLink, setActiveLink] = useState<string>("");

  // Đồng bộ trạng thái active với URL hiện tại
  useEffect(() => {
    setActiveLink(location.pathname);

    // Mở rộng mục tương ứng nếu URL nằm trong nhóm của nó
    if (location.pathname.includes("/admin/orders")) {
      setOpenSections((prev) => ({ ...prev, orderManagement: true }));
    } else if (location.pathname.includes("/admin/products")) {
      setOpenSections((prev) => ({ ...prev, productManagement: true }));
    } else if (location.pathname.includes("/admin/categories")) {
      setOpenSections((prev) => ({ ...prev, categoryManagement: true }));
    } else if (location.pathname.includes("/admin/users")) {
      setOpenSections((prev) => ({ ...prev, userManagement: true }));
    }
  }, [location.pathname]); // Theo dõi sự thay đổi của pathname

  // Toggle mở/đóng mục quản lý
  const toggleSection = (
    section:
      | "orderManagement"
      | "productManagement"
      | "categoryManagement"
      | "userManagement"
  ) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // Hàm cập nhật trạng thái active khi nhấn vào liên kết
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <>
      <div className="flex h-screen flex-col justify-between border-e bg-white w-[20%] fixed left-0 top-0 z-10">
        <div className="px-4 py-6">
          <a
            className="navbar-brand py-lg-2 mb-lg-5   me-0 flex items-center justify-center"
            href="/admin"
          >
            <h3 className="text-success flex items-center">
              <img src={logo} width="150" className="mr-2" />
            </h3>
          </a>
          <ul className="menu-list pl-0">
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <Link
                    to="/admin"
                    className="text-sm font-medium flex items-center"
                  >
                    <FaHome className="menu-icon mr-2" /> Dashboard
                  </Link>
                </summary>
              </details>
            </li>

            {/* product */}
            <li>
              <details
                open={openSections.productManagement}
                className="group [&_summary::-webkit-details-marker]:hidden"
              >
                <summary
                  onClick={() => toggleSection("productManagement")}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="text-sm font-medium flex items-center">
                    <RiPlayListAddFill className="menu-icon mr-2" /> Product
                  </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="text-left mt-2 space-y-1 border-l-2 border-gray-200 pl-2">
                  <li>
                    <Link
                      to="/admin/products"
                      onClick={() => handleLinkClick("/admin/products")}
                      className={`block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:pl-6 ${
                        activeLink === "/admin/products"
                          ? "bg-gray-200 text-gray-700 font-semibold"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      View Product
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/admin/products/add"
                      onClick={() => handleLinkClick("/admin/products/add")}
                      className={`block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:pl-6 ${
                        activeLink === "/admin/products/add"
                          ? "bg-gray-200 text-gray-700 font-semibold"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      Add Product
                    </Link>
                  </li>
                </ul>
              </details>
            </li>

            {/* cateegories */}
            <li>
              <details
                open={openSections.categoryManagement}
                className="group [&_summary::-webkit-details-marker]:hidden"
              >
                <summary
                  onClick={() => toggleSection("categoryManagement")}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="text-sm font-medium flex items-center">
                    <FaSitemap className="menu-icon mr-2" /> Categories
                  </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="text-left mt-2 space-y-1 border-l-2 border-gray-200 pl-2">
                  <li>
                    <Link
                      to="/admin/categorieslist"
                      onClick={() => handleLinkClick("/admin/categorieslist")}
                      className={`block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:pl-6 ${
                        activeLink === "/admin/categorieslist"
                          ? "bg-gray-200 text-gray-700 font-semibold"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      View Categories
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/admin/categories/add"
                      onClick={() => handleLinkClick("/admin/categories/add")}
                      className={`block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:pl-6 ${
                        activeLink === "/admin/categories/add"
                          ? "bg-gray-200 text-gray-700 font-semibold"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      Add Categories
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            {/* order */}
            <li>
              <details
                open={openSections.orderManagement}
                className="group [&_summary::-webkit-details-marker]:hidden"
              >
                <summary
                  onClick={() => toggleSection("orderManagement")}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="text-sm font-medium flex items-center">
                    <FaLuggageCart className="menu-icon mr-2" /> Order
                  </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="text-left mt-2 space-y-1 border-l-2 border-gray-200 pl-2">
                  <li>
                    <Link
                      to="/admin/orders"
                      onClick={() => handleLinkClick("/admin/orders")}
                      className={`block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:pl-6 ${
                        activeLink === "/admin/orders"
                          ? "bg-gray-200 text-gray-700 font-semibold"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      View Order
                    </Link>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-300 hover:pl-6"
                    >
                      Add Categories
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            {/* user */}
            <li>
              <details
                open={openSections.userManagement}
                className="group [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <Link
                    to="/admin/listuser"
                    className="text-sm font-medium flex items-center"
                  >
                    <FaUsers className="menu-icon mr-2" /> Users
                  </Link>
                </summary>
              </details>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium flex items-center">
                    <FaGlobe className="menu-icon mr-2" /> Ranking
                  </span>
                </summary>
              </details>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium flex items-center">
                    <FaFileAlt className="menu-icon mr-2" /> Posts
                  </span>
                </summary>
              </details>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white">
          <a href="#" className="flex items-center gap-2 p-4 hover:bg-gray-50">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">Eric Frusciante</strong>
                <span> eric@frusciante.com </span>
              </p>
            </div>
          </a>

          <button
            type="submit"
            className="group relative flex items-center justify-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBarAD;
