import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginRegister: React.FC = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [registerData, setRegisterData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      setFormError("Please fill in both username and password.");
      return;
    }
    setFormError("");

    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      const user = users.find(
        (u: any) =>
          (u.email === loginData.username ||
            u.phonenumber === loginData.username) &&
          u.password === loginData.password
      );

      if (user) {
        // Kiểm tra trạng thái tài khoản
        if (user.status === "inactive") {
          setFormError(
            "Tài khoản của bạn đã bị khóa Vui lòng liên hệ với bộ phận hỗ trợ"
          );
          return;
        }

        setLoginSuccess(true);
        setFormError("");

        // Lưu thông tin người dùng vào sessionStorage
        sessionStorage.setItem("user", JSON.stringify(user));

        // Reload lại trang để cập nhật header
        window.location.reload();

        navigate("/");
      } else {
        setFormError("Invalid username or password.");
      }
    } catch (error) {
      setFormError("An error occurred while logging in.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!registerData.email || !registerData.password) {
      setFormError("Please fill in both email and password.");
      return;
    }
    setFormError("");

    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const userExists = users.some((u: any) => u.email === registerData.email);

      if (userExists) {
        setFormError("Email is already registered.");
        return;
      }
      const newUser = {
        user_id: users.length + 1,
        role_id: 2,
        first_name: "",
        last_name: "",
        gender: "",
        birthday: "",
        address: "",
        img_user: "",
        phonenumber: "",
        email: registerData.email,
        password: registerData.password,
        status: "active",
        date_create: new Date().toISOString(),
        date_update: new Date().toISOString(),
      };

      const registerResponse = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (registerResponse.ok) {
        setRegisterSuccess(true);
        setFormError("");
        console.log("Registration successful:", newUser);
      } else {
        setFormError("An error occurred while registering.");
      }
    } catch (error) {
      setFormError("An error occurred while registering.");
    }
  };

  // Update login data state
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Update register data state
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
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
                    <div className="col-lg-6 col-md-6 col-sm-12 sm-m-b-50">
                      <div className="box-form-login">
                        <h2>Login</h2>
                        <div className="box-content">
                          <div className="form-login">
                            <form
                              method="post"
                              className="login"
                              onSubmit={handleLoginSubmit}
                            >
                              {formError && (
                                <div className="error-message">{formError}</div>
                              )}
                              {loginSuccess && (
                                <div className="success-message">
                                  Login successful!
                                </div>
                              )}
                              <div className="username">
                                <label>
                                  Username or email address{" "}
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="input-text"
                                  name="username"
                                  onChange={handleLoginChange}
                                />
                              </div>
                              <div className="password">
                                <label>
                                  Password <span className="required">*</span>
                                </label>
                                <input
                                  className="input-text"
                                  type="password"
                                  name="password"
                                  onChange={handleLoginChange}
                                />
                              </div>
                              <div className="rememberme-lost">
                                <div className="remember-me">
                                  <input
                                    name="rememberMe"
                                    type="checkbox"
                                    value="forever"
                                    onChange={handleLoginChange}
                                  />
                                  <label className="inline">Remember me</label>
                                </div>
                                <div className="lost-password">
                                  <a href="page-forgot-password.html">
                                    Lost your password?
                                  </a>
                                </div>
                              </div>
                              <div className="button-login">
                                <input
                                  type="submit"
                                  className="button"
                                  name="login"
                                  value="Login"
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="box-form-login">
                        <h2 className="register">Register</h2>
                        <div className="box-content">
                          <div className="form-register">
                            <form
                              method="post"
                              className="register"
                              onSubmit={handleRegisterSubmit}
                            >
                              {formError && (
                                <div className="error-message">{formError}</div>
                              )}
                              {registerSuccess && (
                                <div className="success-message">
                                  Registration successful!
                                </div>
                              )}
                              <div className="email">
                                <label>
                                  Email address{" "}
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="email"
                                  className="input-text"
                                  name="email"
                                  onChange={handleRegisterChange}
                                />
                              </div>
                              <div className="password">
                                <label>
                                  Password <span className="required">*</span>
                                </label>
                                <input
                                  type="password"
                                  className="input-text"
                                  name="password"
                                  onChange={handleRegisterChange}
                                />
                              </div>
                              <div className="button-register">
                                <input
                                  type="submit"
                                  className="button"
                                  name="register"
                                  value="Register"
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* #content */}
        </div>{" "}
        {/* #primary */}
      </div>{" "}
      {/* #main-content */}
    </div>
  );
};

export default LoginRegister;
