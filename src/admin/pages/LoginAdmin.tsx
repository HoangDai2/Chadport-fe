import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../pages/AuthClient/Validation"; // Import schema
import apisphp from "../../Service/api"; // Import API
import { useUserContext } from "../../pages/AuthClient/UserContext"; // Import context để lưu thông tin người dùng

const LoginAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await apisphp.post("/admin/login", values);

        if (response.data.message === "Successfully logged in") {
          const userData = response.data.data;
          const token = response.data.token;

          if ([1, 2].includes(userData.role_id)) {
            setUser(userData);
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
    <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
      <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74]">Admin Login</h2>
          <p className="text-sm mt-4 text-[#002D74]">
            If you already a member, easily log in now.
          </p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Processing..." : "Login"}
            </button>
          </form>
          <div className="mt-6 items-center text-gray-100">
            <hr className="border-gray-300" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-300" />
          </div>
          <button
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium"
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Login with Google
          </button>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[1600px]"
            src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="login form image"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginAdmin;
