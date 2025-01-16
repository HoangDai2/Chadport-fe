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
            <hr className="border-gray-300" />
          </div>
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
