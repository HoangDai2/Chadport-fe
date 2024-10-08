import React from "react";

const MyAccountPage = () => {
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
                                                            <li className="level-0 menu-item menu-item-has-children">
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
                                                                                    <input type="text" className="input-text" name="username" id="username" placeholder="Your name" />
                                                                                </div>
                                                                                <div className="password">
                                                                                    <input className="input-text" type="password" name="password" id="password" placeholder="Password" />
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
                                                                                    <input type="email" className="input-text" placeholder="Email" name="email" id="reg_email" />
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
                                                                            <a href="shop-details.html" className="product-image"><img width={330} height={330} src="media/product/W+NIKE+V2K+RUN+XX+1.png" /></a>
                                                                            <a href="shop-details.html" className="product-name">Chair Oak Matt Lacquered</a>
                                                                            <div className="quantity">Qty: 1</div>
                                                                            <div className="price">$150.00</div>
                                                                        </li>
                                                                        <li className="mini-cart-item">
                                                                            <a href="#" className="remove" title="Remove this item"><i className="icon_close" /></a>
                                                                            <a href="shop-details.html" className="product-image"><img width={330} height={330} src="media/product/AIR+JORDAN+1+MID+SE+2.png" /></a>
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
                                                                        <div className="total-percent"><div className="percent" style={{ width: '20%' }} /></div>
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
                    <div id="site-main" className="site-main">
                        <div id="main-content" className="main-content">
                            <div id="primary" className="content-area">
                                <div id="title" className="page-title">
                                    <div className="section-container">
                                        <div className="content-title-heading">
                                            <h1 className="text-title-heading">
                                                My Account
                                            </h1>
                                        </div>
                                        <div className="breadcrumbs">
                                            <a href="index.html">Home</a><span className="delimiter" />My Account
                                        </div>
                                    </div>
                                </div>
                                <div id="content" className="site-content" role="main">
                                    <div className="section-padding">
                                        <div className="section-container p-l-r">
                                            <div className="page-my-account">
                                                <div className="my-account-wrap clearfix">
                                                    <nav className="my-account-navigation">
                                                        <ul className="nav nav-tabs">
                                                            <li className="nav-item">
                                                                <a className="nav-link active" data-toggle="tab" href="#dashboard" role="tab">Dashboard</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" data-toggle="tab" href="#orders" role="tab">Orders</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" data-toggle="tab" href="#addresses" role="tab">Addresses</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" data-toggle="tab" href="#account-details" role="tab">Account details</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" href="page-login.html">Logout</a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                    <div className="my-account-content tab-content">
                                                        <div className="tab-pane fade show active" id="dashboard" role="tabpanel">
                                                            <div className="my-account-dashboard">
                                                                <p>
                                                                    Hello <strong>Rosie</strong> (not <strong>Rosie</strong>? <a href="page-login.html">Log out</a>)
                                                                </p>
                                                                <p>
                                                                    From your account dashboard you can view your <a href="#">recent orders</a>, manage your <a href="#">shipping and billing addresses</a>, and <a href="#">edit your password and account details</a>.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="orders" role="tabpanel">
                                                            <div className="my-account-orders">
                                                                <div className="table-responsive">
                                                                    <table className="table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Order</th>
                                                                                <th>Date</th>
                                                                                <th>Status</th>
                                                                                <th>Total</th>
                                                                                <th>Actions</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>#1357</td>
                                                                                <td>March 45, 2020</td>
                                                                                <td>Processing</td>
                                                                                <td>$125.00 for 2 item</td>
                                                                                <td><a href="#" className="btn-small d-block">View</a></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>#2468</td>
                                                                                <td>June 29, 2020</td>
                                                                                <td>Completed</td>
                                                                                <td>$364.00 for 5 item</td>
                                                                                <td><a href="#" className="btn-small d-block">View</a></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>#2366</td>
                                                                                <td>August 02, 2020</td>
                                                                                <td>Completed</td>
                                                                                <td>$280.00 for 3 item</td>
                                                                                <td><a href="#" className="btn-small d-block">View</a></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="addresses" role="tabpanel">
                                                            <div className="my-account-addresses">
                                                                <p>
                                                                    The following addresses will be used on the checkout page by default.
                                                                </p>
                                                                <div className="addresses">
                                                                    <div className="addresses-col">
                                                                        <header className="col-title">
                                                                            <h3>Billing address</h3>
                                                                            <a href="#" className="edit">Edit</a>
                                                                        </header>
                                                                        <address>
                                                                            3522 Interstate<br />
                                                                            75 Business Spur,<br />
                                                                            Sault Ste.<br />
                                                                            Marie, MI 49783
                                                                        </address>
                                                                    </div>
                                                                    <div className="addresses-col">
                                                                        <header className="col-title">
                                                                            <h3>Shipping address</h3>
                                                                            <a href="#" className="edit">Edit</a>
                                                                        </header>
                                                                        <address>
                                                                            4299 Express Lane<br />
                                                                            Sarasota,<br />
                                                                            FL 34249 USA <br />
                                                                            Phone: 1.941.227.4444
                                                                        </address>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="account-details" role="tabpanel">
                                                            <div className="my-account-account-details">
                                                                <form className="edit-account" action="#" method="post">
                                                                    <p className="form-row">
                                                                        <label htmlFor="account_first_name">First name <span className="required">*</span></label>
                                                                        <input type="text" className="input-text" name="account_first_name" />
                                                                    </p>
                                                                    <p className="form-row">
                                                                        <label>Last name <span className="required">*</span></label>
                                                                        <input type="text" className="input-text" name="account_last_name" />
                                                                    </p>
                                                                    <div className="clear" />
                                                                    <p className="form-row">
                                                                        <label>Display name <span className="required">*</span></label>
                                                                        <input type="text" className="input-text" name="account_display_name" />
                                                                        <span><em>This will be how your name will be displayed in the account section and in reviews</em></span>
                                                                    </p>
                                                                    <div className="clear" />
                                                                    <p className="form-row">
                                                                        <label>Email address <span className="required">*</span></label>
                                                                        <input type="email" className="input-text" name="account_email" />
                                                                    </p>
                                                                    <fieldset>
                                                                        <legend>Password change</legend>
                                                                        <p className="form-row">
                                                                            <label>Current password (leave blank to leave unchanged)</label>
                                                                            <input type="password" className="input-text" name="password_current" autoComplete="off" />
                                                                        </p>
                                                                        <p className="form-row">
                                                                            <label>New password (leave blank to leave unchanged)</label>
                                                                            <input type="password" className="input-text" name="password_1" autoComplete="off" />
                                                                        </p>
                                                                        <p className="form-row">
                                                                            <label>Confirm new password</label>
                                                                            <input type="password" className="input-text" name="password_2" autoComplete="off" />
                                                                        </p>
                                                                    </fieldset>
                                                                    <div className="clear" />
                                                                    <p className="form-row">
                                                                        <button type="submit" className="button" name="save_account_details" value="Save changes">Save changes</button>
                                                                    </p>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                                <a href="page-contact.html">sales@ruperfurniture.com</a>
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
                                                    <img width={309} height={32} src="media/payments.png" />
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
                {/* Back Top button */}
                <div className="back-top button-show">
                    <i className="arrow_carrot-up" />
                </div>
                {/* Search */}
                <div className="search-overlay">
                    <div className="close-search" />
                    <div className="wrapper-search">
                        <form role="search" method="get" className="search-from ajax-search" action="#">
                            <div className="search-box">
                                <button id="searchsubmit" className="btn" type="submit">
                                    <i className="icon-search" />
                                </button>
                                <input id="myInput" type="text" autoComplete="off" name="s" className="input-search s" placeholder="Search..." />
                                <div className="search-top">
                                    <div className="close-search">Cancel</div>
                                </div>
                                <div className="content-menu_search">
                                    <label>Suggested</label>
                                    <ul id="menu_search" className="menu">
                                        <li><a href="#">Furniture</a></li>
                                        <li><a href="#">Home Décor</a></li>
                                        <li><a href="#">Industrial</a></li>
                                        <li><a href="#">Kitchen</a></li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Wishlist */}
                <div className="wishlist-popup">
                    <div className="wishlist-popup-inner">
                        <div className="wishlist-popup-content">
                            <div className="wishlist-popup-content-top">
                                <span className="wishlist-name">Wishlist</span>
                                <span className="wishlist-count-wrapper"><span className="wishlist-count">2</span></span>
                                <span className="wishlist-popup-close" />
                            </div>
                            <div className="wishlist-popup-content-mid">
                                <table className="wishlist-items">
                                    <tbody>
                                        <tr className="wishlist-item">
                                            <td className="wishlist-item-remove"><span /></td>
                                            <td className="wishlist-item-image">
                                                <a href="shop-details.html">
                                                    <img width={600} height={600} src="media/product/3.jpg" />
                                                </a>
                                            </td>
                                            <td className="wishlist-item-info">
                                                <div className="wishlist-item-name">
                                                    <a href="shop-details.html">Chair Oak Matt Lacquered</a>
                                                </div>
                                                <div className="wishlist-item-price">
                                                    <span>$150.00</span>
                                                </div>
                                                <div className="wishlist-item-time">June 4, 2022</div>
                                            </td>
                                            <td className="wishlist-item-actions">
                                                <div className="wishlist-item-stock">
                                                    In stock
                                                </div>
                                                <div className="wishlist-item-add">
                                                    <div data-title="Add to cart">
                                                        <a rel="nofollow" href="#" className="button">Add to cart</a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="wishlist-item">
                                            <td className="wishlist-item-remove"><span /></td>
                                            <td className="wishlist-item-image">
                                                <a href="shop-details.html">
                                                    <img width={600} height={600} src="media/product/4.jpg" />
                                                </a>
                                            </td>
                                            <td className="wishlist-item-info">
                                                <div className="wishlist-item-name">
                                                    <a href="shop-details.html">Pillar Dining Table Round</a>
                                                </div>
                                                <div className="wishlist-item-price">
                                                    <del aria-hidden="true"><span>$150.00</span></del>
                                                    <ins><span>$100.00</span></ins>
                                                </div>
                                                <div className="wishlist-item-time">June 4, 2022</div>
                                            </td>
                                            <td className="wishlist-item-actions">
                                                <div className="wishlist-item-stock">
                                                    In stock
                                                </div>
                                                <div className="wishlist-item-add">
                                                    <div data-title="Add to cart">
                                                        <a rel="nofollow" href="#" className="button">Add to cart</a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="wishlist-popup-content-bot">
                                <div className="wishlist-popup-content-bot-inner">
                                    <a className="wishlist-page" href="shop-wishlist.html">
                                        Open wishlist page
                                    </a>
                                    <span className="wishlist-continue" data-url>
                                        Continue shopping
                                    </span>
                                </div>
                                <div className="wishlist-notice wishlist-notice-show">Added to the wishlist!</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Compare */}
                <div className="compare-popup">
                    <div className="compare-popup-inner">
                        <div className="compare-table">
                            <div className="compare-table-inner">
                                <a href="#" id="compare-table-close" className="compare-table-close">
                                    <span className="compare-table-close-icon" />
                                </a>
                                <div className="compare-table-items">
                                    <table id="product-table" className="product-table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <a href="#" className="compare-table-settings">Settings</a>
                                                </th>
                                                <th>
                                                    <a href="shop-details.html">Chair Oak Matt Lacquered</a> <span className="remove">remove</span>
                                                </th>
                                                <th>
                                                    <a href="shop-details.html">Zunkel Schwarz</a> <span className="remove">remove</span>
                                                </th>
                                                <th>
                                                    <a href="shop-details.html">Namaste Vase</a> <span className="remove">remove</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="tr-image">
                                                <td className="td-label">Image</td>
                                                <td>
                                                    <a href="shop-details.html">
                                                        <img width={600} height={600} src="media/product/3.jpg" />
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="shop-details.html">
                                                        <img width={600} height={600} src="media/product/1.jpg" />
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="shop-details.html">
                                                        <img width={600} height={600} src="media/product/2.jpg" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="tr-sku">
                                                <td className="td-label">SKU</td>
                                                <td>VN00189</td>
                                                <td />
                                                <td>D1116</td>
                                            </tr>
                                            <tr className="tr-rating">
                                                <td className="td-label">Rating</td>
                                                <td>
                                                    <div className="star-rating">
                                                        <span style={{ width: '80%' }} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="star-rating">
                                                        <span style={{ width: '100%' }} />
                                                    </div>
                                                </td>
                                                <td />
                                            </tr>
                                            <tr className="tr-price">
                                                <td className="td-label">Price</td>
                                                <td><span className="amount">$150.00</span></td>
                                                <td><del><span className="amount">$150.00</span></del> <ins><span className="amount">$100.00</span></ins></td>
                                                <td><span className="amount">$200.00</span></td>
                                            </tr>
                                            <tr className="tr-add-to-cart">
                                                <td className="td-label">Add to cart</td>
                                                <td>
                                                    <div data-title="Add to cart">
                                                        <a href="#" className="button">Add to cart</a>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div data-title="Add to cart">
                                                        <a href="#" className="button">Add to cart</a>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div data-title="Add to cart">
                                                        <a href="#" className="button">Add to cart</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="tr-description">
                                                <td className="td-label">Description</td>
                                                <td>Phasellus sed volutpat orci. Fusce eget lore mauris vehicula elementum gravida nec dui. Aenean aliquam varius ipsum, non ultricies tellus sodales eu. Donec dignissim viverra nunc, ut aliquet magna posuere eget.</td>
                                                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</td>
                                                <td>The EcoSmart Fleece Hoodie full-zip hooded jacket provides medium weight fleece comfort all year around. Feel better in this sweatshirt because Hanes keeps plastic bottles of landfills by using recycled polyester.7.8 ounce fleece sweatshirt made with up to 5 percent polyester created from recycled plastic.</td>
                                            </tr>
                                            <tr className="tr-content">
                                                <td className="td-label">Content</td>
                                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
                                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
                                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</td>
                                            </tr>
                                            <tr className="tr-dimensions">
                                                <td className="td-label">Dimensions</td>
                                                <td>N/A</td>
                                                <td>N/A</td>
                                                <td>N/A</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Quickview */}
                <div className="quickview-popup">
                    <div id="quickview-container">
                        <div className="quickview-container">
                            <a href="#" className="quickview-close" />
                            <div className="quickview-notices-wrapper" />
                            <div className="product single-product product-type-simple">
                                <div className="product-detail">
                                    <div className="row">
                                        <div className="img-quickview">
                                            <div className="product-images-slider">
                                                <div id="quickview-slick-carousel">
                                                    <div className="images">
                                                        <div className="scroll-image">
                                                            <div className="slick-wrap">
                                                                <div className="slick-sliders image-additional" data-dots="true" data-columns4={1} data-columns3={1} data-columns2={1} data-columns1={1} data-columns={1} data-nav="true">
                                                                    <div className="img-thumbnail slick-slide">
                                                                        <a href="media/product/3.jpg" className="image-scroll" >
                                                                            <img width={900} height={900} src="media/product/3.jpg" />
                                                                        </a>
                                                                    </div>
                                                                    <div className="img-thumbnail slick-slide">
                                                                        <a href="media/product/3-2.jpg" className="image-scroll" >
                                                                            <img width={900} height={900} src="media/product/3-2.jpg" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="quickview-single-info">
                                            <div className="product-content-detail entry-summary">
                                                <h1 className="product-title entry-title">Chair Oak Matt Lacquered</h1>
                                                <div className="price-single">
                                                    <div className="price">
                                                        <del><span>$150.00</span></del>
                                                        <span>$100.00</span>
                                                    </div>
                                                </div>
                                                <div className="product-rating">
                                                    <div className="star-rating" role="img" aria-label="Rated 4.00 out of 5">
                                                        <span style={{ width: '80%' }}>Rated <strong className="rating">4.00</strong> out of 5 based on <span className="rating">1</span> customer rating</span>
                                                    </div>
                                                    <a href="#" className="review-link">(<span className="count">1</span> customer review)</a>
                                                </div>
                                                <div className="description">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore…</p>
                                                </div>
                                                <form className="cart" method="post" encType="multipart/form-data">
                                                    <div className="quantity-button">
                                                        <div className="quantity">
                                                            <button type="button" className="plus">+</button>
                                                            <input type="number" className="input-text qty text" step={1} min={1} name="quantity" defaultValue={1} title="Qty" size={4} inputMode="numeric" autoComplete="off" />
                                                            <button type="button" className="minus">-</button>
                                                        </div>
                                                        <button type="submit" className="single-add-to-cart-button button alt">Add to cart</button>
                                                    </div>
                                                    <button className="button quick-buy">Buy It Now</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix" />
                        </div>
                    </div>
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

export default MyAccountPage;