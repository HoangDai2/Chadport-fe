import React from "react";
import imgCard from "../img/payments.png";
import logofooter from "../img/logochadport.png";
type Props = {};

const FooterClient = (props: Props) => {
  return (
    <>
      <footer id="site-footer" className="site-footer">
        <div className="footer bg-wheat">
          <div className="section-padding">
            <div className="section-container">
              <div className="block-widget-wrap">
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <div className="block block-image">
                      <img
                        width="100"
                        src={logofooter}
                        alt=""
                        style={{
                          width: "200px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="block block-menu text-justify">
                      <h5 className="block-title font-bold">Contact Us</h5>
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
                            <a href="page-contact.html">
                              sales@chadportshoes.com
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="block block-menu text-justify">
                      <h5 className="block-title font-bold">Services</h5>
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
                            <a href="page-about.html">
                              Accidental Fabric Protection
                            </a>
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
                    <div className="block block-newsletter text-justify">
                      <h5 className="block-title font-bold">Newsletter</h5>
                      <div className="block-content">
                        <div className="newsletter-text">
                          Enter your email below to be the first to know about
                          new collections and product launches.
                        </div>
                        <form
                          action="#"
                          method="post"
                          className="newsletter-form"
                        >
                          <input
                            type="email"
                            name="your-email"
                            value=""
                            size={40}
                            placeholder="Email address"
                          />
                          <span className="btn-submit">
                            <input type="submit" value="Subscribe" />
                          </span>
                        </form>
                      </div>
                    </div>

                    <div className="block block-image">
                      <img width="400" height="79" src={imgCard} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterClient;
