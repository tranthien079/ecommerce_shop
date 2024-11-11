import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../redux/user/userSlice";
import { addToWishList } from "../redux/product/productSlice";
import { toast } from "react-toastify";
import { formatPrice } from "../utils/helper";
const WishListPage = () => {
  const dispatch = useDispatch();
  const wishlistState = useSelector(
    (state) => state?.auth?.userWishlist?.wishlist
  );

  useEffect(() => {
    getWishList();
  }, []);

  const getWishList = () => {
    dispatch(getUserWishlist());
  };

  const removeWishList =  async (id) => {
    await dispatch(addToWishList(id));
    await dispatch(getUserWishlist());
    toast.success("Xóa sản phẩm yêu thích thành công")
  };

  return (
    <div>
      <Meta title={"Yêu thích"} />
      <BreadCrumb title="Yêu thích" />
      <div className="wishlist-wrappper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
          {/* {
            wishlistState.length === 0  && (
              <div className="col-12">
                <h4 className="section-heading text-center">
                  Bạn chưa có sản phẩm nào trong yêu thích
                </h4>
              </div>
            )
          } */}
            {wishlistState && wishlistState?.map((item) => (
              <div className="col-3">
                <div className="wishlist-card position-relative">
                  <img
                    src="./images/cross.svg"
                    className="position-absolute cross img-fluid"
                    alt="cross"
                    onClick={() => removeWishList(item?._id)}
                  />

                  <div className="wishlist-card-image">
                    <img
                      src={item?.images[0]?.url}
                      className="img-fluid w-100"
                      alt="product"
                    />
                  </div>
                  <div className="py-3">
                    <h5 className="title">{item?.name}</h5>

                    {item?.discountPrice > 0 ? (
                      <div className="d-flex">
                        <p className="price ">
                          <del>{formatPrice(item?.price)}</del>
                        </p>
                        <p className="discount-price text-danger ps-3">
                          {formatPrice(item?.discountPrice)}
                        </p>
                      </div>
                    ) : (
                      <h6 className="price">{formatPrice(item?.price)}</h6>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListPage;
