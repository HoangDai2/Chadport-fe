import React from 'react';

const LoginRegister: React.FC = () => {
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
                            <form method="post" className="login">
                              <div className="username">
                                <label>
                                  Username or email address <span className="required">*</span>
                                </label>
                                <input type="text" className="input-text" name="username" id="username" />
                              </div>
                              <div className="password">
                                <label htmlFor="password">
                                  Password <span className="required">*</span>
                                </label>
                                <input className="input-text" type="password" name="password" />
                              </div>
                              <div className="rememberme-lost">
                                <div className="remember-me">
                                  <input name="rememberme" type="checkbox" value="forever" />
                                  <label className="inline">Remember me</label>
                                </div>
                                <div className="lost-password">
                                  <a href="page-forgot-password.html">Lost your password?</a>
                                </div>
                              </div>
                              <div className="button-login">
                                <input type="submit" className="button" name="login" value="Login" />
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
                            <form method="post" className="register">
                              <div className="email">
                                <label>
                                  Email address <span className="required">*</span>
                                </label>
                                <input type="email" className="input-text" name="email" />
                              </div>
                              <div className="password">
                                <label>
                                  Password <span className="required">*</span>
                                </label>
                                <input type="password" className="input-text" name="password" />
                              </div>
                              <div className="button-register">
                                <input type="submit" className="button" name="register" value="Register" />
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
          </div> {/* #content */}
        </div> {/* #primary */}
      </div> {/* #main-content */}
    </div>
  );
};

export default LoginRegister;
