import React from 'react';

// Import images
import airJordanLowSE1 from '../img/AIR+JORDAN+1+LOW+SE+1.jpg';
import airJordanLowSE2 from '../img/AIR+JORDAN+1+LOW+SE+2.png';
import airJordanMidSE1 from '../img/AIR+JORDAN+1+MID+SE+1.jpg';
import airJordanMidSE2 from '../img/AIR+JORDAN+1+MID+SE+2.png';
import blazerLow77VNTG1 from '../img/BLAZER+LOW+\'77+VNTG+1.png';
import blazerLow77VNTG2 from '../img/BLAZER+LOW+\'77+VNTG+2.png';
import blazerPhantomLow1 from '../img/BLAZER+PHANTOM+LOW+1.png';
import blazerPhantomLow2 from '../img/BLAZER+PHANTOM+LOW+2.png';

const Home = () => {
    return (
        <section className="section section-padding">
            <div className="section-container">
                {/* Block Products */}
                <div className="block block-products slider">
                    <div className="block-widget-wrap">
                        <div className="block-title">
                            <h2>Best Seller</h2>
                        </div>
                        <div className="block-content">
                            <div className="content-product-list slick-wrap">
                                <div className="slick-sliders products-list grid display:inline-flex " >
                                    {/* Product Item 1 */}
                                    <div className="item-product slick-slide ">
                                        <div className="items">
                                            <div className="products-entry clearfix product-wapper">
                                                <div className="products-thumb">
                                                    <div className="product-lable">
                                                        <div className="hot">Hot</div>
                                                    </div>
                                                    <div className="product-thumb-hover">
                                                        <a href="shop-details.html">
                                                            <img width="330" height="330" src={airJordanLowSE1} className="post-image" alt="" />
                                                            <img width="330" height="330" src={airJordanLowSE2} className="hover-image back" alt="" />
                                                        </a>
                                                    </div>
                                                    <div className="product-button">
                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                            <button className="product-btn">Add to wishlist</button>
                                                        </div>
                                                        <div className="btn-compare" data-title="Compare">
                                                            <button className="product-btn">Compare</button>
                                                        </div>
                                                        <span className="product-quickview" data-title="Quick View">
                                                            <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="products-content">
                                                    <div className="contents">
                                                        <h3 className="product-title"><a href="shop-details.html">Zunkel Schwarz</a></h3>
                                                        <span className="price">$100.00</span>
                                                        <div className="btn-add-to-cart">
                                                            <div data-title="Add to cart">
                                                                <a href="#" className="button">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Item 2 */}
                                    <div className="item-product slick-slide">
                                        <div className="items">
                                            <div className="products-entry clearfix product-wapper">
                                                <div className="products-thumb">
                                                    <div className="product-lable">
                                                        <div className="hot">Hot</div>
                                                    </div>
                                                    <div className="product-thumb-hover">
                                                        <a href="shop-details.html">
                                                            <img width="330" height="330" src={airJordanMidSE1} className="post-image" alt="" />
                                                            <img width="330" height="330" src={airJordanMidSE2} className="hover-image back" alt="" />
                                                        </a>
                                                    </div>
                                                    <div className="product-button">
                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                            <button className="product-btn">Add to wishlist</button>
                                                        </div>
                                                        <div className="btn-compare" data-title="Compare">
                                                            <button className="product-btn">Compare</button>
                                                        </div>
                                                        <span className="product-quickview" data-title="Quick View">
                                                            <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="products-content">
                                                    <div className="contents">
                                                        <h3 className="product-title"><a href="shop-details.html">Namaste Vase</a></h3>
                                                        <span className="price">$200.00</span>
                                                        <div className="btn-add-to-cart">
                                                            <div data-title="Add to cart">
                                                                <a href="#" className="button">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Item 3 */}
                                    <div className="item-product slick-slide">
                                        <div className="items">
                                            <div className="products-entry clearfix product-wapper">
                                                <div className="products-thumb">
                                                    <div className="product-lable">
                                                        <div className="hot">Hot</div>
                                                    </div>
                                                    <div className="product-thumb-hover">
                                                        <a href="shop-details.html">
                                                            <img width="330" height="330" src={blazerLow77VNTG1} className="post-image" alt="" />
                                                            <img width="330" height="330" src={blazerLow77VNTG2} className="hover-image back" alt="" />
                                                        </a>
                                                    </div>
                                                    <div className="product-button">
                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                            <button className="product-btn">Add to wishlist</button>
                                                        </div>
                                                        <div className="btn-compare" data-title="Compare">
                                                            <button className="product-btn">Compare</button>
                                                        </div>
                                                        <span className="product-quickview" data-title="Quick View">
                                                            <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="products-content">
                                                    <div className="contents">
                                                        <h3 className="product-title"><a href="shop-details.html">Chair Oak Matt Lacquered</a></h3>
                                                        <span className="price">$150.00</span>
                                                        <div className="btn-add-to-cart">
                                                            <div data-title="Add to cart">
                                                                <a href="#" className="button">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Item 4 */}
                                    <div className="item-product slick-slide">
                                        <div className="items">
                                            <div className="products-entry clearfix product-wapper">
                                                <div className="products-thumb">
                                                    <div className="product-lable">
                                                        <div className="onsale">-33%</div>
                                                    </div>
                                                    <div className="product-thumb-hover">
                                                        <a href="shop-details.html">
                                                            <img width="330" height="330" src={blazerPhantomLow1} className="post-image" alt="" />
                                                            <img width="330" height="330" src={blazerPhantomLow2} className="hover-image back" alt="" />
                                                        </a>
                                                    </div>
                                                    <div className="product-button">
                                                        <div className="btn-wishlist" data-title="Wishlist">
                                                            <button className="product-btn">Add to wishlist</button>
                                                        </div>
                                                        <div className="btn-compare" data-title="Compare">
                                                            <button className="product-btn">Compare</button>
                                                        </div>
                                                        <span className="product-quickview" data-title="Quick View">
                                                            <a href="#" className="quickview quickview-button">Quick View <i className="icon-search"></i></a>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="products-content">
                                                    <div className="contents">
                                                        <h3 className="product-title"><a href="shop-details.html">Pillar Dining Table Round</a></h3>
                                                        <span className="price">
                                                            <del aria-hidden="true"><span>$150.00</span></del>
                                                            <ins><span>$100.00</span></ins>
                                                        </span>
                                                        <div className="btn-add-to-cart">
                                                            <div data-title="Add to cart">
                                                                <a href="#" className="button">Add to cart</a>
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
        </section>
    );
};

export default Home;
