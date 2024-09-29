import React from "react";
import imgCategory1 from "../img/JORDAN+LUKA+3+PF.png";
import imgCategory2 from "../img/W+AIR+JORDAN+1+LOW+SE.png";
import imgCategory3 from "../img/AIR+JORDAN+1+ZM+AIR+CMFT+2.jpg";
import imgCategory4 from "../img/ACG+WATERCAT+.png";
type Props = {};

const Category = (props: Props) => {
  return (
    <>
      <section className="section section-padding m-b-60">
        <div className="section-container">
          <div className="block block-banners layout-1 banners-effect">
            <div className="section-row">
              <div className="section-column left sm-m-b">
                <div className="section-column-wrap">
                  <div className="block-widget-wrap">
                    <div className="block-widget-banner layout-1">
                      <div className="bg-banner">
                        <div className="banner-wrapper banners">
                          <div className="banner-image">
                            <a href="shop-grid-left.html">
                              <img
                                width="571"
                                height="622"
                                src={imgCategory1}
                                alt="Banner Image"
                              />
                            </a>
                          </div>
                          <div className="banner-wrapper-infor">
                            <div className="info">
                              <div className="content">
                                <a
                                  className="button button-white"
                                  href="shop-grid-left.html"
                                >
                                  Nike Sneaker
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-column right">
                <div className="section-column-wrap">
                  <div className="block-widget-wrap p-0">
                    <div className="block-section m-b-15">
                      <div className="section-container">
                        <div className="section-row">
                          <div className="section-column column-50 sm-m-b">
                            <div className="block-widget-wrap">
                              <div className="block-widget-banner layout-1">
                                <div className="bg-banner">
                                  <div className="banner-wrapper banners">
                                    <div className="banner-image">
                                      <a href="shop-grid-left.html">
                                        <img
                                          width="406"
                                          height="304"
                                          src={imgCategory2}
                                          alt="Banner Image"
                                        />
                                      </a>
                                    </div>
                                    <div className="banner-wrapper-infor">
                                      <div className="info">
                                        <div className="content">
                                          <a
                                            className="button button-white"
                                            href="shop-grid-left.html"
                                          >
                                            Jordan Low Top
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="section-column column-50">
                            <div className="block-widget-wrap">
                              <div className="block-widget-banner layout-1">
                                <div className="bg-banner">
                                  <div className="banner-wrapper banners">
                                    <div className="banner-image">
                                      <a href="shop-grid-left.html">
                                        <img
                                          width="406"
                                          height="304"
                                          src={imgCategory3}
                                          alt="Banner Image"
                                        />
                                      </a>
                                    </div>
                                    <div className="banner-wrapper-infor">
                                      <div className="info">
                                        <div className="content">
                                          <a
                                            className="button button-white"
                                            href="shop-grid-left.html"
                                          >
                                            Jordan High Top
                                          </a>
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
                    <div className="block-section">
                      <div className="section-container">
                        <div className="section-row">
                          <div className="section-column">
                            <div className="block-widget-wrap">
                              <div className="block-widget-banner layout-1">
                                <div className="bg-banner">
                                  <div className="banner-wrapper banners">
                                    <div className="banner-image">
                                      <a href="shop-grid-left.html">
                                        <img
                                          width="406"
                                          height="304"
                                          src={imgCategory4}
                                          alt="Banner Image"
                                        />
                                      </a>
                                    </div>
                                    <div className="banner-wrapper-infor">
                                      <div className="info">
                                        <div className="content">
                                          <a
                                            className="button button-white"
                                            href="shop-grid-left.html"
                                          >
                                            Nike Lab
                                          </a>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
