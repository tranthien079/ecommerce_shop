import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import watch from "../../public/images/watch.jpg";
import momo from "../../public/images/momo.webp";
import payos from "../../public/images/payos.svg";

import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../utils/helper";
import { getAllShipping } from "../redux/shipping/shippingSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { applyCoupon, createOrder, getUserCart } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Meta from "../components/Meta";
const checkoutSchema = yup.object({
  firstname: yup.string().required("Vui lòng nhập họ đệm"),
  lastname: yup.string().required("Vui lòng nhập tên"),
  mobile: yup
    .string()
    .min(10, "Số điện thoại có ít nhất 10 số")
    .required("Vui lòng nhập số điện thoại"),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
});

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectShip, setSelectedShip] = useState(0);
  const [selectPayment, setSelectedPayment] = useState("");
  const [coupon, setCoupon] = useState(0);

  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState({ id: "", name: "" });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    name: "",
  });
  const [selectedWard, setSelectedWard] = useState({ id: "", name: "" });

  const cartState = useSelector((state) => state?.auth?.cartUser);
  const totalAmount =
    cartState?.reduce((total, item) => total + item.price * item.quantity, 0) ||
    0;
  const shippingState = useSelector((state) => state?.shipping?.shipping);

  const orderState = useSelector((state) => state?.auth);

  const applyCouponState = useSelector((state) => state?.auth?.appliedCoupon);

  // useEffect(() => {
  //   if (orderState?.paymentResult?.payUrl.length > 0) {
  //     window.location.href = orderState.paymentResult.payUrl;
  //   } else {
  //     window.location.href = orderState.paymentResult.checkoutUrl;
  //   }
  // }, [orderState?.paymentResult]);

  // useEffect(() => {
  //   const { payUrl, checkoutUrl } = orderState?.paymentResult || {};
  
  //   if (payUrl?.length > 0) {
  //     window.location.href = payUrl;
  //   } else if (checkoutUrl && checkoutUrl !== '') {
  //     window.location.href = checkoutUrl;
  //   }
  // }, [orderState?.paymentResult]);
  
  const getShipping = () => {
    dispatch(getAllShipping());
  };
  useEffect(() => {
    getShipping();
  }, [dispatch]);

  useEffect(() => {
    if (applyCouponState?.discount) {
      setCoupon(applyCouponState.discount);
    }
  }, [applyCouponState]);

  const formik1 = useFormik({
    initialValues: {
      coupon: "",
    },
    onSubmit: async (values) => {
      const result = await dispatch(applyCoupon(values));
      if (result.payload?.discount) {
        toast.success("Mã giảm giá đã áp dụng");
        setCoupon(result.payload.discount);
      } 
    },
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      address: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: async (values) => {
      if (!selectShip) {
        toast.error("Vui lòng chọn đơn vị vận chuyển");
        return;
      }
      if (!selectPayment) {
        toast.error("Vui lòng chọn phương thức thanh toán");
        return;
      }
      if (!selectedCity) {
        toast.error("Vui lòng chọn tỉnh/thành phố");
        return;
      }
      if (!selectedDistrict) {
        toast.error("Vui lòng chọn quận/huyện");
        return;
      }
      if (!selectedWard) {
        toast.error("Vui lòng chọn phường xã");
        return;
      }

      if (
        selectShip &&
        selectPayment &&
        cartState.length > 0 &&
        selectedCity &&
        selectedDistrict &&
        selectedWard
      ) {
        const updatedValues = {
          ...values,
          address: `${values.address}, ${selectedWard?.name}, ${selectedDistrict?.name}, ${selectedCity?.name}`,
        };
        const data = {
          shippingInfo: updatedValues,
          paymentInfo: selectPayment,
          orderItems: cartState,
          totalPrice: coupon > 0 
          ? (Number(totalAmount) + Number(selectShip?.price_ship || 0)) - (Number(totalAmount) * Number(coupon) / 100)
          : Number(totalAmount) + Number(selectShip?.price_ship || 0),
          // totalPriceAfterDiscount: totalAmount,
          typeDelivery: selectShip?.ship_id,
        };
        if (selectPayment === "momo") {
          const response = await dispatch(createOrder(data));
          if (response?.payload?.paymentResult?.payUrl) {
            window.location.href = response.payload.paymentResult.payUrl;
          }
          await dispatch(getUserCart());
        } else if (selectPayment === "payos") {
          const response = await dispatch(createOrder(data));
          if (response?.payload?.paymentResult?.checkoutUrl) {
            window.location.href = response.payload.paymentResult.checkoutUrl;
          }
          await dispatch(getUserCart());
        } else {
          await dispatch(createOrder(data));
          await dispatch(getUserCart());
          toast.success("Đặt hàng thành công");
          navigate("/payment-success");
        }
      } else {
        toast.error("Vui lòng thêm sản phẩm vào giỏ hàng");
      }
    },
  });

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setData(response.data);
        setCities(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    const cityName = event.target.options[event.target.selectedIndex].text;
    setSelectedCity({ id: cityId, name: cityName });
    setDistricts([]);
    setWards([]);
    setSelectedDistrict({ id: "", name: "" });
    setSelectedWard({ id: "", name: "" });

    if (cityId) {
      const selectedCityData = data.find((city) => city.Id === cityId);
      setDistricts(selectedCityData ? selectedCityData.Districts : []);
    }
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    const districtName = event.target.options[event.target.selectedIndex].text;
    setSelectedDistrict({ id: districtId, name: districtName });
    setWards([]);
    setSelectedWard({ id: "", name: "" });

    if (districtId) {
      const selectedCityData = data.find((city) => city.Id === selectedCity.id);
      const selectedDistrictData = selectedCityData.Districts.find(
        (district) => district.Id === districtId
      );
      setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
    }
  };

  const handleWardChange = (event) => {
    const wardId = event.target.value;
    const wardName = event.target.options[event.target.selectedIndex].text;
    setSelectedWard({ id: wardId, name: wardName });
  };
  return (
    <>
       <Meta title='Thanh toán' />
      {cartState == [] && <Navigate to="/cart" replace={true} />}
      <div className="checkout-wrapper">
        <div className="container-xxl">
          <div className="row">
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-md-flex  gap-30"
            >
              <div className="col-md-7 col-12">
                <div className="checkout-left-data me-2">
                  <h3 className="website-name"></h3>

                  <h4 className="title">Thông tin liên hệ</h4>
                  <p className="user-detais">tranminhthien (abc@gmail.com)</p>

                  <div className="d-flex gap-10 flex-row">
                    <div className="w-50">
                      <label htmlFor="" className="form-label">
                        Họ đệm
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        value={formik.values.firstname}
                        onChange={formik.handleChange("firstname")}
                        onBlur={formik.handleBlur("firstname")}
                      />
                      <div
                        className="text-danger"
                        style={{ fontSize: "14px", fontStyle: "inherit" }}
                      >
                        {formik.touched.firstname && formik.errors.firstname ? (
                          <>{formik.errors.firstname}</>
                        ) : null}
                      </div>
                    </div>

                    <div className="w-50">
                      <label htmlFor="" className="form-label">
                        Tên
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        value={formik.values.lastname}
                        onChange={formik.handleChange("lastname")}
                        onBlur={formik.handleBlur("lastname")}
                      />
                      <div
                        className="text-danger"
                        style={{ fontSize: "14px", fontStyle: "inherit" }}
                      >
                        {formik.touched.lastname && formik.errors.lastname ? (
                          <>{formik.errors.lastname}</>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 w-100 mt-2">
                    <label htmlFor="" className="form-label">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                    />
                    <div
                      className="text-danger"
                      style={{ fontSize: "14px", fontStyle: "inherit" }}
                    >
                      {formik.touched.mobile && formik.errors.mobile ? (
                        <>{formik.errors.mobile}</>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-3 w-100">
                    <label htmlFor="" className="form-label">
                      Số nhà / Tên đường
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      id=""
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                    />
                    <div
                      className="text-danger"
                      style={{ fontSize: "14px", fontStyle: "inherit" }}
                    >
                      {formik.touched.address && formik.errors.address ? (
                        <>{formik.errors.address}</>
                      ) : null}
                    </div>
                  </div>
                  <label htmlFor="" className="form-label">
                    Tỉnh thành phố
                  </label>
                  <select
                    onChange={handleCityChange}
                    value={selectedCity.id}
                    className="form-select form-select-mb mb-3"
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {cities.map((city) => (
                      <option key={city.Id} value={city.Id}>
                        {city.Name}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="" className="form-label">
                    Quận huyện
                  </label>
                  <select
                    onChange={handleDistrictChange}
                    value={selectedDistrict.id}
                    className="form-select form-select-mb mb-3"
                  >
                    <option value="">Chọn quận/huyện</option>
                    {districts.map((district) => (
                      <option key={district.Id} value={district.Id}>
                        {district.Name}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="" className="form-label">
                    Phường xã
                  </label>
                  <select
                    onChange={handleWardChange}
                    value={selectedWard.id}
                    className="form-select form-select-mb mb-3"
                  >
                    <option value="">Chọn phường/xã</option>
                    {wards.map((ward) => (
                      <option key={ward.Id} value={ward.Id}>
                        {ward.Name}
                      </option>
                    ))}
                  </select>
                  <div className="w-100 mb-2">
                    <div className="d-flex justify-content-between  align-items-baseline">
                      <Link to="/cart" className="text-dark">
                        <AiOutlineArrowLeft /> Trở lại giỏ hàng
                      </Link>
                      <Link to="/product" className="button">
                        Tiếp tục mua hàng
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-5 col-12">
                <div className="border-bottom py-4">
                  {cartState &&
                    cartState?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex gap-10 mb-2 align-align-items-center "
                        >
                          <div className="w-75 d-flex gap-10">
                            <div className="w-25 position-relative">
                              <span
                                className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                                style={{ top: "-10px", right: "2px" }}
                              >
                                {item?.quantity}
                              </span>
                              <img
                                className="img-fluid"
                                src={item?.productId?.images[0]?.url}
                                alt="product"
                              />
                            </div>
                            <div>
                              <h5 className="title">{item?.name}</h5>
                              <p>
                                {item?.color} / {item?.size}
                              </p>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h5>{formatPrice(item?.price)}</h5>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="py-4">
                  <div className="d-flex justify-content-between align-nav-item">
                    <p>Thành tiền</p>
                    <p>{formatPrice(totalAmount)}</p>
                  </div>
                  <div className="d-flex flex-column align-nav-item">
                    <h4 className="flex-1">Áp mã giảm giá</h4>
                    <div className="mb-2">
                      <div className="d-flex flex-row  justify-content-between align-nav-item">
                        <input
                          type="text"
                          name="coupon"
                          className="form-control"
                          style={{ width: "430px" }}
                          value={formik1.values.coupon}
                          onChange={formik1.handleChange("coupon")}
                          onBlur={formik1.handleBlur("coupon")}
                        />
                        <button
                          className="btn btn-success"
                          type="button"
                          onClick={formik1.handleSubmit}
                        >
                          Sử dụng
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-nav-item">
                    <h4 className="">Phương thức vận chuyển</h4>
                  </div>
                  {shippingState &&
                    shippingState?.map((ship, index) => {
                      return (
                        <div className="form-check" key={index}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="typeDelivery"
                            value={ship._id}
                            id={ship._id}
                            onChange={(e) =>
                              setSelectedShip({
                                ship_id: ship._id,
                                price_ship: ship.price,
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={ship._id}
                          >
                            {ship?.name} - {formatPrice(ship?.price)}
                          </label>
                        </div>
                      );
                    })}
                </div>
                <div className="d-flex justify-content-between align-nav-item">
                  <h4 className="mb-0">Phương thức thanh toán</h4>
                </div>

                <div className="payment-card">
                  <div
                    className="form-check border border-1 rounded mt-2"
                    style={{ paddingLeft: "0px" }}
                  >
                    <input
                      className="form-check-input d-none"
                      type="radio"
                      name="paymentInfo"
                      value="momo"
                      id="payment-momo"
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                    <label
                      className="form-check-label p-2 d-flex align-items-center"
                      htmlFor="payment-momo"
                    >
                      <img
                        className="mx-2"
                        width={35}
                        src={momo}
                        alt="Momo"
                      />
                      <span>Thanh toán qua Momo</span>
                    </label>
                  </div>
                </div>

                <div className="payment-card">
                  <div
                    className="form-check border border-1 rounded mt-2"
                    style={{ paddingLeft: "0px" }}
                  >
                    <input
                      className="form-check-input d-none"
                      type="radio"
                      name="paymentInfo"
                      value="payos"
                      id="payment-payos"
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                    <label
                      className="form-check-label p-2 d-flex align-items-center"
                      htmlFor="payment-payos"
                    >
                      <img
                        className="mx-2"
                        width={37}
                        src={payos}
                        alt="payos"
                      />
                      <span>Thanh toán qua PayOS</span>
                    </label>
                  </div>
                </div>

                <div className="payment-card">
                  <div
                    className="form-check border border-1 rounded mt-2"
                    style={{ paddingLeft: "0px" }}
                  >
                    <input
                      className="form-check-input d-none"
                      type="radio"
                      name="paymentInfo"
                      value="cash"
                      id="payment-cash"
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                    <label
                      className="form-check-label p-2 d-flex align-items-center"
                      htmlFor="payment-cash"
                    >
                      <img
                        className="mx-2"
                        width={37}
                        src="https://png.pngtree.com/png-clipart/20210530/original/pngtree-cash-payments-for-cod-with-hand-holding-money-and-box-png-image_6373958.jpg"
                        alt="COD"
                      />
                      <span>Thanh toán khi nhận hàng</span>
                    </label>
                  </div>
                </div>

                <div className="d-flex  justify-content-between align-nav-item py-4">
                  <h4>Tổng tiền:</h4>
                  <h5>
                    {coupon > 0
                      ? formatPrice(
                        Number(totalAmount) +
                            Number(selectShip?.price_ship || 0) -
                            ( Number(totalAmount) * Number(coupon)) / 100
                        )
                      : formatPrice(
                          totalAmount + Number(selectShip?.price_ship || 0)
                        )}
                  </h5>
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <button type="submit" className="button border-0 w-100">
                    Đặt hàng
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
