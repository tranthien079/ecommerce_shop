import React from "react";
import { BsGithub, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Newsletter Section */}
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-md-5 col-12 mb-3 mb-md-0">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="./images/newsletter.png" alt="newsletter" />
                <h2 className="mb-0 text-white">Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-md-7 col-12">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your email address"
                  aria-label="Your email address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Main Footer Section */}
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            {/* Contact Section */}
            <div className="col-md-4 col-12 mb-3 mb-md-0">
              <h4 className="text-white mb-4">Liên hệ</h4>
              <div className="footer-links d-flex flex-column">
                <address className="text-white py-2 mb-1">
                  123 Nguyễn Thái Sơn, P2, Gò Vấp, HCM
                </address>
                <a
                  href="tel:+8433502621"
                  className="mt-4 d-block mb-3 text-white"
                >
                  +83 334502621
                </a>
                <a
                  href="mailto:tranminhthien0709@gmail.com"
                  className="mt-2 d-block mb-3 text-white"
                >
                  tranminhthien0709@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-3">
                  <a className="text-white" href="#">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsGithub className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Policies Section */}
            <div className="col-md-3 col-6">
              <h4 className="text-white mb-4">Chính sách</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1" to="#">
                  Bảo hành
                </Link>
                <Link className="text-white py-2 mb-1" to="#">
                  Đổi trả
                </Link>
                <Link className="text-white py-2 mb-1" to="#">
                  Vận chuyển
                </Link>
                <Link className="text-white py-2 mb-1" to="#">
                  Thanh toán
                </Link>
              </div>
            </div>

            {/* Account Section */}
            <div className="col-md-3 col-6">
              <h4 className="text-white mb-4">Tài khoản</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1" to="#">
                  About Us
                </Link>
                <Link className="text-white py-2 mb-1" to="#">
                  FAQ
                </Link>
                <Link className="text-white py-2 mb-1" to="#">
                  Contact
                </Link>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="col-md-2 col-6">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1" to="#">
                  Laptops
                </Link>
                <Link className="text-white py-2 mb-1" to="#">
                  Headphones
                </Link>
                <Link className="text-white py-2 mb-1" to="#">
                  Tablets
                </Link>
                <Link className="text-white py-2 mb-1" to="#">
                  Watch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Bottom Section */}
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; Powered by Dev Tran
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
