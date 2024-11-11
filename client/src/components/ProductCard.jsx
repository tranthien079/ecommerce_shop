import React from "react";
import ReactStars from 'react-stars'
import { Link, useLocation } from "react-router-dom";
import wish from "../../public/images/wish.svg";
import img1 from "../../public/images/watch.jpg";
import img2 from "../../public/images/tab.jpg";
import view from "../../public/images/view.svg";
import prodcompare from "../../public/images/prodcompare.svg";
import addCart from "../../public/images/add-cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../redux/product/productSlice";
import { formatPrice } from "../utils/helper";
const ProductCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();
  let location = useLocation();
  const addToWL = (id) => {
    dispatch(addToWishList(id))
  }
  return (
    <>
      {data?.length > 0 ? data?.map((item, key) => {
        return (
          <div key={key}
            className={`${ 
              location.pathname == "/product" ? `gr-${grid}` : "col-md-2" 
            }`}
          >
            <Link
              to={`${
                location.pathname == "/"
                  ? `/product/${item._id}`
                  : location.pathname == `/product/${item._id}`
                  ? `/product/${item._id}`
                  : `${item._id}`
              }`}
              className="product-card position-relative"
            >
              <div className="wishlist-icon position-absolute">
               
              </div>
              <div className="product-image">
                <img src={item?.images[0]?.url} className="img-fluid mx-auto" alt="product" />
                <img src={item?.images[1]?.url} className="img-fluid mx-auto" alt="product" />
              </div>
              <div className="product-details" style={{ marginTop:'30px', padding: '15px'}}>
                <h6 className="brand">{item?.brandId?.name}</h6>
                <h5 className="product-title">{item?.name}</h5>
                <ReactStars
                  count={5}
                  size={22}
                  value={Number(item?.totalrating) || 0}
                  
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${grid == 12 ? "d-block" : "d-none"}`}
                  dangerouslySetInnerHTML={{ __html: item?.description}}
                >                  
                </p>
                { item?.discountPrice > 0 ? (
                  <div className="d-flex">
                  <p className="price mb-0"><del>{formatPrice(item?.price)}</del></p>
                  <p className="discount-price text-danger ps-3 mb-0">{formatPrice(item?.discountPrice)}</p>
                  </div>
                ): (
                  <p className="price mb-0">{formatPrice(item?.price)}</p>
                ) }

              </div>
              
            </Link>
          </div>
        );
      }) : <h3 className="text-center"><b>Không có sản phẩm cần tìm kiếm</b></h3>}
    </>
  );
};

export default ProductCard;
