import React from "react";

const BillOrder = () => {
    return (
        <>
<div>
  <div id="page" className="hfeed page-wrapper">
    <header id="site-header" className="site-header header-v1 absolute bg-white">
      <div className="header-mobile">
        <div className="section-padding">
          <div className="section-container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-left">
                <div className="navbar-header">
                  <button type="button" id="show-megamenu" className="navbar-toggle" />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 header-center">
                <div className="site-logo">
                  <a href="index.html">
                    <img width={400} height={79} src="media/logochadport.png" alt="Ruper – Furniture HTML Theme" />
                  </a>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-right">
                <div className="ruper-topcart dropdown">
                  <div className="dropdown mini-cart top-cart">
                    <div className="remove-cart-shadow" />
                    <a className="dropdown-toggle cart-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <div className="icons-cart"><i className="icon-large-paper-bag" /><span className="cart-count">2</span></div>
                    </a>
                    <div className="dropdown-menu cart-popup">
                      <div className="cart-empty-wrap">
                        <ul className="cart-list">
                          <li className="empty">
                            <span>No products in the cart.</span>
                            <a className="go-shop" href="shop-grid-left.html">GO TO SHOP<i aria-hidden="true" className="arrow_right" /></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-mobile-fixed">
          {/* Shop */}
          <div className="shop-page">
            <a href="shop-grid-left.html"><i className="wpb-icon-shop" /></a>
          </div>
          {/* Login */}
          <div className="my-account">
            <div className="login-header">
              <a href="page-my-account.html"><i className="wpb-icon-user" /></a>
            </div>
          </div>
          {/* Search */}
          <div className="search-box">
            <div className="search-toggle"><i className="wpb-icon-magnifying-glass" /></div>
          </div>
          {/* Wishlist */}
          <div className="wishlist-box">
            <a href="shop-wishlist.html"><i className="wpb-icon-heart" /></a>
          </div>
        </div>
      </div>
      <div className="header-desktop">
        <div className="header-wrapper">
          <div className="section-padding">
            <div className="section-container p-l-r">
              <div className="row">
                <div className="col-xl-3 col-lg-2 col-md-12 col-sm-12 col-12 header-left">
                  <div className="site-logo">
                    <a href="index.html">
                      <img width={400} height={79} src="media/logochadport.png" alt="Ruper – Furniture HTML Theme" />
                    </a>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 text-center header-center">
                  <div className="site-navigation">
                    <nav id="main-navigation">
                      <ul id="menu-main-menu" className="menu">
                        <li className="level-0 menu-item">
                          <a href="index.html" className="menu-item-text">Home</a>
                        </li>
                        <li className="level-0 menu-item menu-item-has-children current-menu-item">
                          <a href="shop-grid-left.html"><span className="menu-item-text">Shop</span></a>
                          <ul className="sub-menu">
                            <li className="level-1 menu-item">
                              <a href="shop-grid-left.html"><span className="menu-item-text">Adidas Shoes</span></a>
                            </li>
                            <li>
                              <a href="shop-grid-left.html"><span className="menu-item-text">Nike Shoes</span></a>
                            </li>
                            <li>
                              <a href="shop-grid-left.html"><span className="menu-item-text">Boost</span></a>
                            </li>
                            <li>
                              <a href="shop-grid-left.html"><span className="menu-item-text">Sneaker</span></a>
                            </li>
                            <li>
                              <a href="shop-grid-left.html"><span className="menu-item-text">Luxury Shoes</span></a>
                            </li>
                          </ul>
                        </li>
                        <li className="level-0 menu-item mega-menu mega-menu-fullwidth align-center">
                          <a href="blog-grid-left.html"><span className="menu-item-text">Blog</span></a>
                        </li>
                        <li className="level-0 menu-item">
                          <a href="page-about.html"><span className="menu-item-text">About</span></a>
                        </li>
                        <li className="level-0 menu-item">
                          <a href="page-contact.html"><span className="menu-item-text">Contact</span></a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12 header-right">
                  <div className="header-page-link">
                    {/* Login */}
                    <div className="login-header">
                      <a className="active-login" href="#">Login</a>
                      <div className="form-login-register">
                        <div className="box-form-login">
                          <div className="active-login" />
                          <div className="box-content">
                            <div className="form-login active">
                              <form id="login_ajax" method="post" className="login">
                                <h2>Sign in</h2>
                                <p className="status" />
                                <div className="content">
                                  <div className="username">
                                    <input type="text"  className="input-text" name="username" id="username" placeholder="Your name" />
                                  </div>
                                  <div className="password">
                                    <input className="input-text"  type="password" name="password" id="password" placeholder="Password" />
                                  </div>
                                  <div className="rememberme-lost">
                                    <div className="rememberme">
                                      <input name="rememberme" type="checkbox" id="rememberme" defaultValue="forever" />
                                      <label htmlFor="rememberme" className="inline">Remember me</label>
                                    </div>
                                    <div className="lost_password">
                                      <a href="forgot-password.html">Lost your password?</a>
                                    </div>
                                  </div>
                                  <div className="button-login">
                                    <input type="submit" className="button" name="login" defaultValue="Login" />
                                  </div>
                                  <div className="button-next-reregister">Create An Account</div>
                                </div>						
                              </form>
                            </div>
                            <div className="form-register">
                              <form method="post" className="register">
                                <h2>REGISTER</h2>
                                <div className="content">
                                  <div className="email">
                                    <input type="email" className="input-text" placeholder="Email" name="email" id="reg_email"  />
                                  </div>
                                  <div className="password">
                                    <input type="password" className="input-text" placeholder="Password" name="password" id="reg_password" />
                                  </div>															
                                  <div className="button-register">
                                    <input type="submit" className="button" name="register" defaultValue="Register" />
                                  </div>
                                  <div className="button-next-login">Already has an account</div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Search */}
                    <div className="search-box">
                      <div className="search-toggle"><i className="icon-search" /></div>
                    </div>
                    {/* Wishlist */}
                    <div className="wishlist-box">
                      <a href="shop-wishlist.html"><i className="icon-heart" /></a>
                      <span className="count-wishlist">1</span>
                    </div>
                    {/* Cart */}
                    <div className="ruper-topcart dropdown light">
                      <div className="dropdown mini-cart top-cart">
                        <div className="remove-cart-shadow" />
                        <a className="dropdown-toggle cart-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <div className="icons-cart"><i className="icon-large-paper-bag" /><span className="cart-count">2</span></div>
                        </a>
                        <div className="dropdown-menu cart-popup">
                          <div className="cart-empty-wrap">
                            <ul className="cart-list">
                              <li className="empty">
                                <span>No products in the cart.</span>
                                <a className="go-shop" href="shop-grid-left.html">GO TO SHOP<i aria-hidden="true" className="arrow_right" /></a>
                              </li>
                            </ul>
                          </div>
                          <div className="cart-list-wrap">
                            <ul className="cart-list ">
                              <li className="mini-cart-item">
                                <a href="#" className="remove" title="Remove this item"><i className="icon_close" /></a>
                                <a href="shop-details.html" className="product-image"><img width={330} height={330} src="media/product/W+NIKE+V2K+RUN+XX+1.png"  /></a>
                                <a href="shop-details.html" className="product-name">Chair Oak Matt Lacquered</a>		
                                <div className="quantity">Qty: 1</div>
                                <div className="price">$150.00</div>
                              </li>
                              <li className="mini-cart-item">
                                <a href="#" className="remove" title="Remove this item"><i className="icon_close" /></a>													
                                <a href="shop-details.html" className="product-image"><img width={330} height={330} src="media/product/AIR+JORDAN+1+MID+SE+2.png"  /></a>
                                <a href="shop-details.html" className="product-name">Zunkel Schwarz</a>
                                <div className="quantity">Qty: 1</div>
                                <div className="price">$100.00</div>						
                              </li>
                            </ul>
                            <div className="total-cart">
                              <div className="title-total">Total: </div>
                              <div className="total-price"><span>$100.00</span></div>
                            </div>
                            <div className="free-ship">
                              <div className="title-ship">Buy <strong>$400</strong> more to enjoy <strong>FREE Shipping</strong></div>
                              <div className="total-percent"><div className="percent" style={{width: '20%'}} /></div>
                            </div>
                            <div className="buttons">
                              <a href="shop-cart.html" className="button btn view-cart btn-primary">View cart</a>
                              <a href="shop-checkout.html" className="button btn checkout btn-default">Check out</a>
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
    </header>
    <div id="site-main" className="site-main ">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="title" className="page-title ">
            <div className="section-container">
              <div className="content-title-heading">
                <h1 className="text-title-heading">Bill</h1>
              </div>
              <div className="breadcrumbs">
                <a href="index.php">Home</a><span className="delimiter" />Bill
              </div>
            </div>
          </div>
          <div id="content" className="site-content" role="main">
            <div className="content-bill">
              <div className="grid mt-5 mb-5 text-center" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
                <div className="g-col-6">
                  <div className="fw-semibold text-uppercase mb-1 fs-6" style={{color: 'black', fontWeight: 500, fontSize: 18}}>Thông tin người nhận</div>
                  <div className="mb-1">
                    Recipient Name: Nguyen Van A<br />
                    Address: Số xx, đường xx, Hoàn Kiếm, Hà Nội<br />
                    Phone: 0123456789
                  </div>
                  <div className="fw-semibold text-uppercase mt-3 fs-6" style={{color: 'black', fontWeight: 500, fontSize: 18}}>Ngày tạo</div>
                  <div className="mt-1">01-01-2023</div>
                </div>
                <div className="g-col-6">
                  <div className="fw-semibold text-uppercase mb-1 fs-6" style={{color: 'black', fontWeight: 500, fontSize: 18}}>Phương thức thanh toán</div>
                  <div className="mb-3">Credit Card</div>
                  <div className="fw-semibold text-uppercase mt-4 fs-6" style={{color: 'black', fontWeight: 500, fontSize: 18}}>Phương thức giao hàng</div>
                  <div className="mt-1">Express Delivery</div>
                  <div className="fw-semibold text-uppercase mt-4 fs-6" style={{color: 'black', fontWeight: 500, fontSize: 18}}>Tình trạng đơn hàng</div>
                  <div className="text-red mt-1">Completed</div>
                </div>
              </div>
              <hr />
              <table className="table-bill ">
                <thead>
                  <tr>
                    <th style={{width: '10%', textAlign: 'center', color: 'black'}}>#</th>
                    <th style={{width: '40%', color: 'black'}}>Description</th>
                    <th style={{width: '15%', textAlign: 'center', color: 'black'}}>Qty</th>
                    <th style={{width: '17.5%', textAlign: 'end', color: 'black'}}>Unit price</th>
                    <th className="text-end px-4" style={{textAlign: 'end', color: 'black'}}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={{color: 'black'}}>1</th>
                    <td>
                      <div className="text-product text-product_main">Product 1</div>
                      <div className="text-product text-product_sub">Category 1</div>
                    </td>
                    <td className="text-center" style={{textAlign: 'center'}}>2</td>
                    <td style={{textAlign: 'end'}}>$10.00</td>
                    <td className="text-end px-4" style={{textAlign: 'end'}}>$20.00</td>
                  </tr>
                  <tr>
                    <th style={{color: 'black'}}>2</th>
                    <td>
                      <div className="text-product text-product_main">Product 2</div>
                      <div className="text-product text-product_sub">Category 2</div>
                    </td>
                    <td className="text-center" style={{textAlign: 'center'}}>1</td>
                    <td style={{textAlign: 'end'}}>$30.00</td>
                    <td className="text-end px-4" style={{textAlign: 'end'}}>$30.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td />
                    <td />
                    <td />
                    <td className="text-end" style={{textAlign: 'end', color: 'black'}}>Subtotal</td>
                    <td className="text-end px-4" style={{textAlign: 'end', color: 'black'}}>$50.00</td>
                  </tr>
                  <tr>
                    <td />
                    <td />
                    <td />
                    <td className="text-end" style={{textAlign: 'end', color: 'black'}}>Ship</td>
                    <td className="text-end px-4" style={{textAlign: 'end', color: 'black'}}>$5.00</td>
                  </tr>
                  <tr>
                    <td />
                    <td />
                    <td />
                    <td className="text-end fw-bolder fs-5" style={{textAlign: 'end', fontSize: '1.75rem', fontWeight: 500, color: 'black'}}>Total</td>
                    <td className="text-end fw-bolder fs-5 px-4" style={{textAlign: 'end', fontSize: '1.75rem', fontWeight: 500, color: 'black'}}>$55.00</td>
                  </tr>
                </tfoot>
              </table>
              <div className="flex justify-content-between mt-3">
                <div />
                <div className="flex flex-column align-items-end ml-5">
                  <div className="fw-semibold">Have a Question?</div>
                  support@abcapp.com
                </div>
              </div>
            </div>
          </div>{/* #content */}
        </div>{/* #primary */}
      </div>{/* #main-content */}
    </div>
    <footer id="site-footer" className="site-footer background">
      <div className="footer">
        <div className="section-padding">
          <div className="section-container">
            <div className="block-widget-wrap">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="block block-menu m-b-20">
                    <h2 className="block-title">Contact Us</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <a href="page-contact.html">616.774.0561</a>
                        </li>
                        <li>
                          <a href="page-contact.html">866.453.4748</a>
                        </li>
                        <li>
                          <a href="page-contact.html">HR Fax: 810.222.5439</a>
                        </li>
                        <li>
                          <a href="page-contact.html">sales@chadport.com</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="block block-social">
                    <ul className="social-link">
                      <li><a href="#"><i className="fa fa-twitter" /></a></li>
                      <li><a href="#"><i className="fa fa-instagram" /></a></li>
                      <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                      <li><a href="#"><i className="fa fa-behance" /></a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="block block-menu">
                    <h2 className="block-title">Showroom</h2>
                    <div className="block-content">
                      <p>1000 84th Street SW , Byron Center, MI 49315</p>
                      <p>AmericasMart Bldg. #1</p>
                      <p>Suite 5C-1, Atlanta, GA 30303</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="block block-menu">
                    <h2 className="block-title">Services</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <a href="page-about.html">Sale</a>
                        </li>
                        <li>
                          <a href="page-about.html">Quick Ship</a>
                        </li>
                        <li>
                          <a href="page-about.html">New Designs</a>
                        </li>
                        <li>
                          <a href="page-about.html">Accidental Fabric Protection</a>
                        </li>
                        <li>
                          <a href="page-about.html">Furniture Care</a>
                        </li>
                        <li>
                          <a href="page-about.html">Gift Cards</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="block block-newsletter">
                    <h2 className="block-title">Newsletter</h2>
                    <div className="block-content">
                      <div className="newsletter-text">Enter your email below to be the first to know about new collections and product launches.</div>
                      <form action="#" method="post" className="newsletter-form">
                        <input type="email" className="bg-white" name="your-email" size={40} placeholder="Email address" />
                        <span className="btn-submit">
                          <input type="submit" defaultValue="Subscribe" />
                        </span>
                      </form>
                    </div>
                  </div>
                  <div className="block block-image">
                    <img width={309} height={32} src="media/payments.png"  />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="section-padding">
          <div className="section-container">
            <div className="block-widget-wrap">
              <p className="copyright text-center">Copyright © 2022. All Right Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  {/* Page Loader */}
  <div className="page-preloader">
    <div className="loader">
      <div />
      <div />
    </div>
  </div>
</div>

        </>
    )
}
export default BillOrder;