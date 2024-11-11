import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-stars";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../redux/user/userSlice";
import {
  addToWishList,
  getProductById,
  getRelatedProducts,
  ratingProduct,
  resetState,
} from "../redux/product/productSlice";
import { toast } from "react-toastify";
import { addProductCart, getUserCart } from "../redux/user/userSlice";
import { formatPrice } from "../utils/helper";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import {
  IoBagCheckOutline,
  IoTicketOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
const ProductDetailPage = () => {
  const [selectSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSku, setSelectedSku] = useState("");
  const [stockProduct, setStockProduct] = useState(0);

  const dispatch = useDispatch();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const wishlistState = useSelector(
    (state) => state?.auth?.userWishlist?.wishlist
  );

  useEffect(() => {
    getWishList();
  }, []);

  const getWishList = () => {
    dispatch(getUserWishlist());
  };
  const productState = useSelector(
    (state) => state?.product?.gotProduct?.productWithStock
  );

  const authState = useSelector((state) => state?.auth?.user);
  const totalRating = productState?.totalrating;
  const productSizes = useSelector(
    (state) => state?.product?.gotProduct?.sizes
  );
  const productColors = useSelector(
    (state) => state?.product?.gotProduct?.colors
  );
  const productColorsCode = useSelector(
    (state) => state?.product?.gotProduct?.colorsCode
  );
  const relatedProducts = useSelector(
    (state) => state?.product?.relatedProduct
  );

  const [selectColor, setSelectedColor] = useState();
  const productVariants = useSelector(
    (state) => state?.product?.gotProduct?.productWithStock?.variants
  );

  const [mainImage, setMainImage] = useState(null);

  const handleThumbnailClick = (url) => {
    setMainImage(url);
  };

  const addToWL = (id) => {
    dispatch(addToWishList(id));
    toast.success("Thêm sản phẩm vào wishlist thành công");
  };

  useEffect(() => {
    if (getProductId) {
      dispatch(resetState());
      dispatch(getProductById(getProductId));
      
    }
  }, [getProductId, dispatch]);

  useEffect(() => {
    if(productState) {
      const categoryId = productState?.categoryId?._id ;
      const data = { productId: getProductId, categoryId: categoryId }
      dispatch(getRelatedProducts(data))
    }
  }, [getProductId,productState])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Tự động set Color đầu tiên của product
  useEffect(() => {
    if (productColors?.length > 0) {
      setSelectedColor(productColors[0]); // lấy giá trị color đầu tiên
    }
  }, [productColors]);
  // Chức năng tìm SKU biến thể và tồn kho
  const findVariant = () => {
    if (selectColor && selectSize && productVariants) {
      const selectedVariant = productVariants.find(
        (variant) =>
          variant.color === selectColor && variant.size === selectSize
      );
      if (selectedVariant) {
        setSelectedSku(selectedVariant.sku); // Set SKU
        setStockProduct(selectedVariant.stock); // Set stock
      } else {
        setSelectedSku(""); // xóa sku
        setStockProduct(0); // xoa stock
      }
    }
  };

  useEffect(() => {
    findVariant();
  }, [selectColor, selectSize]);

  // Nhận kích cỡ có sẵn dựa trên màu đã chọn
  const getAvailableSizes = () => {
    if (selectColor && productVariants) {
      const availableSizes = productVariants
        .filter((variant) => variant.color === selectColor && variant.stock > 0)
        .map((variant) => variant.size);
      return availableSizes;
    }
    return [];
  };
  // thêm vào giỏ hàng
  const addCart = () => {
    if (selectColor == null) {
      toast.error("Vui lòng chọn màu sản phẩm");
      return;
    }
    if (selectSize == null) {
      toast.error("Vui lòng chọn kích thước sản phẩm");
      return;
    }
    if (selectColor !== null && selectSize !== null) {
      dispatch(
        addProductCart({
          productId: productState?._id,
          quantity,
          color:
            productState?.variants?.find(
              (variant) => variant.sku === selectedSku
            )?.colorCode || "",
          size: selectSize,
          sku: selectedSku,
          price:
            productState?.discountPrice > 0
              ? productState?.discountPrice
              : productState?.price,
        })
      );
      dispatch(getUserCart());
    }
  };

  const [orderedProduct, setOrderedProduct] = useState(true);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addRatingProduct = async () => {
    if (authState.length == 0) {
      toast.error("Vui lòng đăng nhập");
      return;
    }
    if (star === null) {
      toast.error("Vui lòng chọn sao đánh giá");
      return;
    } else if (comment === null) {
      toast.error("Vui lòng nhập bình luận");
      return;
    } else {
      await dispatch(
        ratingProduct({ star: star, productId: getProductId, comment: comment })
      );
      await dispatch(getProductById(getProductId));
    }
  };
  return (
    <div>
      <Meta title={productState?.name} />
      <BreadCrumb title={productState?.name} />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row gx-1">
                <div className="col-md-2">
                  {productState?.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image?.url}
                      alt={`Thumbnail ${index}`}
                      className="img-fluid thumbnail-image"
                      style={{
                        cursor: "pointer",
                        width: "90px",
                        height: "90px",
                        objectFit: "cover",
                        marginBottom: "15px",
                      }}
                      onClick={() => handleThumbnailClick(image.url)}
                    />
                  ))}
                </div>
                <div className="col-md-10">
                  <img
                    src={mainImage ? mainImage : productState?.images[0]?.url}
                    alt="Main Product"
                    className="img-fluid main-image-product"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="main-product-details">
                <h3 className="title">{productState?.name}</h3>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={22}
                    value={Number(totalRating) || 0}
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading ">Thương hiệu:</h3>
                  <p className="product-data">
                    {productState?.brandId?.name} {}
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Danh mục sản phẩm:</h3>
                  <p className="product-data">
                    {productState?.categoryId?.name}
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Đã bán:</h3>
                  <p className="product-data"> {productState?.sold}</p>
                </div>
                {productState?.discountPrice > 0 ? (
                  <div className="d-flex align-items-center">
                    <p className="price">
                      <del>{formatPrice(productState?.price)}</del>
                    </p>
                    <p className="discount-price text-danger ps-3 mb-0">
                      {formatPrice(productState?.discountPrice)}
                    </p>
                  </div>
                ) : (
                  <p className="price">{formatPrice(productState?.price)}</p>
                )}

                <h3 className="product-heading mb-2">Màu sắc:</h3>
                <div className="d-flex gap-20 flex-wrap mb-2">
                  {productColors?.map((color, index) => (
                    <div
                      key={index}
                      className={`color-circle ${
                        selectColor === color ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedSize(null);
                      }}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: color,
                        border:
                          selectColor === color
                            ? "3px solid #6c757d"
                            : "1px solid #ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        margin: "5px",
                      }}
                    ></div>
                  ))}
                </div>

                <h3 className="product-heading mb-2">Kích thước:</h3>
                <div className="d-flex gap-15 flex-wrap">
                  {productSizes?.map((size, index) => (
                    <span
                      key={index}
                      className={`badge bg-black text-dark border size p-3 ${
                        selectSize === size ? "border-secondary border-3" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        opacity: getAvailableSizes().includes(size) ? 1 : 0.5,
                        pointerEvents: getAvailableSizes().includes(size)
                          ? "auto"
                          : "none",
                      }}
                    >
                      {size}
                    </span>
                  ))}
                </div>

                {selectedSku && (
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">SKU: {selectedSku}</h3>
                    <p className="product-data fs-5">Tồn kho: {stockProduct}</p>
                  </div>
                )}

                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <h3 className="product-heading">Số lượng:</h3>
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: "70px" }}
                    min={1}
                    max={stockProduct || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="d-flex align-items-center gap-30">
                  {authState._id ? (
                    <button className="button" type="button" onClick={addCart}>
                      <FaCartPlus className="me-2 fs-2" />
                      Thêm vào giỏ hàng
                    </button>
                  ) : (
                    <Link to="/login" className="button border-0">
                      <FaCartPlus className="me-2 fs-2" />
                      Thêm vào giỏ hàng
                    </Link>
                  )}
                  {!wishlistState?.some(
                    (item) => item._id === getProductId
                  ) && (
                    <button
                      className="button signup"
                      type="button"
                      onClick={() => addToWL(productState?._id)}
                    >
                      <FaHeart className="me-2 fs-2" /> Thêm vào Wishlist
                    </button>
                  )}
                </div>
                <div className="container mt-4 px-2  rounded-3 ">
                  <ul className="list-unstyled mt-3">
                    <li className="mb-2">
                      <i className="bi bi-truck me-2"></i>
                      <IoBagCheckOutline className="fs-2 me-1" />{" "}
                      <strong>Thanh toán:</strong> Đơn giản và nhanh chóng
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-box-seam me-2"></i>
                      <TbTruckDelivery className="fs-2 me-1" />{" "}
                      <strong>Giao hàng:</strong> Từ 3 - 5 ngày trên cả nước
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-arrow-repeat me-2"></i>
                      <FaArrowRightArrowLeft className="fs-2 me-1" />
                      <strong>Miễn phí đổi trả:</strong> Tại 267+ cửa hàng trong
                      15 ngày
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-tag me-2"></i>
                      <IoTicketOutline className="fs-2 me-1" /> Sử dụng mã giảm
                      giá ở bước thanh toán
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-shield-lock me-2"></i>
                      <IoShieldCheckmarkOutline className="fs-2 me-1" />
                      Thông tin bảo mật và mã hóa
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reviews-wrapper py-5 home-wrapper-2">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <h4 id="review">Mô tả</h4>
                <div className="bg-white p-3">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: productState?.description,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reviews-wrapper py-5 home-wrapper-2">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <h4 id="review">Đánh giá</h4>
                <div className="bg-white p-3">
                  <div className="review-form py-4">
                    <h4>Viết đánh giá tại đây!</h4>
                    <form className="d-flex flex-column gap-15">
                      <div>
                        <ReactStars
                          count={5}
                          size={22}
                          value={0}
                          edit={true}
                          activeColor="#ffd700"
                          onChange={(e) => setStar(e)}
                        />
                      </div>
                      <div>
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          placeholder="Lời nhắn"
                          className="w-100 form-control"
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          className="button border-0"
                          type="button"
                          onClick={() => addRatingProduct()}
                        >
                          Gửi
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="reviews mt-3">
                    {productState?.ratings?.map((rating, index) => {
                      if (rating?.isShow === true) {
                        return (
                          <div key={index}>
                            <div className="d-flex gap-10 align-items-center">
                              <h6 className="mb-0">
                                {rating?.postedBy?.firstname}
                                {rating?.postedBy?.lastname}
                              </h6>
                              <ReactStars
                                count={5}
                                size={22}
                                value={Number(rating?.star) || 0}
                                edit={false}
                                activeColor="#ffd700"
                              />
                            </div>
                            <div className="review">
                              <p className="mt-3">{rating?.comment}</p>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="popular-wrapper py-5 home-wrapper-2">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <h4 className="section-heading">Sản phẩm liên quan</h4>
              </div>
            </div>
            <div className="row">
              <ProductCard grid={4} data={relatedProducts}/>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
