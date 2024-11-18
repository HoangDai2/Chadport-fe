import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../pages/AuthClient/Validation"; // Import schema
import apisphp from "../../Service/api"; // Import API
import { useUserContext } from "../../pages/AuthClient/UserContext"; // Import context để lưu thông tin người dùng
import logo from "../../img/logochadport.png"; // Logo

const LoginAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext(); // Set thông tin người dùng vào context

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema, // Thêm schema từ Validation.tsx
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await apisphp.post("/user/login", values);

        if (response.data.message === "Successfully logged in") {
          const userData = response.data.data; // Dữ liệu người dùng trả về
          const token = response.data.token;

          // Kiểm tra role_id, chỉ cho phép role_id = 4
          if (userData.role_id === 4) {
            setUser(userData); // Lưu thông tin người dùng vào context
            localStorage.setItem("jwt_token", token); // Lưu token vào localStorage
            navigate("/admin"); // Điều hướng đến trang admin
          } else {
            setErrors({ email: "Bạn không có quyền truy cập trang admin." });
          }
        } else {
          setErrors({ email: response.data.error || "Đăng nhập không thành công." });
        }
      } catch (error) {
        setErrors({ email: "Thông tin đăng nhập không chính xác." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-left bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between h-[30px]">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Admin Login
          </h2>
          <img src={logo} alt="Logo" className="w-[100px]" />
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-[25px]">
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 mb-2">{formik.errors.email}</div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
            />
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500 mb-2">{formik.errors.password}</div>
          )}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <a href="#forgot" className="text-black text-sm hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {formik.isSubmitting ? "Processing..." : "Login"}
          </button>
        </form>
        <p className="text-gray-600 text-sm text-center mt-4">
          Need help?{" "}
          <a href="#support" className="text-black hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginAdmin;
