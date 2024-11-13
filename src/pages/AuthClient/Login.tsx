import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apisphp from "../../Service/api";
import logo from "../../img/logochadport.png";
import gg from "../../img/logogg.jpg";
import fb from "../../img/fb.jpg";
import bannerlogin from "../../img/bannerlogin.jpg";
import TUser from "../../Types/TUsers";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema, registerValidationSchema } from "./Validation";
import { useUserContext } from "./UserContext";
import Cookies from "js-cookie";

// Biểu tượng spinner loading
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 mr-2 text-black"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8z"
    ></path>
  </svg>
);

const LoginRegister: React.FC = () => {
  const { setUser } = useUserContext();
  const [loginData, setLoginData] = useState<TUser>({
    email: "",
    password: "",
    role_id: 0,
    status: "active",
    firt_name: "",
    last_name: "",
    gender: "other",
    birthday: "",
    address: "",
    img_user: "",
    phonenumber: "",
    user_id: 0,
    date_create: "",
    date_update: "",
    id: "",
  });
  const [registerData, setRegisterData] = useState<TUser>({
    email: "",
    password: "",
    role_id: 2, // Giá trị mặc định cho người dùng đăng ký mới
    status: "active",
    firt_name: "",
    last_name: "",
    gender: "other",
    birthday: "",
    address: "",
    img_user: "",
    phonenumber: "",
    user_id: 0, // user_id sẽ được backend cấp khi đăng ký
    date_create: new Date().toISOString(),
    date_update: new Date().toISOString(),
    id: "",
  });
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Xử lý đăng nhập
  const handleLoginSubmit = async (
    values: Partial<TUser>,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setLoading(true);
    setFormError("");

    try {
      const response = await apisphp.post("/user/login", {
        email: values.email,
        password: values.password,
      });
      console.log(response.data);
      if (response.data.message === "Successfully logged in") {
        const userData = response.data.data; //  API trả về dữ liệu người dùng
        const token = response.data.token;
        setUser(userData); // Lưu thông tin người dùng vào context
        console.log(token);

        // Lưu token vào cookie (expires: 1 ngày, secure nếu dùng HTTPS)
        Cookies.set("authToken", token, { expires: 1, secure: true });

        setTimeout(() => {
          navigate("/");
          setLoading(false);
        }, 2000);
      } else if (response.data.error) {
        setFormError(response.data.error);
      }
    } catch (error: any) {
      setFormError("Thông tin tài khoản không chính xác");
    }
    setLoading(false);
    setSubmitting(false);
  };

  // Xử lý đăng ký
  const handleRegisterSubmit = async (
    values: Partial<TUser>,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setLoading(true);
    setFormError("");
    try {
      const registerResponse = await apisphp.post("/user/register", {
        ...values,
        role_id: 2,
        status: "active",
        date_create: new Date().toISOString(),
        date_update: new Date().toISOString(),
      });

      if (registerResponse.status === 201) {
        setTimeout(() => {
          setIsLogin(true);
          setLoading(false);
          navigate("/login");
        }, 1500);
      } else {
        setFormError("Đã xảy ra lỗi trong quá trình đăng ký.");
      }
    } catch (error: any) {
      setFormError("Đã xảy ra lỗi trong quá trình đăng ký.");
    }
    setLoading(false);
    setSubmitting(false);
  };

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">Login / Register</h1>
              </div>
              <div className="breadcrumbs">
                <a href="index.html">Home</a>
                <span className="delimiter"></span>Login / Register
              </div>
            </div>
          </div>
          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container p-l-r">
                <div className="page-login-register">
                  <div className="row">
                    <div className="flex min-h-screen items-center justify-center px-4 md:px-8 lg:px-12 pt-16">
                      <div className="bg-white shadow-lg rounded-lg flex flex-col lg:flex-row w-full max-w-5xl overflow-hidden h-[650px]">
                        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
                          <div>
                            <div className="text-left mb-6">
                              <img
                                src={logo}
                                alt="Logo"
                                className="w-25 h-12 mb-4 object-contain"
                              />
                              <h2 className="text-3xl text-center font-bold text-gray-800 mb-2">
                                {isLogin ? "Login" : "Register"}
                              </h2>
                              <p className="text-gray-500 text-center text-sm">
                                {isLogin
                                  ? "How do I get started blazein dolor at?"
                                  : "Create your account to get started!"}
                              </p>
                            </div>
                            <Formik
                              initialValues={{
                                email: "",
                                password: "",
                                firt_name: "",
                                last_name: "",
                              }}
                              validationSchema={
                                isLogin
                                  ? loginValidationSchema
                                  : registerValidationSchema
                              }
                              onSubmit={
                                isLogin
                                  ? handleLoginSubmit
                                  : handleRegisterSubmit
                              }
                            >
                              {({ isSubmitting, errors, touched }) => (
                                <Form className="space-y-4 text-left">
                                  {formError && (
                                    <div className="error-message text-red-500">
                                      {formError}
                                    </div>
                                  )}
                                  {successMessage && (
                                    <div className="success-message text-green-500">
                                      {successMessage}
                                    </div>
                                  )}

                                  {!isLogin && (
                                    <div className="flex space-x-4">
                                      <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-medium">
                                          Tên{" "}
                                          <span className="text-red-500">
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          type="text"
                                          name="firt_name"
                                          className={`mt-1 p-2 w-full border ${
                                            errors.firt_name &&
                                            touched.firt_name
                                              ? "border-red-500"
                                              : "border-gray-300"
                                          } rounded focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                        />
                                        <ErrorMessage
                                          name="firt_name"
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                      <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-medium">
                                          Họ{" "}
                                          <span className="text-red-500">
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          type="text"
                                          name="last_name"
                                          className={`mt-1 p-2 w-full border ${
                                            errors.last_name &&
                                            touched.last_name
                                              ? "border-red-500"
                                              : "border-gray-300"
                                          } rounded focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                        />
                                        <ErrorMessage
                                          name="last_name"
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                    </div>
                                  )}

                                  <div>
                                    <label className="block text-gray-700 text-sm font-medium">
                                      Email{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                      type="email"
                                      name="email"
                                      className={`mt-1 p-2 w-full border ${
                                        errors.email && touched.email
                                          ? "border-red-500"
                                          : "border-gray-300"
                                      } rounded focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                      placeholder="example@gmail.com"
                                    />
                                    <ErrorMessage
                                      name="email"
                                      component="div"
                                      className="text-red-500 text-sm"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-gray-700 text-sm font-medium">
                                      Mật khẩu{" "}
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                      type="password"
                                      name="password"
                                      className={`mt-1 p-2 w-full border ${
                                        errors.password && touched.password
                                          ? "border-red-500"
                                          : "border-gray-300"
                                      } rounded focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                      placeholder="YourPassword123"
                                    />
                                    <ErrorMessage
                                      name="password"
                                      component="div"
                                      className="text-red-500 text-sm"
                                    />
                                  </div>

                                  <div className="flex justify-between items-center text-sm">
                                    {isLogin && (
                                      <label className="flex items-center">
                                        <Field
                                          type="checkbox"
                                          name="remember"
                                          className="mr-2"
                                        />
                                        <span className="text-gray-700">
                                          Nhớ đăng nhập
                                        </span>
                                      </label>
                                    )}
                                    <a
                                      href="#"
                                      className="text-black-600 hover:underline"
                                    >
                                      {isLogin ? "Quên mật khẩu?" : ""}
                                    </a>
                                  </div>

                                  <button
                                    type="submit"
                                    className="w-full px-4 py-2 border border-black text-black font-semibold rounded-lg hover:bg-gray-100 flex items-center justify-center"
                                    disabled={isSubmitting || loading}
                                  >
                                    {loading && <LoadingSpinner />}
                                    {loading
                                      ? "Đang xử lý..."
                                      : isLogin
                                      ? "Đăng nhập"
                                      : "Đăng ký"}
                                  </button>
                                </Form>
                              )}
                            </Formik>
                            <div className="text-center mt-4">
                              <button
                                className="text-black-600 hover:underline"
                                onClick={() => setIsLogin(!isLogin)}
                              >
                                {isLogin
                                  ? "Or Create Account"
                                  : "Back to Login"}
                              </button>
                            </div>
                          </div>
                          <div>
                            <div className="relative w-full">
                              <div className="absolute w-full h-px bg-gray-300"></div>
                            </div>
                            <div className="flex items-center justify-center mt-4 space-x-4">
                              <button className="flex items-center bg-gray-100 px-4 py-2 rounded-lg border text-sm w-48 justify-center">
                                <img
                                  src={gg}
                                  alt="Google Icon"
                                  className="w-5 h-5 mr-2"
                                />
                                Sign in with Google
                              </button>
                              <button className="flex items-center bg-gray-100 px-4 py-2 rounded-lg border text-sm w-48 justify-center">
                                <img
                                  src={fb}
                                  alt="Facebook Icon"
                                  className="w-5 h-5 mr-2"
                                />
                                Sign in with Facebook
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="hidden lg:flex lg:w-1/2  from-purple-500 to-indigo-500 items-center justify-center rounded-r-lg relative">
                          <img
                            src={bannerlogin}
                            alt="Background"
                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                          />

                          <div className="relative p-12 max-w-sm rounded-lg shadow-lg overflow-hidden">
                            <div className="absolute inset-0  bg-opacity-30 backdrop-blur-[5px] rounded-lg"></div>
                            <div className="relative text-center text-black z-10">
                              <h2 className="text-left font-semibold">
                                Chào mừng bạn đến với Chadport của chúng tôi,Cần
                                hỗ trợ hay liên hệ gấp với đội ngũ của chúng tôi
                                ✨
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
