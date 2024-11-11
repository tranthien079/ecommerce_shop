import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../../public/images/compare.svg";
import cart from "../../public/images/cart.svg";
import user from "../../public/images/user.svg";
import menu from "../../public/images/menu.svg";
import wishlist from "../../public/images/wishlist.svg";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../utils/helper";
import { getUserCart, logoutAuth, resetState } from "../redux/user/userSlice";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAllProduct, getProductById } from "../redux/product/productSlice";
import { AiOutlineMessage } from "react-icons/ai";
import Notification from "../components/chat/Notification";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [total, setTotal] = useState(null);
  const [paginate, setPaginate] = useState(true);

  const range = (start, end) => {
    return Array.from({ length: end - start }, (_, i) => i + start);
  };
  const options = range(0, 100).map((o) => {
    o;
  });
  const authState = useSelector((state) => state?.auth?.user);

  const cartState = useSelector((state) => state?.auth?.cartUser);
  const productState = useSelector((state) => state?.product?.product);
  const [productOpt, setProductOpt] = useState([]);

  const addProductCart = useSelector((state) => state?.auth);
  const { cartProduct } = addProductCart;

  useEffect(() => {
    dispatch(getUserCart());
    dispatch(getAllProduct());
  }, [dispatch, cartProduct]);

  const handleLogout = () => {
    dispatch(logoutAuth());
    dispatch(resetState());
    Navigate("/login");
  };

  useEffect(() => {
    if (cartState?.length > 0) {
      const sum = cartState.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(sum);
    } else {
      setTotal(null);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let i = 0; i < productState.length; i++) {
      const element = productState[i];
      data.push({
        id: i,
        productId: element?._id,
        productName: element?.name,
      });
    }
    setProductOpt(data);
  }, [productState]);

  return (
    <>
      {/* Top Header */}
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Địa chỉ: 123 abc, phường X, Quận Z, HCM
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:{" "}
                <a href="tel: +84334502621" className="text-white">
                  0334502621
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Header */}
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-6 col-md-2">
              <h2>
                <Link to="/" className="text-white" >
                StreetWear
                  </Link>
              </h2>
            </div>

            {/* Search Bar */}
            <div className="col-12 col-md-5">
              <div className="input-group mb-2">
                <Typeahead
                  id="pagination-example"
                  onChange={async (selected) => {
                    if (selected.length > 0) {
                      navigate(`/product/${selected[0]?.productId}`);
                      await dispatch(getProductById(selected[0]?.productId));
                      await dispatch(getAllProduct());
                    }
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"productName"}
                  placeholder="Tìm kiếm theo tên sản phẩm..."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>

            {/* Header Links */}
            <div className="col-12 col-md-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <Notification />
                <Link
                  to="/chat"
                  className="d-flex align-items-center text-white gap-10"
                >
                  <AiOutlineMessage style={{ fontSize: "34px" }} />
                  <p className="d-md-flex d-none mb-0">CHAT</p>
                </Link>
                <Link
                  to="/wishlist"
                  className="d-md-flex align-items-center text-white gap-10"
                >
                  <img src={wishlist} alt="wishlist" />
                  <p className="d-md-flex d-none mb-0">Wishlist</p>
                </Link>
                <div className="d-flex align-items-center text-white gap-10">
                  <img src={user} alt="user" />
                  <p className="mb-0">
                    {authState._id ? (
                      <>
                        <Link to="/account" className="text-white">
                          {authState.lastname}
                        </Link>
                        <Link
                          className="text-white d-block"
                          to="/login"
                          onClick={() => handleLogout()}
                        >
                          Đăng xuất
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link className="text-white" to="/login">
                          Đăng nhập
                        </Link>
                        <br />
                        <Link className="text-white" to="/register">
                          Đăng kí
                        </Link>
                      </>
                    )}
                  </p>
                </div>
                <Link
                  to="/cart"
                  className="d-flex align-items-center text-white gap-10"
                >
                  <img src={cart} alt="cart" />
                  <div className="d-flex flex-column">
                    <span className="badge bg-white text-dark">
                      {cartState?.length}
                    </span>
                    <p className="mb-0">{total && formatPrice(total)}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Header - Responsive Navigation */}
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="d-flex justify-content-between align-items-center">
            {/* Categories Dropdown for Mobile */}
            <div className="dropdown d-md-none">
              <button
                className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex align-items-center gap-15"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={menu} alt="menu" />
                <span>Menu</span>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <Link className="dropdown-item text-white" to="/">
                    TRANG CHỦ
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-white" to="/product">
                    SẢN PHẨM
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-white" to="/wishlist">
                    WISHLIST
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-white" to="/blog">
                    BÀI VIẾT
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-white" to="/about">
                    VỀ CHÚNG TÔI
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-white" to="/contact">
                    LIÊN HỆ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Desktop Menu Links */}
            <nav className="d-none d-md-flex ">
              <NavLink to="/" className="nav-link text-white">
                TRANG CHỦ
              </NavLink>
              <NavLink to="/product" className="nav-link text-white">
                SẢN PHẨM
              </NavLink>
              <NavLink to="/blog" className="nav-link text-white">
                BÀI VIẾT
              </NavLink>
              <NavLink to="/about" className="nav-link text-white">
                VỀ CHÚNG TÔI
              </NavLink>
              <NavLink to="/contact" className="nav-link text-white">
                LIÊN HỆ
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
