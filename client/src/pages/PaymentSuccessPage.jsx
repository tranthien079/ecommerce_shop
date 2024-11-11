import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import {  getUserCart, updatePaymentStatus } from '../redux/user/userSlice';

const PaymentSuccessPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const updateOrder = async () => {
      const queryParams = new URLSearchParams(location.search);
      const orderId = queryParams.get('orderId');
      const paymentStatus = queryParams.get('status');
      const orderCode = queryParams.get('orderCode');
      const resultCode = queryParams.get('resultCode');

      if (resultCode === '0' && orderId) {
        await dispatch(updatePaymentStatus(orderId));
        await dispatch(getUserCart());
      }
      // Uncomment and modify this if necessary
      if(paymentStatus === 'PAID' && orderCode) {
        await dispatch(updatePaymentStatus(orderCode));
        await dispatch(getUserCart());
      }
    };

    updateOrder();
  }, [dispatch, location.search]); 

  return (
    <div className="success-container">
      <div className="icon-container">
        <FaCheck className="check-icon" />
      </div>
      <h2 className="success-title">Thanh toán đơn hàng thành công</h2>
      <p className="success-message">
        Đơn hàng của quý khách sẽ được xác nhận trong thời gian sớm nhất. Bạn có thể hủy đơn hàng trong vòng 1h kể từ khi đặt hàng.
      </p>
      <Link to="/account/orders" className="btn btn-success p-3">Lịch sử đơn hàng</Link>
    </div>
  );
};

export default PaymentSuccessPage;
